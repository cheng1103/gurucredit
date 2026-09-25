import { COMPANY, SEO, SERVICES, SERVICE_AREAS, SERVICE_AREA_LABEL } from '@/lib/constants';
import { getAuthorProfile } from '@/lib/authors';
import { LOCALE_PREFIX_ENABLED } from '@/lib/i18n/routes';

/**
 * Rewrite an absolute `${SEO.url}<path>` URL (and, by extension, any `@id`
 * built from it) onto its `/ms` counterpart when the page is actually
 * rendered in Malay and locale-prefixed URLs are live — so structured data
 * on `/ms/*` pages references the real, crawlable Malay URL instead of the
 * English one. A no-op for English pages, non-SEO.url strings, and while the
 * flag is off (matching `localeHref`/`localeAlternates`).
 */
function localizeUrl(url: string, language: 'en' | 'ms' = 'en'): string {
  if (language !== 'ms' || !LOCALE_PREFIX_ENABLED || !url.startsWith(SEO.url)) {
    return url;
  }
  const rest = url.slice(SEO.url.length);
  if (rest === '/ms' || rest.startsWith('/ms/')) {
    return url;
  }
  return `${SEO.url}/ms${rest}`;
}

const areaServedSchema = SERVICE_AREAS.map((area) => ({
  '@type': 'AdministrativeArea',
  name: area.name,
  identifier: area.regionCode,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: area.coordinates.latitude,
    longitude: area.coordinates.longitude,
  },
}));

// Organization Schema
const cleanPhone = (value: string) => value.replace(/[^+\d]/g, '');

export function OrganizationJsonLd() {
  const primaryArea = SERVICE_AREAS[0];
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['FinancialService', 'LocalBusiness'],
    '@id': `${SEO.url}#organization`,
    name: COMPANY.name,
    description: SEO.defaultDescription,
    url: SEO.url,
    logo: new URL(COMPANY.logo, SEO.url).toString(),
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kuala Lumpur',
      addressCountry: 'MY',
      streetAddress: COMPANY.location,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: primaryArea.coordinates.latitude,
      longitude: primaryArea.coordinates.longitude,
    },
    sameAs: [
      COMPANY.facebook,
      COMPANY.instagram,
    ],
    priceRange: 'RM30-RM50',
    openingHours: 'Mo-Fr 09:00-18:00, Sa 10:00-14:00',
    areaServed: 'MY',
    knowsLanguage: ['en', 'ms'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: cleanPhone(COMPANY.phoneLink),
        contactType: 'customer service',
        areaServed: areaServedSchema,
        availableLanguage: ['English', 'Malay'],
      },
      {
        '@type': 'ContactPoint',
        telephone: `+${cleanPhone(COMPANY.whatsappLink)}`,
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: areaServedSchema,
        availableLanguage: ['English', 'Malay'],
        description: 'Official WhatsApp hotline',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Services Schema
export function ServicesJsonLd() {
  // SERVICES[].price/priceFormatted hold the loan's APR, not a consultation
  // fee — there is no per-service fee field in src/lib/constants.ts, so
  // `offers` is intentionally omitted rather than mislabelling an interest
  // rate as an Offer.price (see task-B-brief B2.1).
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SEO.url}#services`,
    itemListElement: SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: COMPANY.name,
          areaServed: areaServedSchema,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Contact Page Schema
export function ContactPageJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${SEO.url}/contact`,
    name: `${COMPANY.name} Contact`,
    description: 'Contact GURU Credits for Malaysia-wide loan assistance.',
    mainEntity: {
      '@type': 'Organization',
      name: COMPANY.name,
      url: SEO.url,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: COMPANY.phone,
        contactType: 'customer service',
        areaServed: areaServedSchema,
        availableLanguage: ['English', 'Malay'],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Blog Article Schema
interface ArticleJsonLdProps {
  title: string;
  titleMs?: string;
  description: string;
  descriptionMs?: string;
  author: string;
  authorRole?: string;
  authorBio?: string;
  authorCredentials?: string;
  authorPhoto?: string;
  publishedAt: string;
  updatedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  slug: string;
  tags: string[];
  image?: string;
  /** Language the article body is actually rendered in. Defaults to 'en'. */
  language?: 'en' | 'ms';
}

export function ArticleJsonLd({
  title,
  titleMs,
  description,
  descriptionMs,
  author,
  authorRole,
  authorBio,
  authorCredentials,
  authorPhoto,
  publishedAt,
  updatedAt,
  reviewedBy,
  reviewedAt,
  slug,
  tags,
  image,
  language = 'en',
}: ArticleJsonLdProps) {
  const resolvedImage = image ? new URL(image, SEO.url).toString() : undefined;
  const pageUrl = localizeUrl(`${SEO.url}/blog/${slug}`, language);
  const profile = getAuthorProfile(author);
  const resolvedRole = authorRole ?? profile.role;
  const resolvedBio = authorBio ?? profile.bio;
  const resolvedCredentials = authorCredentials ?? profile.credentials;
  const resolvedAuthorImage = (authorPhoto ?? profile.photo)
    ? new URL(authorPhoto ?? profile.photo!, SEO.url).toString()
    : undefined;

  const authorNode: Record<string, unknown> = {
    '@type': 'Person',
    name: author,
    jobTitle: resolvedRole,
    knowsAbout: profile.knowsAbout,
    description: resolvedBio,
    worksFor: { '@id': `${SEO.url}#organization` },
  };
  if (resolvedCredentials) authorNode.hasCredential = resolvedCredentials;
  if (resolvedAuthorImage) authorNode.image = resolvedAuthorImage;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: title,
    alternateHeadline: titleMs,
    ...(titleMs && { alternateName: titleMs }),
    description: description,
    abstract: descriptionMs,
    inLanguage: language === 'ms' ? 'ms-MY' : 'en-MY',
    author: authorNode,
    publisher: { '@id': `${SEO.url}#organization` },
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    ...(reviewedBy && {
      reviewedBy: { '@type': 'Person', name: reviewedBy },
    }),
    ...(reviewedAt && { lastReviewed: reviewedAt }),
    ...(resolvedImage ? { image: [resolvedImage] } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
    },
    keywords: tags.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Shared shapes for the breadcrumb/FAQ nodes embedded in WebPageJsonLd's
