"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Container } from "@mantine/core";
import Overview from "../Tabs/Overview";
import Security from "../Tabs/Security";
import classes from "./Tabs.module.css";
import "../PackageContainer/Container.module.css";

const PageTabs = ({ pacakgeInfo }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("t") || "overview";
  const { gitHub, securityScore } = pacakgeInfo;

  return (
    <Container className="responsiveContainer" mt={-48}>
      <Tabs
        variant="outline"
        // keepMounted={false}
        classNames={classes}
        value={search as string}
        defaultValue="overview"
        onChange={(value) => router.push(`?t=${value}`)}
      >
        <Tabs.List>
          {/* <Tabs.Tab py="md" px="lg" value="overview">
            Overview
          </Tabs.Tab>
          <Tabs.Tab py="md" px="lg" value="downloads">
            Downloads
          </Tabs.Tab>
          <Tabs.Tab py="md" px="lg" value="dependencies">
            Dependencies
          </Tabs.Tab> */}
          <Tabs.Tab py="md" px="lg" value="scorecard">
            Security Scorecard
          </Tabs.Tab>
          {/* <Tabs.Tab py="md" px="lg" value="versions">
            Versions
          </Tabs.Tab> */}
          <Tabs.Tab py="md" px="lg" value="readme">
            Readme
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" py={20}>
          hello World!
        </Tabs.Panel>

        <Tabs.Panel value="readme" py={20}>
          <Overview data={gitHub?.data?.readMe} />
        </Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="scorecard" py={20}>
          <Security packageInfo={securityScore?.data} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageTabs;
