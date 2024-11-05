"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, memo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Tabs,
  Container,
  NumberFormatter,
  Flex,
  Kbd,
  Text,
  Box,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { DEFAULT_TAB, TABS } from "@/constants";
import Conditional from "@/components/shared/Conditional";
import classes from "./Tabs.module.css";

const Overview = dynamic(() => import("@/components/packages/Tabs/Overview"), {
  ssr: true,
});
const ReadMe = dynamic(() => import("@/components/packages/Tabs/ReadMe"), {
  ssr: true,
});
const Security = dynamic(() => import("@/components/packages/Tabs/Security"), {
  ssr: true,
});
const Dependencies = dynamic(
  () => import("@/components/packages/Tabs/Dependencies"),
  { ssr: true }
);
const Downloads = dynamic(() => import("@/components/shared/Downloads"), {
  ssr: true,
});

const MemoizedDownloads = memo(Downloads);

const MemoizedSecurity = memo(Security);

const PageTabs = ({ packageInfo, downloads }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = useMemo(
    () => searchParams.get("t") || DEFAULT_TAB,
    [searchParams]
  );
  const downloadsData = useMemo(() => downloads, [downloads]);
  const { gitHub, securityScore, npm } = packageInfo || {};
  // const dependenciesCount = useMemo(
  //   () => calculateOverallCount(npm?.data?.dependencies),
  //   [npm?.data]
  // );

  const redirectToTab = useCallback(
    (value: string) => {
      if (value) {
        router.push(`?t=${value}`);
      }
    },
    [router]
  );

  const packageName = useMemo(() => npm?.data?.name, [npm?.data?.name]);
  const readMeFileContent = useMemo(
    () => gitHub?.data?.readMe,
    [gitHub?.data?.readMe]
  );

  useHotkeys([
    ["1", () => redirectToTab("overview")],
    ["2", () => redirectToTab("readme")],
    ["3", () => redirectToTab("downloads")],
    ["4", () => redirectToTab("dependencies")],
    ["5", () => redirectToTab("scorecard")],
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
    <Container className="responsiveContainer" mt={{ base: -46, sm: -48 }}>
      <Tabs
        autoContrast
        value={search}
        variant="outline"
        classNames={classes}
        defaultValue={DEFAULT_TAB}
        onChange={(value: any) => redirectToTab(value)}
      >
        <Tabs.List>
          <Tabs.Tab py="sm" px="lg" c="white" value="overview">
            <HotKeys value="1" label="Overview" />
          </Tabs.Tab>
          {/* <Conditional if={gitHub?.data?.readMe}> */}
          <Tabs.Tab py="sm" px="lg" c="white" value="readme">
            <HotKeys value="2" label="Readme" />
          </Tabs.Tab>
          {/* </Conditional> */}
          <Tabs.Tab py="sm" px="lg" c="white" value="downloads">
            <HotKeys value="3" label="Downloads" />
          </Tabs.Tab>
          {/* <Conditional if={(dependenciesCount || 0) > 0}> */}
          <Tabs.Tab py="sm" px="lg" c="white" value="dependencies">
            <HotKeys
              value="4"
              label="Dependencies"
              rest={
                <Conditional
                  if={npm?.data?.dependencies?.dependencies?.totalCount > 0}
                >
                  (
                  <NumberFormatter
                    thousandSeparator
                    value={npm?.data?.dependencies?.dependencies?.totalCount}
                  />
                  )
                </Conditional>
              }
            />
          </Tabs.Tab>
          {/* </Conditional> */}
          {/* <Conditional if={securityScore?.data?.score}> */}
          <Tabs.Tab py="sm" px="lg" c="white" value="scorecard">
            <HotKeys value="5" label="OpenSSF Scorecard" />
          </Tabs.Tab>
          {/* </Conditional> */}
        </Tabs.List>

        <Tabs.Panel value={TABS.overview.value} py={20}>
          <Suspense fallback={<div>Loading...</div>}>
            <Overview packageInfo={packageInfo} />
          </Suspense>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.downloads.value} py={20}>
          <Suspense fallback={<div>Loading...</div>}>
            <MemoizedDownloads
              downloads={downloadsData}
              packageName={packageName}
            />
          </Suspense>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.dependencies.value} py={20}>
          <Suspense fallback={<div>Loading...</div>}>
            <Dependencies data={npm?.data?.dependencies} />
          </Suspense>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.readme.value} py={20}>
          <Suspense fallback={<div>Loading...</div>}>
            <ReadMe data={readMeFileContent} />
          </Suspense>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.scorecard.value} py={20}>
          <Suspense fallback={<div>Loading...</div>}>
            <MemoizedSecurity packageInfo={securityScore?.data} />
          </Suspense>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageTabs;
