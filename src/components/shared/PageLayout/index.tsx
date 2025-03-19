"use client";

import dynamic from "next/dynamic";
import { Suspense, memo } from "react";
import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Search } from "@/components/shared/Search";
import Conditional from "../Conditional";
import classes from "./Layout.module.css";

const Footer = dynamic(() => import("./components/Footer"));
const Header = dynamic(() => import("./components/Header"));

// Memoize the Header and Footer components
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

// Memoize the Search component
const MemoizedSearch = memo(Search);
// Memoize the children to prevent unnecessary re-renders
const MemoizedChildren = memo(({ children }: { children: React.ReactNode }) => (
  <>{children}</>
));
MemoizedChildren.displayName = "MemoizedChildren";

const PageLayout = memo(
  ({
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
        header={{ height: 63 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
        disabled={hideLayout}
      >
        <Conditional if={!hideHeader}>
          <MemoizedHeader hideSearch={hideSearch} />
        </Conditional>

        <AppShell.Main bg="dark.9">
          <Conditional if={!disableSpotlight}>
            <Suspense fallback={<p>loading...</p>}>
              <MemoizedSearch />
            </Suspense>
          </Conditional>
          <MemoizedChildren>
            <Container size="lg" mih="100vh" p={0} className={classes.borderX}>
              {children}
            </Container>
          </MemoizedChildren>
        </AppShell.Main>
        <Conditional if={!hideFooter}>
          <MemoizedFooter fixedFooter={fixedFooter} />
        </Conditional>
      </AppShell>
    );
  }
);

PageLayout.displayName = "PageLayout";

export default PageLayout;
