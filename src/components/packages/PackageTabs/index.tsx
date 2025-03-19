"use client";

import { useTranslations } from "next-intl";
import { useCallback, useMemo, memo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Flex, Kbd, Text, Box } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { DEFAULT_TAB, TABS } from "@/constants";
import Conditional from "@/components/shared/Conditional";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import Overview from "@/components/packages/Tabs/Overview";
import ReadMe from "@/components/packages/Tabs/ReadMe";
import Security from "@/components/packages/Tabs/Security";
import Dependencies from "@/components/packages/Tabs/Dependencies";
import Vulnerabilities from "@/components/packages/Tabs/components/vulnerabilities";
import Downloads from "@/components/shared/Downloads";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import classes from "./Tabs.module.css";

const MemoizedDownloads = memo(Downloads);

const MemoizedSecurity = memo(Security);

const PageTabs = ({ packageInfo, downloads, vulnerabilities }: any) => {
  const router = useRouter();
  const t = useTranslations("tabs");
  const searchParams = useSearchParams();
  const { gitHub, securityScore, npm } = packageInfo || {};
  const downloadsData = useMemo(() => downloads, [downloads]);
  const packageName = useMemo(() => npm?.data?.name, [npm?.data?.name]);
  const search = useMemo(
    () => searchParams.get("t") || DEFAULT_TAB,
    [searchParams]
  );
  const readMeFileContent = useMemo(
    () => npm?.data?.readMe || gitHub?.data?.readMe,
    [npm?.data?.readMe, gitHub?.data?.readMe]
  );
  const redirectToTab = useCallback(
    (value: string) => {
      if (value) {
        router.push(`?t=${value}`);
      }
    },
    [router]
  );

  const redirectToSelectedTab = (tabName: string) => {
    redirectToTab(tabName);
  };

  useHotkeys([
    ["1", () => redirectToSelectedTab("overview")],
    ["2", () => redirectToSelectedTab("readme")],
    ["3", () => redirectToSelectedTab("downloads")],
    ["4", () => redirectToSelectedTab("dependencies")],
    ["5", () => redirectToSelectedTab("vulnerabilities")],
    ["6", () => redirectToSelectedTab("scorecard")],
  ]);

  const HotKeys = ({
    value,
    label,
    rest,
  }: {
    value: string;
    label: string;
    rest?: any;
  }) => (
    <Flex align="center" p={0} m={0}>
      <Box visibleFrom="sm" mr={8}>
        <Kbd size="xs" c="white">
          {value}
        </Kbd>
      </Box>
      <Text fz="sm">{label}</Text>
      <div>{rest}</div>
    </Flex>
  );

  return (
    <Box p={16}>
      <Tabs
        autoContrast
        value={search}
        variant="pills"
        color="red"
        classNames={classes}
        defaultValue={DEFAULT_TAB}
        onChange={(value: any) => redirectToSelectedTab(value)}
      >
        <Tabs.List>
          <Tabs.Tab size="xs" c="white" value="overview">
            <HotKeys value="1" label={t("overview")} />
          </Tabs.Tab>
          <Tabs.Tab size="xs" c="white" value="readme">
            <HotKeys value="2" label={t("readme")} />
          </Tabs.Tab>
          <Tabs.Tab size="xs" c="white" value="downloads">
            <HotKeys value="3" label={t("downloads")} />
          </Tabs.Tab>
          <Tabs.Tab size="xs" c="white" value="dependencies">
            <HotKeys
              value="4"
              label={t("dependencies")}
              rest={
                <Conditional
                  if={npm?.data?.dependencies?.dependencies?.totalCount > 0}
                >
                  (
                  <AnimatedNumber
                    value={npm?.data?.dependencies?.dependencies?.totalCount}
                  />
                  )
                </Conditional>
              }
            />
          </Tabs.Tab>
          <Tabs.Tab size="xs" c="white" value="vulnerabilities">
            <HotKeys value="5" label={t("vulnerabilities")} />
          </Tabs.Tab>
          <Tabs.Tab size="xs" c="white" value="scorecard">
            <HotKeys value="6" label={t("scorecard")} />
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TABS.overview.value} py={20} pb={0}>
          <ErrorBoundary>
            <Overview packageInfo={packageInfo} downloads={downloadsData} />
          </ErrorBoundary>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.downloads.value} py={20} pb={0}>
          <ErrorBoundary>
            <MemoizedDownloads
              downloads={downloadsData}
              packageName={packageName}
            />
          </ErrorBoundary>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.dependencies.value} py={20} pb={0}>
          <ErrorBoundary>
            <Dependencies data={npm?.data?.dependencies} />
          </ErrorBoundary>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.readme.value} py={20} pb={0}>
          <ErrorBoundary>
            <ReadMe data={readMeFileContent} gitHub={gitHub?.data} />
          </ErrorBoundary>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.vulnerabilities.value} py={20} pb={0}>
          <ErrorBoundary>
            <Vulnerabilities vulnerabilities={vulnerabilities} />
          </ErrorBoundary>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.scorecard.value} py={20} pb={0}>
          <ErrorBoundary>
            <MemoizedSecurity packageInfo={securityScore?.data} />
          </ErrorBoundary>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default PageTabs;
