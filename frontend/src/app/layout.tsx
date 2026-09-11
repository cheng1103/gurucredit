import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SEO } from "@/lib/constants";
import { localeAlternates } from "@/lib/seo";
import { resolveRequestLanguage } from "@/lib/i18n/server";
import { Providers } from "@/components/Providers";
import { WhatsAppFab, StickyMobileCTA } from "@/components/layout";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
  ServicesJsonLd,
  GeoCoverageJsonLd,
} from "@/components/JsonLd";

const defaultOgImage = new URL(SEO.shareImage, SEO.url).toString();

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const cjkFont = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-cjk",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const locale = headerStore.get("x-gc-locale") === "ms" ? "ms" : "en";
  const path = headerStore.get("x-gc-path") ?? "/";

  const ms = locale === "ms" ? SEO.translations.ms : null;
  const title = ms?.defaultTitle ?? SEO.defaultTitle;
  const description = ms?.defaultDescription ?? SEO.defaultDescription;
  const keywords = ms?.keywords ?? SEO.keywords;

  return {
    title: {
      default: title,
      template: `%s | ${SEO.siteName}`,
    },
    description,
    keywords,
    authors: [{ name: SEO.siteName }],
    creator: SEO.siteName,
    metadataBase: new URL(SEO.url),
    openGraph: {
      type: "website",
      locale: locale === "ms" ? "ms_MY" : SEO.locale,
      alternateLocale: locale === "ms" ? [SEO.locale] : ["ms_MY"],
      url: SEO.url,
      title,
      description,
      siteName: SEO.siteName,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: SEO.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: localeAlternates(locale, path),
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
      },
    },
    // icons are auto-detected from src/app/icon.png, apple-icon.png, favicon.ico
    other: {
      "geo.region": "MY-14,MY-10",
      "geo.placename": "Malaysia",
      "geo.position": "3.1390;101.6869",
      ICBM: "3.1390, 101.6869",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveRequestLanguage();
  return (
    <html lang={locale}>
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <ServicesJsonLd />
        <GeoCoverageJsonLd />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${cjkFont.variable} font-sans antialiased`}>
        <Providers initialLanguage={locale}>
          <div className="relative flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="flex-1 pb-20 lg:pb-0">
              {children}
            </main>
            <Footer />
          </div>
          <WhatsAppFab />
          <StickyMobileCTA />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
