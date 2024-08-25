"use client";

import React from "react";
import { CodeHighlightTabs } from "@mantinex/shiki";
import { Image } from "@mantine/core";
import classes from "./Installation.module.css";
import OverviewCard from "@/components/shared/OverviewCard";

import NpmIcon from "@/assets/npm.svg";
import YarnIcon from "@/assets/yarn.svg";

const Installations = ({ packageName }: any) => {
  return (
    <OverviewCard title="Installations">
      <CodeHighlightTabs
        classNames={{ root: classes.root }}
        code={[
          {
            fileName: "npm",
            code: `npm install ${packageName}`,
            language: "bash",
            icon: <Image src={NpmIcon.src} w={16} h={16} alt="NPM Icon" />,
          },
          {
            fileName: "yarn",
            code: `yarn add ${packageName}`,
            language: "bash",
            icon: <Image src={YarnIcon.src} w={16} h={16} alt="Yarn Icon" />,
          },
        ]}
      />
    </OverviewCard>
  );
};

export default Installations;
