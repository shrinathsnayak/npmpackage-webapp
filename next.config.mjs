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
      "node-emoji",
      "rehype-rewrite",
      "react-markdown",
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
      "react-syntax-highlighter",
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
