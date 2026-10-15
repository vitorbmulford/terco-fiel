import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://site-santoterco.vercel.app";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function readBoolean(value: string | undefined): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export const siteName = "Terço Fiel";
export const siteUrl = normalizeSiteUrl(process.env.SITE_URL);
export const siteDescription =
  "Reze com o Terço Fiel: áudio, mistérios do dia, latim, arte sacra e uma experiência acessível.";

export const isIndexingEnabled =
  readBoolean(process.env.SEO_INDEXING_ENABLED) ??
  process.env.VERCEL_ENV === "production";

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const shouldNoIndex = noIndex || !isIndexingEnabled;

  return {
    title,
    description,
    alternates: noIndex ? undefined : { canonical: path },
    robots: shouldNoIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : undefined,
    openGraph: noIndex
      ? undefined
      : {
          title,
          description,
          url: path,
          siteName,
          locale: "pt_BR",
          type: "article",
        },
    twitter: noIndex
      ? undefined
      : {
          card: "summary_large_image",
          title,
          description,
        },
  };
}
