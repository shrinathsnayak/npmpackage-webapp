import React from "react";
import NextImage from "next/image";
import { Anchor, Flex, Image, Paper, Title } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import Link from "next/link";
import Conditional from "@/components/shared/Conditional";

const Developer = ({ avatar, owner, developerUrl }: any) => {
  return (
    <OverviewCard title="Developer">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" withBorder>
        <Flex gap={10} align="center">
          <Image
            width={20}
            height={20}
            radius="sm"
            src={avatar}
            priority={true}
            component={NextImage}
            alt={`${owner} logo`}
          />
          <Anchor
            component={Link}
            fw={500}
            c="white"
            target="_blank"
            href={developerUrl ?? ""}
            underline="never"
          >
            {owner}
          </Anchor>
        </Flex>
      </Paper>
    </OverviewCard>
  );
};

export default Developer;
