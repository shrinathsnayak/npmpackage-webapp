import React from "react";
import NextImage from "next/image";
import { Flex, Image, Text, Paper } from "@mantine/core";
import { EMPTY_TYPE, EMPTY_STATE } from "@/constants/empty";

interface EmptyStateProps {
  type: string;
}

const EmptyState = ({ type }: EmptyStateProps) => {
  const messages = EMPTY_STATE[type || EMPTY_TYPE.DEFAULT];
  return (
    <Paper
      my={15}
      w="100%"
      h="100%"
      radius="md"
      bg="dark.9"
      shadow="xs"
      p={{ base: 15, sm: 10 }}
    >
      <Flex p={10} align="center" justify="center" direction="column" gap={5}>
        <Image
          w="150"
          h="150"
          radius="md"
          component={NextImage}
          src={messages.image}
          width={200}
          height={200}
          alt="Empty State"
        />
        <Text c="red.8" fz="md" ta="center" fw="bold" mb={5}>
          {messages?.text}
        </Text>
      </Flex>
    </Paper>
  );
};

export default EmptyState;
