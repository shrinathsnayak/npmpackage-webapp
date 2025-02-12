import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Flex, Text, Anchor } from "@mantine/core";
import { ProductHuntIcon } from "./Icons";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const ProductHuntLaunch = () => {
  const t = useTranslations();
  return (
    <Anchor component={Link} underline="never" href="/sponsor">
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
        <Text c="white" fz="sm">
          {t("become_sponsor")}
        </Text>
        <IconArrowNarrowRight color="white" />
      </Flex>
    </Anchor>
  );
};

export default ProductHuntLaunch;
