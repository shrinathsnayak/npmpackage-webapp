"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Container } from "@mantine/core";
import { DEFAULT_TAB, TABS } from "@/constants";
import { calculateOverallCount } from "@/utils";
import Overview from "../Tabs/Overview";
import Security from "../Tabs/Security";
import classes from "./Tabs.module.css";
import "../PackageContainer/Container.module.css";

const PageTabs = ({ pacakgeInfo }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("t") || DEFAULT_TAB;
  const { gitHub, securityScore, npm } = pacakgeInfo;
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
        onChange={(value) => router.push(`?t=${value}`)}
      >
        <Tabs.List>
          {Object.keys(TABS).map((item: any) => {
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
          hello World!
        </Tabs.Panel>

        <Tabs.Panel value={TABS.downloads.value} py={20}>
          {TABS.downloads.name}
        </Tabs.Panel>

        <Tabs.Panel value={TABS.dependencies.value} py={20}>
          {TABS.dependencies.name}
        </Tabs.Panel>

        <Tabs.Panel value={TABS.versions.value} py={20}>
          {TABS.versions.name}
        </Tabs.Panel>

        <Tabs.Panel value={TABS.readme.value} py={20}>
          <Overview data={gitHub?.data?.readMe} />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.scorecard.value} py={20}>
          <Security packageInfo={securityScore?.data} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageTabs;
