"use client";

import { useCallback, useMemo, memo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Container, Flex, Kbd, Text, Box } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { DEFAULT_TAB, TABS } from "@/constants";
import Conditional from "@/components/shared/Conditional";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import Overview from "@/components/packages/Tabs/Overview";
import ReadMe from "@/components/packages/Tabs/ReadMe";
import Security from "@/components/packages/Tabs/Security";
import Dependencies from "@/components/packages/Tabs/Dependencies";
import Downloads from "@/components/shared/Downloads";
import classes from "./Tabs.module.css";
import Vulnerabilities from "../Tabs/components/vulnerabilities";

const MemoizedDownloads = memo(Downloads);

const MemoizedSecurity = memo(Security);

const PageTabs = ({ packageInfo, downloads, vulnerabilities }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { gitHub, securityScore, npm } = packageInfo || {};
  const downloadsData = useMemo(() => downloads, [downloads]);
  const packageName = useMemo(() => npm?.data?.name, [npm?.data?.name]);
  const search = useMemo(
    () => searchParams.get("t") || DEFAULT_TAB,
    [searchParams]
  );
  const readMeFileContent = useMemo(
    () => npm?.data?.readMe,
    [npm?.data?.readMe]
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
    <Flex align="center" p={0} gap={8} m={0}>
      <Box visibleFrom="sm">
        <Kbd size="xs">{value}</Kbd>
      </Box>
      <Text fz="sm">{label}</Text>
      <div>{rest}</div>
    </Flex>
  );

  return (
    <Container
      size="lg"
      className="responsiveContainer"
      mt={{ base: -46, sm: -47 }}
    >
      <Tabs
        autoContrast
        value={search}
        variant="outline"
        classNames={classes}
        defaultValue={DEFAULT_TAB}
        onChange={(value: any) => redirectToSelectedTab(value)}
      >
        <Tabs.List>
          <Tabs.Tab py="sm" px="lg" c="white" value="overview">
            <HotKeys value="1" label="Overview" />
          </Tabs.Tab>
          <Tabs.Tab py="sm" px="lg" c="white" value="readme">
            <HotKeys value="2" label="Readme" />
          </Tabs.Tab>
          <Tabs.Tab py="sm" px="lg" c="white" value="downloads">
            <HotKeys value="3" label="Downloads" />
          </Tabs.Tab>
          <Tabs.Tab py="sm" px="lg" c="white" value="dependencies">
            <HotKeys
              value="4"
              label="Dependencies"
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
          <Tabs.Tab py="sm" px="lg" c="white" value="vulnerabilities">
            <HotKeys value="5" label="Vulnerabilities" />
          </Tabs.Tab>
          <Tabs.Tab py="sm" px="lg" c="white" value="scorecard">
            <HotKeys value="6" label="OpenSSF Scorecard" />
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TABS.overview.value} py={20}>
          <Overview packageInfo={packageInfo} downloads={downloadsData} />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.downloads.value} py={20}>
          <MemoizedDownloads
            downloads={downloadsData}
            packageName={packageName}
          />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.dependencies.value} py={20}>
          <Dependencies data={npm?.data?.dependencies} />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.versions.value} py={20}>
          {TABS.versions.name}
        </Tabs.Panel>

        <Tabs.Panel value={TABS.readme.value} py={20}>
          <ReadMe data={readMeFileContent} gitHub={gitHub?.data} />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.vulnerabilities.value} py={20}>
          <Vulnerabilities vulnerabilities={vulnerabilities} />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.scorecard.value} py={20}>
          <MemoizedSecurity packageInfo={securityScore?.data} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageTabs;
