"use client";

import { Suspense } from "react";
import { Tabs, Container, Box } from "@mantine/core";
import MDX from "../mdx";
import Security from "../Security";
import classes from "./Tabs.module.css";
import "../PackageContainer/Container.module.css";

const PageTabs = ({ pacakgeInfo }: any) => {
  const { gitHub, securityScore } = pacakgeInfo;
  return (
    <Container className="responsiveContainer" mt={-35}>
      <Tabs variant="outline" defaultValue="gallery" classNames={classes}>
        <Tabs.List>
          <Tabs.Tab value="gallery">Overview</Tabs.Tab>
          <Tabs.Tab value="downloads">Downloads</Tabs.Tab>
          <Tabs.Tab value="dependencies">Dependencies</Tabs.Tab>
          <Tabs.Tab value="scorecard">Scorecard</Tabs.Tab>
          <Tabs.Tab value="versions">Versions</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" py={20}>
            <MDX content={gitHub?.data?.readMe} />
        </Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="scorecard" py={20}>
          <Suspense fallback={<>loading...</>}>
            <Security packageInfo={securityScore?.data} />
          </Suspense>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageTabs;
