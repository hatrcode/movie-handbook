import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.title}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.facebook,
    locale: site.ogLanguage,
    type: "website",
    images: [site.banner],
  },
  twitter: {
    card: "summary_large_image",
    creator: site.twitter,
    site: site.twitter,
    title: site.title,
    description: site.description,
    images: [site.banner],
  },
  icons: {
    icon: site.favicon,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const schema = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    url: site.url,
    headline: site.headline,
    inLanguage: site.siteLanguage,
    mainEntityOfPage: site.url,
    description: site.description,
    name: site.title,
    author: {
      "@type": "Person",
      name: site.author,
    },
    copyrightHolder: {
      "@type": "Person",
      name: site.author,
    },
    copyrightYear: "2021",
    creator: {
      "@type": "Person",
      name: site.author,
    },
    publisher: {
      "@type": "Person",
      name: site.author,
    },
    datePublished: "2021-01-01",
    image: {
      "@type": "ImageObject",
      url: `${site.url}${site.banner}`,
    },
  };

  return (
    <html lang={site.siteLanguage}>
      <body>
        <Providers>
          <Navbar />
          {children}
          <BottomNav />
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
