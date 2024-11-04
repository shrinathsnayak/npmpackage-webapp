import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import NextBundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantinex/shiki",
      "@mantine/charts",
      "@mantine/dates",
      "@mantine/form",
      "@mantine/hooks",
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
