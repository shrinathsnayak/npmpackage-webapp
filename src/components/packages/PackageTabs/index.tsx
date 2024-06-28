"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Container } from "@mantine/core";
import { DEFAULT_TAB, TABS } from "@/constants";
import { calculateOverallCount } from "@/utils";
import ReadMe from "@/components/packages/Tabs/ReadMe";
import Security from "@/components/packages/Tabs/Security";
import Dependencies from "@/components/packages/Tabs/Dependencies";
import Overview from "@/components/packages/Tabs/Overview";
import Downloads from "@/components/packages/Tabs/Downloads";
import classes from "./Tabs.module.css";

const PageTabs = ({ packageInfo, downloads }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("t") || DEFAULT_TAB;
  const { gitHub, securityScore, npm } = packageInfo || {};
  const dependenciesCount = useMemo(
    () => calculateOverallCount(npm?.data?.dependencies),
    [npm?.data],
  );

  return (
    <Container className="responsiveContainer" mt={-48}>
      <Tabs
        value={search}
        variant="outline"
        classNames={classes}
        defaultValue={DEFAULT_TAB}
        onChange={(value) => router.replace(`?t=${value}`)}
      >
        <Tabs.List>
          {Object.keys(TABS).map((item: any) => {
            if (!TABS[item].visible) {
              return null;
            }
            return (
              <Tabs.Tab
                py="md"
                px="lg"
                key={TABS[item].value}
                value={TABS[item].value}
              >
                {TABS[item].name}{" "}
                {TABS[item].value === TABS.dependencies.value &&
                  npm?.data?.dependencies &&
                  `(${dependenciesCount})`}
              </Tabs.Tab>
            );
          })}
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
