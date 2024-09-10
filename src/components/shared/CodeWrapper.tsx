"use client";

import React, { useCallback } from "react";
import { ShikiProvider } from "@mantinex/shiki";
import { Highlighter } from "shiki";

const loadShiki = async (): Promise<Highlighter> => {
  const { getHighlighter } = await import("shiki");
  const shiki = await getHighlighter({
    langs: ["tsx", "scss", "html", "bash", "json"],
    themes: [],
  });

  return shiki;
};

const ShikiLoader = ({ children }: { children: React.ReactNode }) => {
  const memoizedLoadShiki: any = useCallback(loadShiki, []);

  return (
    <ShikiProvider loadShiki={memoizedLoadShiki}>{children}</ShikiProvider>
  );
};

export default ShikiLoader;
