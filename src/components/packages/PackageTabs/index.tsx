"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Container, NumberFormatter } from "@mantine/core";
import { DEFAULT_TAB, TABS } from "@/constants";
import { calculateOverallCount } from "@/utils";
import Overview from "@/components/packages/Tabs/Overview";
import classes from "./Tabs.module.css";
import Conditional from "@/components/shared/Conditional";

const ReadMe = dynamic(() => import("@/components/packages/Tabs/ReadMe"));
const Security = dynamic(() => import("@/components/packages/Tabs/Security"));
const Dependencies = dynamic(
  () => import("@/components/packages/Tabs/Dependencies")
);
const Downloads = dynamic(() => import("@/components/shared/Downloads"));

const PageTabs = ({ packageInfo, downloads }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("t") || DEFAULT_TAB;
  const { gitHub, securityScore, npm } = packageInfo || {};
  const dependenciesCount = useMemo(
    () => calculateOverallCount(npm?.data?.dependencies),
    [npm?.data]
  );

  return (
    <Container className="responsiveContainer" mt={-47}>
      <Tabs
        value={search}
        variant="outline"
        classNames={classes}
        defaultValue={DEFAULT_TAB}
        onChange={(value) => router.push(`?t=${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab py="md" px="lg" c="white" value="overview">
            Overview
          </Tabs.Tab>
          <Conditional if={gitHub?.data?.readMe}>
            <Tabs.Tab py="md" px="lg" c="white" value="readme">
              Readme
            </Tabs.Tab>
          </Conditional>
          <Tabs.Tab py="md" px="lg" c="white" value="downloads">
            Downloads
          </Tabs.Tab>
          <Conditional if={(dependenciesCount || 0) > 0}>
            <Tabs.Tab py="md" px="lg" c="white" value="dependencies">
              Dependencies (
              <NumberFormatter thousandSeparator value={dependenciesCount} />)
            </Tabs.Tab>
          </Conditional>
          <Conditional if={securityScore?.data?.score}>
            <Tabs.Tab py="md" px="lg" c="white" value="scorecard">
              OpenSSF Scorecard
            </Tabs.Tab>
          </Conditional>
        </Tabs.List>

        <Tabs.Panel value={TABS.overview.value} py={20}>
          <Overview packageInfo={packageInfo} />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.downloads.value} py={20}>
          <Downloads downloads={downloads} />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.dependencies.value} py={20}>
          <Dependencies data={npm?.data?.dependencies} />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.versions.value} py={20}>
          {TABS.versions.name}
        </Tabs.Panel>

        <Tabs.Panel value={TABS.readme.value} py={20}>
          <ReadMe data={gitHub?.data?.readMe} />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.scorecard.value} py={20}>
          <Security packageInfo={securityScore?.data} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageTabs;
