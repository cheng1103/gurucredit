import type { NextConfig } from "next";

const validateApiUrl = () => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  const apiUrlRaw = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = apiUrlRaw ? apiUrlRaw.replace(/^['"]|['"]$/g, '') : apiUrlRaw;
  if (!apiUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_URL must be set for the admin app in production.',
    );
  }
  const isLocalhost =
    apiUrl.startsWith('http://localhost') ||
    apiUrl.startsWith('http://127.0.0.1');
  if (!apiUrl.startsWith('https://') && !isLocalhost) {
    throw new Error(
      `Admin NEXT_PUBLIC_API_URL must use HTTPS in production. Received: ${apiUrl}`,
    );
  }
};

validateApiUrl();

const parseSources = (value?: string) =>
  value
    ? value
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

const stripQuotes = (value: string) => value.replace(/^['"]|['"]$/g, '');

const parseHashSources = (value?: string) =>
  parseSources(value).map(stripQuotes).filter((token) => {
    const normalized = token.toLowerCase();
    return (
      normalized.startsWith('sha256-') ||
      normalized.startsWith('sha384-') ||
      normalized.startsWith('sha512-') ||
      normalized.startsWith('nonce-')
    );
  });

const formatKeyword = (value: string) =>
  value.startsWith("'") ? value : `'${value}'`;

const buildConnectSrc = () => {
  const sources = new Set(["'self'"]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    sources.add(apiUrl);
  }
  parseSources(process.env.NEXT_PUBLIC_CSP_CONNECT_SRC).forEach((src) =>
    sources.add(src),
  );
  return Array.from(sources).join(' ');
};

const buildImgSrc = () => {
  const sources = new Set(["'self'", 'data:', 'https:']);
  parseSources(process.env.NEXT_PUBLIC_CSP_IMG_SRC).forEach((src) =>
    sources.add(src),
  );
  return Array.from(sources).join(' ');
};

const buildScriptSrc = () => {
  const sources = new Set(["'self'", "'unsafe-inline'"]);
  parseSources(process.env.NEXT_PUBLIC_CSP_SCRIPT_SRC).forEach((src) =>
    sources.add(src),
  );
  parseHashSources(process.env.NEXT_PUBLIC_CSP_SCRIPT_HASHES).forEach(
    (hash) => sources.add(formatKeyword(hash)),
  );
  return Array.from(sources).join(' ');
};

const buildStyleSrc = () => {
  const sources = new Set(["'self'", "'unsafe-inline'"]);
  parseSources(process.env.NEXT_PUBLIC_CSP_STYLE_SRC).forEach((src) =>
    sources.add(src),
  );
  parseHashSources(process.env.NEXT_PUBLIC_CSP_STYLE_HASHES).forEach((hash) =>
    sources.add(formatKeyword(hash)),
  );
  return Array.from(sources).join(' ');
};

const getReportToConfig = () => {
  const endpoint = process.env.NEXT_PUBLIC_CSP_REPORT_TO?.trim();
  if (!endpoint) {
    return null;
  }
  const group =
    process.env.NEXT_PUBLIC_CSP_REPORT_TO_GROUP?.trim() ?? 'csp-endpoint';
  const parsedMaxAge = Number(
    process.env.NEXT_PUBLIC_CSP_REPORT_TO_MAX_AGE ?? '10886400',
  );
  const maxAge = Number.isFinite(parsedMaxAge) ? parsedMaxAge : 10886400;
  return {
    group,
    header: JSON.stringify({
      group,
      max_age: maxAge,
      endpoints: [{ url: endpoint }],
    }),
  };
};

const buildContentSecurityPolicy = () => {
  const directives = [
    "default-src 'self';",
    `script-src ${buildScriptSrc()};`,
    `style-src ${buildStyleSrc()};`,
    `img-src ${buildImgSrc()};`,
    "font-src 'self' https: data:;",
    `connect-src ${buildConnectSrc()};`,
    "frame-ancestors 'none';",
    "form-action 'self';",
    "object-src 'none';",
    "base-uri 'self';",
    "manifest-src 'self';",
  ];
  const reportUri = process.env.NEXT_PUBLIC_CSP_REPORT_URI?.trim();
  if (reportUri) {
    directives.push(`report-uri ${reportUri};`);
  }
  const reportToConfig = getReportToConfig();
  if (reportToConfig) {
    directives.push(`report-to ${reportToConfig.group};`);
  }
  return directives.join(' ');
};

const CONTENT_SECURITY_POLICY = buildContentSecurityPolicy();
const REPORT_TO_CONFIG = getReportToConfig();
const CSP_REPORT_ONLY =
  process.env.NEXT_PUBLIC_CSP_REPORT_ONLY === 'true' ? true : false;
const CSP_HEADER_KEY = CSP_REPORT_ONLY
  ? 'Content-Security-Policy-Report-Only'
  : 'Content-Security-Policy';

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'off',
  },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), interest-cohort=(), fullscreen=(self)',
  },
  {
    key: CSP_HEADER_KEY,
    value: CONTENT_SECURITY_POLICY,
  },
];

if (REPORT_TO_CONFIG) {
  securityHeaders.push({
    key: 'Report-To',
    value: REPORT_TO_CONFIG.header,
  });
}

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
