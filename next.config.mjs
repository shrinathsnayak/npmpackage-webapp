import { withSentryConfig } from "@sentry/nextjs";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withSentryConfig(
  withMDX(nextConfig, {
    org: "kickstart-ab",
    project: "npmpackage.info",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: false,
    disableLogger: true,
  }),
);
