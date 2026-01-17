import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SEO } from "@/lib/constants";
import { LanguageProvider } from "@/lib/i18n";
import { OrganizationJsonLd, WebsiteJsonLd, ServicesJsonLd, FAQJsonLd, GeoCoverageJsonLd } from "@/components/JsonLd";
import { ClientWidgets } from "@/components/ClientWidgets";

const defaultOgImage = new URL(SEO.shareImage, SEO.url).toString();

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${SEO.siteName}`,
  },
  description: SEO.defaultDescription,
  keywords: SEO.keywords,
  authors: [{ name: SEO.siteName }],
  creator: SEO.siteName,
  metadataBase: new URL(SEO.url),
  openGraph: {
    type: "website",
    locale: SEO.locale,
    alternateLocale: ["ms_MY"],
    url: SEO.url,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
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
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
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
  alternates: {
    canonical: SEO.url,
    languages: {
      "en-MY": SEO.url,
      "ms-MY": `${SEO.url}?lang=ms`,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  other: {
    "geo.region": "MY-14,MY-10",
    "geo.placename": "Kuala Lumpur & Selangor, Malaysia",
    "geo.position": "3.1390;101.6869",
    ICBM: "3.1390, 101.6869",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <ServicesJsonLd />
        <FAQJsonLd />
        <GeoCoverageJsonLd />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
          <ClientWidgets />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
