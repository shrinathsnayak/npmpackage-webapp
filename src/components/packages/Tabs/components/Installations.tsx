"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Image } from "@mantine/core";
import { CodeHighlightTabs } from "@mantinex/shiki";
import OverviewCard from "@/components/shared/OverviewCard";
import classes from "./Installation.module.css";

import NpmIcon from "@/assets/npm.svg";
import YarnIcon from "@/assets/yarn.svg";
import PnpmIcon from "@/assets/pnpm.svg";

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
            icon: <Image src={NpmIcon.src} w={16} h={16} alt="NPM Icon" />,
          },
          {
            fileName: "yarn",
            code: `yarn add ${packageName}`,
            language: "bash",
            icon: <Image src={YarnIcon.src} w={16} h={16} alt="Yarn Icon" />,
          },
          {
            fileName: "pnpm",
            code: `pnpm add ${packageName}`,
            language: "bash",
            icon: <Image src={PnpmIcon.src} w={16} h={16} alt="PNPM Icon" />,
          },
        ]}
      />
    </OverviewCard>
  );
};

export default Installations;
