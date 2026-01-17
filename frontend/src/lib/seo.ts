import type { Metadata } from 'next';
import { SEO } from './constants';

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string;
}

export const buildMetadata = ({
  title,
  description,
  path,
  image,
  keywords,
}: PageMetadataInput): Metadata => {
  const url = `${SEO.url}${path}`;
  const imageUrl = image
    ? new URL(image, SEO.url).toString()
    : new URL(SEO.shareImage, SEO.url).toString();
  const fullTitle = `${title} | ${SEO.siteName}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'en-MY': url,
        'ms-MY': `${url}?lang=ms`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SEO.siteName,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
};
