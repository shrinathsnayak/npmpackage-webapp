import React from "react";
import Link from "next/link";
import { Flex, Text, Anchor } from "@mantine/core";
import { ProductHuntIcon } from "./Icons";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const PRODUCT_HUNT_URL = "https://www.producthunt.com/posts/npmpackage-info";

const ProductHuntLaunch = () => {
  return (
    <Anchor
      prefetch
      target="_blank"
      component={Link}
      underline="never"
      href={PRODUCT_HUNT_URL}
    >
      <Flex
        p={6}
        mb={20}
        gap={8}
        px={10}
        bg="dark.7"
        align="center"
        justify="space-between"
        w="fit-content"
        style={{
          borderRadius: "var(--mantine-radius-xl)",
          boxShadow: "var(--mantine-shadow-xl)",
        }}
      >
        <ProductHuntIcon />
        <Text c="white" fz="sm" mt={-1}>
          Review us on product hunt
        </Text>
        <IconArrowNarrowRight color="white" />
      </Flex>
    </Anchor>
  );
};

export default ProductHuntLaunch;
