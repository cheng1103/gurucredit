import { SEO } from '@/lib/constants';

type MetaType = 'website' | 'article';
type TwitterCard = 'summary_large_image' | 'summary';

interface LocalizedMetaProps {
  url: string;
  title: string;
  titleMs: string;
  description: string;
  descriptionMs: string;
  type?: MetaType;
  twitterCard?: TwitterCard;
  image?: string;
  imageAlt?: string;
  keywords?: string;
  keywordsMs?: string;
  alternateUrlMs?: string;
}

export function LocalizedMeta({
  url,
  title,
  titleMs,
  description,
  descriptionMs,
  type = 'website',
  twitterCard = 'summary_large_image',
  image,
  imageAlt,
  keywords,
  keywordsMs,
  alternateUrlMs,
}: LocalizedMetaProps) {
  const imageUrl = image ?? new URL(SEO.shareImage, SEO.url).toString();
  const resolvedAlt = imageAlt ?? title;
  const msUrl = alternateUrlMs ?? `${url}?lang=ms`;

  return (
    <>
      {keywords && <meta name="keywords" content={keywords} />}
      {keywordsMs && <meta name="keywords" lang="ms" content={keywordsMs} />}
      <meta name="description" content={description} />
      <meta name="description" lang="ms" content={descriptionMs} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:title" lang="ms" content={titleMs} />
      <meta property="og:description" content={description} />
      <meta property="og:description" lang="ms" content={descriptionMs} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SEO.siteName} />
      <meta property="og:locale" content={SEO.locale} />
      <meta property="og:locale:alternate" content="ms_MY" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={resolvedAlt} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:title" lang="ms" content={titleMs} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:description" lang="ms" content={descriptionMs} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={resolvedAlt} />
      <link rel="alternate" hrefLang="en-MY" href={url} />
      <link rel="alternate" hrefLang="ms-MY" href={msUrl} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </>
  );
}
