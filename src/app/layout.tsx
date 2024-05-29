import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import '@mantine/code-highlight/styles.css';

import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import theme from "./theme";
import Favicon from "../assets/logos/icon.png";
import { NPMPACKAGE_TITLE } from "@/constants";

export const metadata: Metadata = {
  title: {
    template: `%s | ${NPMPACKAGE_TITLE}`,
    default: NPMPACKAGE_TITLE,
  },
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
      </head>
      <body>
        <MantineProvider
          theme={theme}
          forceColorScheme="dark"
          defaultColorScheme="dark"
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
