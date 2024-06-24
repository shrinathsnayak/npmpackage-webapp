"use client";

import { ShikiProvider } from "@mantinex/shiki";

async function loadShiki() {
  const { getHighlighter } = (await import("shiki")) || {};
  const shiki = await getHighlighter({
    langs: ["tsx", "scss", "html", "bash", "json"],
    themes: [],
  });

  return shiki;
}

const ShikiLoader = ({ children }: { children: React.ReactNode }) => {
  return <ShikiProvider loadShiki={loadShiki as any}>{children}</ShikiProvider>;
};

export default ShikiLoader;
