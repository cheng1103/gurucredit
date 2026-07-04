import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Space_Grotesk, Plus_Jakarta_Sans, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SEO } from "@/lib/constants";
import { localeAlternates } from "@/lib/seo";
import { resolveRequestLanguage } from "@/lib/i18n/server";
import { Providers } from "@/components/Providers";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
  ServicesJsonLd,
  GeoCoverageJsonLd,
} from "@/components/JsonLd";
import { ClientWidgets } from "@/components/ClientWidgets";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const defaultOgImage = new URL(SEO.shareImage, SEO.url).toString();

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <ServicesJsonLd />
        <GeoCoverageJsonLd />
      </head>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${cjkFont.variable} font-sans antialiased`}
      >
        <Providers initialLanguage={locale}>
          <div className="relative flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <ScrollProgress />
          <ClientWidgets />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
