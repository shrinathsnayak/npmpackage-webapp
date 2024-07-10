import { withSentryConfig } from "@sentry/nextjs";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: false,
    webVitalsAttribution: ["CLS", "LCP"],
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/charts",
      "@mantine/spotlight",
      "@mantinex/shiki",
      "@mantine/hooks",
      "@mantine/form",
      "@mantine/code-highlight",
      "@mantine/dates",
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
  // compiler: {
  //   removeConsole: {
  //     exclude: ["error"],
  //   },
  // },
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

export default withSentryConfig(
  withMDX(
    withBundleAnalyzer(nextConfig, {
      org: "kickstart-ab",
      project: "npmpackageinfo",
      silent: !process.env.CI,
      widenClientFileUpload: true,
      hideSourceMaps: true,
      disableLogger: true,
      automaticVercelMonitors: true,
    }),
  ),
);
