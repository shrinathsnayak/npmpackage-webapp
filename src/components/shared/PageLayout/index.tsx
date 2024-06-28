"use client";

import { Suspense } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Search } from "@/components/shared/Search";
import Footer from "./components/Footer";
import Header from "./components/Header";

const PageLayout = ({
  children,
  hideLayout,
  hideSearch = false,
  disableSpotlight = false,
  hideHeader = false,
  fixedFooter = false,
}: any) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 65 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      disabled={hideLayout}
    >
      {!hideHeader && <Header hideSearch={hideSearch} />}

      <AppShell.Main bg="dark.7">
        {!disableSpotlight && (
          <Suspense fallback={<>loading...</>}>
            <Search />
          </Suspense>
        )}
        {children}
      </AppShell.Main>
      <Footer fixedFooter={fixedFooter} />
    </AppShell>
  );
};

export default PageLayout;
