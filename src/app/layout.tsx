/* eslint-disable @next/next/no-sync-scripts */
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantinex/shiki/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/nprogress/styles.css";
import "@/global.module.css";

import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { NPMPACKAGE_DESCRIPTION, NPMPACKAGE_TITLE } from "@/constants";
import Metrics from "@/observability";
import Favicon from "@/assets/logos/icon.png";
import OGImage from "@/assets/og.png";
import ShikiLoader from "@/components/shared/CodeWrapper";
import Feedback from "@/components/shared/Feedback";
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
        <meta name="google-adsense-account" content="ca-pub-8328087114055733" />
        <link rel="preconnecFt" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <link rel="manifest" href="manifest.json" />
        <Metrics />
        <ColorSchemeScript defaultColorScheme="dark" forceColorScheme="dark" />
        {/* <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="snayak"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#e03131"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        ></script> */}
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
          <Feedback />
        </MantineProvider>
      </body>
    </html>
  );
}
