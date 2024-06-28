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
      <Group gap="md">
        <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={2} />
        <Text fz="lg" c="dimmed" pr={80}>
          Search Package
        </Text>
      </Group>
    </UnstyledButton>
  );
};

export default SearchBar;
