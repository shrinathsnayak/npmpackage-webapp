"use client";

import { Suspense } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Search } from "@/components/shared/Search";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Conditional from "../Conditional";

const PageLayout = ({
  children,
  hideLayout,
  hideSearch = false,
  disableSpotlight = false,
  hideHeader = false,
  fixedFooter = false,
  hideFooter = false,
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
      <Conditional if={!hideHeader}>
        <Header hideSearch={hideSearch} />
      </Conditional>

      <AppShell.Main bg="dark.7">
        <Conditional if={!disableSpotlight}>
          <Suspense fallback={<>loading...</>}>
            <Search />
          </Suspense>
        </Conditional>
        {children}
      </AppShell.Main>
      <Conditional if={!hideFooter}>
        <Footer fixedFooter={fixedFooter} />
      </Conditional>
    </AppShell>
  );
};

export default PageLayout;
