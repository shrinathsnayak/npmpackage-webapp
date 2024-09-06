"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Search } from "@/components/shared/Search";
import Conditional from "../Conditional";

const Footer = dynamic(() => import("./components/Footer"));
const Header = dynamic(() => import("./components/Header"));

const PageLayout = ({
  children,
  hideLayout,
  hideSearch = false,
  disableSpotlight = false,
  hideHeader = false,
  fixedFooter = false,
  hideFooter = false,
  bg = "dark.7",
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

      <AppShell.Main bg={bg}>
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
