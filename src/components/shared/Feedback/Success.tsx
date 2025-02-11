"use client";

import { Flex, rem, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";

const Success = () => {
  const t = useTranslations("feedback");
  return (
    <Flex align="center" justify="center" direction="column" p={5} gap={10}>
      <IconRosetteDiscountCheckFilled
        fill="#40c057"
        style={{ width: rem(50), height: rem(50) }}
      />
      <Text ta="center" mt={5}>
        {t("success")}
      </Text>
    </Flex>
  );
};

export default Success;
