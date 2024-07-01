"use client";

import React from "react";
import { Group, rem, Text, UnstyledButton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { searchHandlers } from "../shared/Search";
import classes from "./Landing.module.css";

const SearchBar = () => {
  return (
    <UnstyledButton
      onClick={() => searchHandlers.open()}
      className={classes.searchRoot}
    >
      <Group justify="space-between">
        <Group gap="md">
          <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={2} />
          <Text fz="lg" c="dimmed" pr={{ base: 0, sm: 80 }}>
            Search Package
          </Text>
        </Group>
        <Text
          p={8}
          px={10}
          fw={700}
          display={{ base: "none", md: "block" }}
          className={classes.shortcut}
        >
          Ctrl + K
        </Text>
      </Group>
    </UnstyledButton>
  );
};

export default SearchBar;
