import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexingEnabled } from "@/app/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