// @graph (kept here — BreadcrumbJsonLd/FAQSectionJsonLd standalone emitters
// were removed as dead exports; see task-B-brief B2.6).
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description?: string;
  steps: HowToStep[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema with SearchAction
export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO.url}#website`,
    name: SEO.siteName,
    url: SEO.url,
    description: SEO.defaultDescription,
    publisher: {
      '@id': `${SEO.url}#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Schema.org FinancialProduct / LoanOrCredit — the specific type Google uses
// for loan rich results. Emitted alongside the generic Product schema.
interface FinancialProductJsonLdProps {
  url: string;
  name: string;
  description: string;
  category: 'PersonalLoan' | 'MortgageLoan' | 'AutoLoan' | 'BusinessLoan';
  aprMin: number;
  aprMax: number;
  termMonthsMin: number;
  termMonthsMax: number;
  minAmount: number;
  maxAmount: number;
  requiredCollateral?: string;
  feeNote?: string;
  /** Language this page is actually rendered in. Defaults to 'en'. */
  language?: 'en' | 'ms';
}

export function FinancialProductJsonLd({
  url,
  name,
  description,
  category,
  aprMin,
  aprMax,
  termMonthsMin,
  termMonthsMax,
  minAmount,
  maxAmount,
  requiredCollateral,
  feeNote,
  language = 'en',
}: FinancialProductJsonLdProps) {
  const productUrl = localizeUrl(url, language);
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['FinancialProduct', 'LoanOrCredit'],
    '@id': `${productUrl}#financial-product`,
    url: productUrl,
    name,
    description,
    category,
    provider: { '@id': `${SEO.url}#organization` },
    areaServed: areaServedSchema,
    annualPercentageRate: {
      '@type': 'QuantitativeValue',
      minValue: aprMin,
      maxValue: aprMax,
      unitText: 'PERCENT',
    },
    loanTerm: {
      '@type': 'QuantitativeValue',
      minValue: termMonthsMin,
      maxValue: termMonthsMax,
      unitCode: 'MON',
    },
    amount: {
      '@type': 'MonetaryAmount',
      currency: 'MYR',
      minValue: minAmount,
      maxValue: maxAmount,
    },
    currency: 'MYR',
    ...(requiredCollateral && { requiredCollateral }),
    ...(feeNote && {
      feesAndCommissionsSpecification: feeNote,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Financial Calculator Schema
export function CalculatorJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Loan Calculator - GURU Credits',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'MYR',
    },
    description: 'Free loan calculator to estimate monthly payments, total interest, and amortization schedule for personal loans, car loans, and home loans in Malaysia.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebApplicationJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function WebApplicationJsonLd({ name, description, url }: WebApplicationJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    description,
    url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'MYR',
    },
    provider: {
      '@type': 'Organization',
      name: COMPANY.name,
      url: SEO.url,
      areaServed: areaServedSchema,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebPageGraphProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  breadcrumbItems?: BreadcrumbItem[];
  faqItems?: FaqItem[];
  /** Language this page is actually rendered in. Defaults to 'en'. */
  language?: 'en' | 'ms';
}

export function WebPageJsonLd({
  url,
  title,
  description,
  image,
  breadcrumbItems,
  faqItems,
  language = 'en',
}: WebPageGraphProps) {
  const pageUrl = localizeUrl(url, language);
  const imageUrl = image ? new URL(image, SEO.url).toString() : undefined;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: language === 'ms' ? 'ms-MY' : 'en-MY',
      isPartOf: { '@id': `${SEO.url}#website` },
      publisher: { '@id': `${SEO.url}#organization` },
      about: { '@id': `${SEO.url}#organization` },
      ...(imageUrl && {
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imageUrl,
        },
      }),
      ...(breadcrumbItems && {
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      }),
    },
  ];

  if (breadcrumbItems?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: localizeUrl(item.url, language),
      })),
    });
  }

  if (faqItems?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function GeoCoverageJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Loan Consultation & Eligibility Analysis',
    provider: {
      '@type': 'FinancialService',
      name: COMPANY.name,
      url: SEO.url,
    },
    areaServed: areaServedSchema,
    serviceArea: {
      '@type': 'GeoShape',
      circle: SERVICE_AREAS.map(
        (area) => `${area.coordinates.latitude},${area.coordinates.longitude} 40km`,
      ),
    },
    description: `${COMPANY.name} serves borrowers located across ${SERVICE_AREA_LABEL}.`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
