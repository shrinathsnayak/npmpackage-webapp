import React from "react";
import NextImage from "next/image";
import { Flex, Image, Paper, Title } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";

const Developer = ({ avatar, owner }: any) => {
  return (
    <OverviewCard title="Developer">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" withBorder>
        <Flex gap={10} align="center">
          <Image
            width={20}
            height={20}
            radius="sm"
            src={avatar}
            loading="lazy"
            component={NextImage}
            alt={`${owner} logo`}
          />
          <Title order={5} fw={500}>
            {owner}
          </Title>
        </Flex>
      </Paper>
    </OverviewCard>
  );
};

export default Developer;
