import type { Metadata } from "next";
import { PremiumPage } from "@/app/components/premium/premium-page";
import { StructuredData } from "@/app/components/seo/structured-data";
import { absoluteUrl, siteDescription, siteName } from "@/app/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Terço Fiel com áudio e latim",
    description: siteDescription,
    url: "/",
    siteName,
    locale: "pt_BR",
    type: "website",
  },
};

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon.svg"),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl("/"),
      description: siteDescription,
      inLanguage: "pt-BR",
      publisher: { "@type": "Organization", name: siteName },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteName,
      description: siteDescription,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS, Android",
      url: absoluteUrl("/"),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
        description: "O Terço Fiel essencial é gratuito.",
      },
      featureList: [
        "Mistério indicado para cada dia",
        "Orações em português e latim",
        "Áudio online em segundo plano; download offline no Premium",
        "Leitura acessível e contador de contas",
        "Guia para iniciantes",
      ],
    },
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <PremiumPage />
    </>
  );
}
