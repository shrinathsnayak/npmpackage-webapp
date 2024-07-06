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
  transpilePackages: [
    "@mantine/core",
    "@mantine/charts",
    "@mantine/spotlight",
    "@mantinex/shiki",
    "@mantine/hooks",
    "@mantine/form",
    "@mantine/code-highlight",
    "@mantine/dates",
  ],
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
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
