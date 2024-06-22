"use client";

import { ShikiProvider } from "@mantinex/shiki";
import React, { useState, useEffect } from "react";

const loadShiki = async () => {
  const { getHighlighter } = await import("shiki");
  const shiki = await getHighlighter({
    langs: ["tsx", "scss", "html", "bash", "json"],
    themes: [],
  });
  return shiki;
};

// ShikiLoader component to handle async loading
const ShikiLoader = ({ children }: { children: React.ReactNode }) => {
  const [highlighter, setHighlighter] = useState(null);

  useEffect(() => {
    const fetchShiki = async () => {
      try {
        const highlighter = await loadShiki();
        setHighlighter(highlighter);
      } catch (error) {
        console.error("Error loading Shiki highlighter:", error);
      }
    };

    fetchShiki();
  }, []);

  return <ShikiProvider loadShiki={loadShiki}>{children}</ShikiProvider>;
};

export default ShikiLoader;
