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
    // Reduce CPU usage during build
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
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
  // Optimize caching for better performance
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
        // Reduce chunk size for better performance
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 50000,
          },
        },
      };
    }
    return config;
  },
  // Reduce build time and CPU usage
  swcMinify: true,
  compress: true,
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
  // Optimize PWA for better performance
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

export default withNextIntl()(
  withPWAConfig(withMDX(withBundleAnalyzer(nextConfig)))
);
