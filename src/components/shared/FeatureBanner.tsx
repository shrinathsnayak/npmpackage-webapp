import React from "react";
import { Flex, Text, Badge, Affix } from "@mantine/core";

const FeatureBanner = () => {
  return (
    <Affix position={{ top: 0, right: 0, left: 0 }}>
      <Flex
        p={{ base: 8, sm: 12 }}
        gap={10}
        bg="dark.7"
        align="center"
        justify="center"
        direction={{
          base: "column",
          sm: "row",
        }}
        style={{
          boxShadow: "var(--mantine-shadow-md)",
        }}
      >
        <Badge
          color="red.8"
          size="md"
          display={{ base: "none", sm: "flex" }}
          radius="sm"
        >
          Feature
        </Badge>
        <Text fz={{ base: "xs", sm: "sm" }} ta="center" c="white">
          Now you can view the package score, which includes metrics for Supply
          Chain Risk, Quality, Maintenance, Vulnerability, and License.
        </Text>
      </Flex>
    </Affix>
  );
};

export default FeatureBanner;
