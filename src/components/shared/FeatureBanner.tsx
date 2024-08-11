import { Flex, Text, Badge } from "@mantine/core";
import React from "react";

const FeatureBanner = () => {
  return (
    <Flex
      p={6}
      mt={30}
      gap={10}
      px={10}
      bg="dark.9"
      align="center"
      justify="space-between"
      w="fit-content"
      direction={{
        base: "column",
        sm: "row",
      }}
      style={{
        borderRadius: "var(--mantine-radius-sm)",
        boxShadow: "var(--mantine-shadow-lg)",
      }}
    >
      <Badge
        color="blue"
        size="lg"
        display={{ base: "none", sm: "flex" }}
        radius="xs"
        w={90}
      >
        NEW
      </Badge>
      <Text fz="xs">
        {`Feature - Now you can view the package score, which includes metrics for Supply Chain, Quality, Maintenance, Vulnerability, and License.`}
      </Text>
    </Flex>
  );
};

export default FeatureBanner;
