"use client";

import React from "react";
import { CodeHighlightTabs } from "@mantinex/shiki";
import { NpmIcon, YarnIcon } from "@mantinex/dev-icons";
import classes from "./Installation.module.css";
import OverviewCard from "@/components/shared/OverviewCard";

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
            icon: <NpmIcon size={18} className={classes.icon} />,
          },
          {
            fileName: "yarn",
            code: `yarn add ${packageName}`,
            language: "bash",
            icon: <YarnIcon size={18} className={classes.icon} />,
          },
        ]}
      />
    </OverviewCard>
  );
};

export default Installations;
