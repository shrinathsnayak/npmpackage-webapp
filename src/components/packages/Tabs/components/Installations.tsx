"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CodeHighlightTabs } from "@mantinex/shiki";
import OverviewCard from "@/components/shared/OverviewCard";
import classes from "./Installation.module.css";

import NpmIcon from "@/components/shared/Icons/NpmIcon";
import YarnIcon from "@/components/shared/Icons/YarnIcon";
import PnpmIcon from "@/components/shared/Icons/PnpmIcon";

const Installations = ({ packageName }: any) => {
  const t = useTranslations("overview");
  return (
    <OverviewCard title={t("installations")}>
      <CodeHighlightTabs
        classNames={{ root: classes.root }}
        code={[
          {
            fileName: "npm",
            code: `npm install ${packageName}`,
            language: "bash",
            icon: <NpmIcon width={16} height={16} />,
          },
          {
            fileName: "yarn",
            code: `yarn add ${packageName}`,
            language: "bash",
            icon: <YarnIcon width={16} height={16} />,
          },
          {
            fileName: "pnpm",
            code: `pnpm add ${packageName}`,
            language: "bash",
            icon: <PnpmIcon width={16} height={16} />,
          },
        ]}
      />
    </OverviewCard>
  );
};

export default Installations;
