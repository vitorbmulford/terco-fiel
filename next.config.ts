import type { NextConfig } from "next";

const explicitIndexing = process.env.SEO_INDEXING_ENABLED;
const indexingEnabled =
  explicitIndexing === "true" ||
  (explicitIndexing !== "false" && process.env.VERCEL_ENV === "production");

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // O token de redefinição viaja na URL: sem isto ele iria no Referer
          // de qualquer requisição a outra origem feita pela página.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          ...(indexingEnabled
            ? []
            : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
    ];
  },
};

export default nextConfig;
