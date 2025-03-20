import withPWA from "next-pwa";
import createMDX from "@next/mdx";
import withNextIntl from "next-intl/plugin";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
          exclude: ["warnings"],
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self), microphone=()",
          },
        ],
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
    remarkPlugins: [["remarkGfm", {}]],
    rehypePlugins: [[], { strict: true, throwOnError: true }],
  },
});

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

export default withNextIntl()(
  withPWAConfig(withMDX(withBundleAnalyzer(nextConfig)))
);
