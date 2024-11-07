"use client";

import { Flex, rem, Text } from "@mantine/core";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";

const Success = () => {
  return (
    <Flex align="center" justify="center" direction="column" p={5} gap={10}>
      <IconRosetteDiscountCheckFilled
        fill="#40c057"
        style={{ width: rem(50), height: rem(50) }}
      />
      <Text ta="center" mt={5}>
        Thanks for your feedback! We’ll keep improving and hope to hear from you
        again soon.
      </Text>
    </Flex>
  );
};

export default Success;
