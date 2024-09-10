import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantinex/shiki/styles.css";
import "@mantine/dates/styles.css";
import '@mantine/nprogress/styles.css';
import "@/global.module.css";

import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { NPMPACKAGE_DESCRIPTION, NPMPACKAGE_TITLE } from "@/constants";
import Metrics from "@/observability";
import Favicon from "@/assets/logos/icon.png";
import OGImage from "@/assets/og.png";
import ShikiLoader from "@/components/shared/CodeWrapper";
import { NavigationProgressBar } from "@/components/shared/NavigationProgressBar";
import theme from "./theme";

export const metadata: Metadata = {
  title: {
    template: `%s | ${NPMPACKAGE_TITLE}`,
    default: NPMPACKAGE_TITLE,
  },
  description: NPMPACKAGE_DESCRIPTION,
  icons: [{ rel: "icon", url: Favicon.src }],
  openGraph: {
    images: [OGImage.src],
  },
  keywords: [
    "react",
    "github",
    "nextjs",
    "npmjs.org",
    "npmjs.com",
    "npm history",
    "npminsights",
    "npm package",
    "npm insights",
    "npm downloads",
    "npmpackgae.info",
    "npm package info",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
        <link rel="preconnecFt" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <Metrics />
      </head>
      <body suppressHydrationWarning={true} className="root">
        <MantineProvider
          theme={theme}
          forceColorScheme="dark"
          defaultColorScheme="dark"
        >
          <NavigationProgressBar />
          <ShikiLoader>
            <main>{children}</main>
          </ShikiLoader>
        </MantineProvider>
      </body>
    </html>
  );
}
