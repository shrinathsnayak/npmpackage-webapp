/* eslint-disable @next/next/no-sync-scripts */
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantinex/shiki/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/nprogress/styles.css";
import "@/global.module.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { NPMPACKAGE_DESCRIPTION, NPMPACKAGE_TITLE } from "@/constants";
import Metrics from "@/observability";
import Favicon from "@/assets/logos/icon.png";
import ShikiLoader from "@/components/shared/CodeWrapper";
import Feedback from "@/components/shared/Feedback";
import { NavigationProgressBar } from "@/components/shared/NavigationProgressBar";
import OGImage from "../../public/og.png";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="google-adsense-account" content="ca-pub-8328087114055733" />
        <meta name="msvalidate.01" content="BC02EE25C1D81BC24F16C4074F627326" />
        <link rel="preconnecFt" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <link rel="manifest" href="manifest.json" />
        <Metrics />
        <ColorSchemeScript defaultColorScheme="dark" forceColorScheme="dark" />
      </head>
      <body suppressHydrationWarning={true} className="root">
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
