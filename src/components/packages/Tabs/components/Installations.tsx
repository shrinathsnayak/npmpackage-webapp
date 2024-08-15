"use client";

import React from "react";
import { CodeHighlightTabs } from "@mantinex/shiki";
import classes from "./Installation.module.css";
import OverviewCard from "@/components/shared/OverviewCard";
import { IconBrandNpm, IconBrandYarn } from "@tabler/icons-react";

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
            icon: <IconBrandNpm size={18} color="#C12127" className={classes.icon} />,
          },
          {
            fileName: "yarn",
            code: `yarn add ${packageName}`,
            language: "bash",
            icon: <IconBrandYarn size={18} color="#368FB9" className={classes.icon} />,
          },
        ]}
      />
    </OverviewCard>
  );
};

export default Installations;
