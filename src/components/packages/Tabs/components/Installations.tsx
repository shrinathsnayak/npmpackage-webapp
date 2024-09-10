"use client";

import React, { memo, useMemo } from "react";
import { CodeHighlightTabs as OriginalCodeHighlightTabs } from "@mantinex/shiki";
import { Image } from "@mantine/core";
import classes from "./Installation.module.css";
import OverviewCard from "@/components/shared/OverviewCard";

import NpmIcon from "@/assets/npm.svg";
import YarnIcon from "@/assets/yarn.svg";

const CodeHighlightTabs = memo(
  ({ code, classNames }: { code: any; classNames: any }) => {
    return <OriginalCodeHighlightTabs code={code} classNames={classNames} />;
  }
);

CodeHighlightTabs.displayName = "CodeHighlightTabs";

const Installations = memo(({ packageName }: { packageName: string }) => {
  const codeSnippets = useMemo(
    () => [
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
    ],
    [packageName]
  );

  return (
    <OverviewCard title="Installations">
      <CodeHighlightTabs
        classNames={{ root: classes.root }}
        code={codeSnippets}
      />
    </OverviewCard>
  );
});

Installations.displayName = "Installations";

export default Installations;
