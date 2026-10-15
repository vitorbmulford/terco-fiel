import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexingEnabled } from "@/app/lib/site";

const publicRoutes = [
  "/",
  "/aprender-a-rezar",
  "/como-rezar-o-terco",
  "/misterios-do-terco",
  "/misterio-do-dia",
  "/terco-em-latim",
  "/terco-com-audio",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled) return [];

  const lastModified = new Date("2026-08-27T00:00:00-03:00");

  return publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/misterio-do-dia" ? "daily" : "monthly",
  }));
}
