import type { NextConfig } from "next";
import path from "path";

function ensureSecureApiUrl(url: string) {
  // Allow http for localhost / development. Enforce HTTPS only in production and non-localhost hosts.
  if (process.env.NODE_ENV !== 'production') {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') return url;
    if (parsed.protocol !== 'https:') {
      throw new Error(`NEXT_PUBLIC_API_URL must use HTTPS in production. Received: ${url}`);
    }
    return url;
  } catch (e) {
    // If URL parsing fails, rethrow for visibility
    throw e;
  }
}

const apiUrl = ensureSecureApiUrl(
  (process.env.NEXT_PUBLIC_API_URL || '').replace(/^['"]|['"]$/g, ''),
);

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

const buildFrameSrc = () => {
  const sources = new Set(["'self'", 'https://www.google.com', 'https://maps.google.com']);
  parseSources(process.env.NEXT_PUBLIC_CSP_FRAME_SRC).forEach((src) =>
    sources.add(src),
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
    `frame-src ${buildFrameSrc()};`,
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
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), fullscreen=(self \"https://www.google.com\" \"https://maps.google.com\")",
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
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Experimental features for better performance
  experimental: {
    optimizeCss: false,
    externalDir: true,
  },
  transpilePackages: ['@guru/shared-config'],
  turbopack: {
    root: path.resolve(__dirname, '..'),
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
