import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantinex/shiki/styles.css";
import "@/global.module.css";

import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { NPMPACKAGE_DESCRIPTION, NPMPACKAGE_TITLE } from "@/constants";
import Metrics from "@/observability";
import Favicon from "@/assets/logos/icon.png";
import ShikiLoader from "@/components/shared/CodeWrapper";
import theme from "./theme";

export const metadata: Metadata = {
  title: {
    template: `%s | ${NPMPACKAGE_TITLE}`,
    default: NPMPACKAGE_TITLE,
  },
  description: NPMPACKAGE_DESCRIPTION,
  icons: [{ rel: "icon", url: Favicon.src }],
  openGraph: {
    images: [Favicon.src],
  },
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
        <ColorSchemeScript forceColorScheme="dark" defaultColorScheme="dark" />
        <Metrics />
      </head>
      <body suppressHydrationWarning={true}>
        <MantineProvider
          theme={theme}
          forceColorScheme="dark"
          defaultColorScheme="dark"
        >
          <ShikiLoader>{children}</ShikiLoader>
        </MantineProvider>
      </body>
    </html>
  );
}
