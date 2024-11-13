import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import NextBundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
          exclude: ["error", "warnings"],
        }
        : false,
  },
  experimental: {
    nextScriptWorkers: true,
    webVitalsAttribution: ["CLS", "LCP"],
    optimizePackageImports: [
      "remark-gfm",
      "rehype-raw",
      "rehype-rewrite",
      "react-markdown",
      "react-syntax-highlighter",
      "node-emoji",
      "@mantine/form",
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/dates",
      "@mantine/hooks",
      "@mantine/charts",
      "@mantinex/shiki",
      "@mantine/nprogress",
      "@mantine/spotlight",
      "@mantine/code-highlight",
    ],
  },
  poweredByHeader: false,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/public/sitemap.xml",
        permanent: true,
      },
    ];
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        maxSize: 20000,
      };
    }
    return config;
  },
};
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(withBundleAnalyzer(nextConfig));
