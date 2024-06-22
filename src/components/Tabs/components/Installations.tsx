"use client";

import React from "react";
import { Box, Title } from "@mantine/core";
import { CodeHighlightTabs, ShikiProvider } from "@mantinex/shiki";
import { NpmIcon, YarnIcon } from "@mantinex/dev-icons";
import classes from "./Installation.module.css";

const Installations = ({ packageName }: any) => {
  return (
    <Box>
      <Title order={5} mb={7}>
        Installations
      </Title>
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
    </Box>
  );
};

export default Installations;
