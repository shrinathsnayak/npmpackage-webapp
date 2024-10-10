"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

export const NavigationProgressBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = (url: any) =>
      url !== router.asPath && nprogress.start();

    const handleComplete = () => {
      nprogress.complete();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events, router.asPath, pathname]);

  return <NavigationProgress color="red.8" size={3} />;
};
