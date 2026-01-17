import { COMPANY, SEO, SERVICES, FAQS, SERVICE_AREAS, SERVICE_AREA_LABEL } from '@/lib/constants';

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
    logo: `${SEO.url}/logo.png`,
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
    areaServed: areaServedSchema,
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
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
        offers: {
          '@type': 'Offer',
          price: service.price,
          priceCurrency: 'MYR',
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

// FAQ Schema
export function FAQJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.slice(0, 10).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
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
  publishedAt: string;
  slug: string;
  tags: string[];
  image?: string;
}

export function ArticleJsonLd({
  title,
  titleMs,
  description,
  descriptionMs,
  author,
  publishedAt,
  slug,
  tags,
  image,
}: ArticleJsonLdProps) {
  const resolvedImage = image ? new URL(image, SEO.url).toString() : undefined;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SEO.url}/blog/${slug}#article`,
    headline: title,
    alternateHeadline: titleMs,
    ...(titleMs && { alternateName: titleMs }),
    description: description,
    abstract: descriptionMs,
    inLanguage: ['en-MY', 'ms-MY'],
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO.url}/logo.png`,
      },
    },
    datePublished: publishedAt,
    dateModified: publishedAt,
    ...(resolvedImage ? { image: [resolvedImage] } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO.url}/blog/${slug}#webpage`,
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

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FAQSectionJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
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

interface LoanServiceJsonLdProps {
  url: string;
  name: string;
  nameMs: string;
  description: string;
  descriptionMs: string;
  serviceType: string;
  interestRate: string;
  tenure: string;
  amount: string;
  keywords?: string[];
}

export function LoanServiceJsonLd({
  url,
  name,
  nameMs,
  description,
  descriptionMs,
  serviceType,
  interestRate,
  tenure,
  amount,
  keywords,
}: LoanServiceJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Service', 'FinancialProduct'],
    name,
    alternateName: nameMs,
    description,
    disambiguatingDescription: descriptionMs,
    inLanguage: ['en-MY', 'ms-MY'],
    serviceType,
    url,
    areaServed: areaServedSchema,
    availableLanguage: ['English', 'Malay'],
    provider: {
      '@type': 'FinancialService',
      name: COMPANY.name,
      url: SEO.url,
      areaServed: areaServedSchema,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
    },
    offers: {
      '@type': 'Offer',
      price: '30.00',
      priceCurrency: 'MYR',
      description: 'RM30 eligibility analysis fee is collected after submission via WhatsApp.',
      availabilityStarts: '2024-01-01',
      eligibleRegion: SERVICE_AREA_LABEL,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Interest Rate Range',
        value: interestRate,
      },
      {
        '@type': 'PropertyValue',
        name: 'Tenure Range',
        value: tenure,
      },
      {
        '@type': 'PropertyValue',
        name: 'Financing Amount',
        value: amount,
      },
    ],
    keywords: keywords?.join(', '),
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

// Product Schema for Loan Products
interface LoanProductJsonLdProps {
  name: string;
  description: string;
  interestRate: string;
  loanTerm: string;
  minAmount: number;
  maxAmount: number;
}

export function LoanProductJsonLd({ name, description, interestRate, loanTerm, minAmount, maxAmount }: LoanProductJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    brand: {
      '@type': 'Organization',
      name: COMPANY.name,
    },
    areaServed: areaServedSchema,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'MYR',
      lowPrice: minAmount,
      highPrice: maxAmount,
      offerCount: 1,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Interest Rate',
        value: interestRate,
      },
      {
        '@type': 'PropertyValue',
        name: 'Loan Term',
        value: loanTerm,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1000',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Review/Testimonial Schema
interface ReviewJsonLdProps {
  reviews: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished?: string;
  }>;
}

export function ReviewJsonLd({ reviews }: ReviewJsonLdProps) {
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY.name,
    areaServed: areaServedSchema,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished || new Date().toISOString().split('T')[0],
    })),
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
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
}

export function WebPageJsonLd({
  url,
  title,
  description,
  image,
  breadcrumbItems,
  faqItems,
}: WebPageGraphProps) {
  const imageUrl = image ? new URL(image, SEO.url).toString() : undefined;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: ['en-MY', 'ms-MY'],
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
        breadcrumb: { '@id': `${url}#breadcrumb` },
      }),
    },
  ];

  if (breadcrumbItems?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
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
