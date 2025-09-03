import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Flex, Text, Anchor } from "@mantine/core";
import { ProductHuntIcon } from "./Icons";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const ProductHuntLaunch = () => {
  const t = useTranslations();
  return (
    <Anchor
      component={Link}
      underline="never"
      href="mailto:shrinathnayak07@gmail.com"
      target="_blank"
    >
      <Flex
        p={6}
        mb={20}
        gap={8}
        px={10}
        bg="red.8"
        align="center"
        justify="space-between"
        w="fit-content"
        style={{
          borderRadius: "var(--mantine-radius-xl)",
          boxShadow: "var(--mantine-shadow-xl)",
        }}
      >
        {/* <ProductHuntIcon /> */}
        {/* <Text c="white" fz="sm">
          {t("become_sponsor")}
        </Text> */}
        <Text c="white" fz="sm">
          🚀
        </Text>
        <Text c="white" fz="sm">
          npmpackage.info for sale
        </Text>
        <IconArrowNarrowRight color="white" />
      </Flex>
    </Anchor>
  );
};

export default ProductHuntLaunch;
