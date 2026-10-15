import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Terço Fiel",
    short_name: "Terço Fiel",
    description:
      "Terço Fiel com áudio, mistérios do dia, latim e leitura acessível.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1e7d3",
    theme_color: "#5e1d2e",
    lang: "pt-BR",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
