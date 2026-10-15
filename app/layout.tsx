import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/components/auth/auth-provider";
import {
  isIndexingEnabled,
  siteDescription,
  siteName,
  siteUrl,
} from "@/app/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Terço Fiel: oração com áudio e latim",
    template: "%s | Terço Fiel",
  },
  description: siteDescription,
  applicationName: siteName,
  robots: isIndexingEnabled
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
  openGraph: {
    title: "Terço Fiel: oração com áudio e latim",
    description: siteDescription,
    siteName,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terço Fiel: oração com áudio e latim",
    description: siteDescription,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className="h-full"
    >
      <body className="min-h-full"><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
