import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { useTranslations } from "next-intl";
import { Anchor, Flex, Image, Paper, Title } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";

const Developer = ({ avatar, owner, developerUrl }: any) => {
  const t = useTranslations("overview");
  return (
    <OverviewCard title={t("developer")}>
      <Paper p="lg" radius="md" bg="dark.7" shadow="sm" withBorder>
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
          <Conditional if={developerUrl}>
            <Anchor
              component={Link}
              fw={500}
              c="white"
              target="_blank"
              href={developerUrl}
              underline="hover"
            >
              {owner}
            </Anchor>
          </Conditional>
          <Conditional if={!developerUrl}>
            <Title order={5} fw={500} c="white">
              {owner}
            </Title>
          </Conditional>
        </Flex>
      </Paper>
    </OverviewCard>
  );
};

export default Developer;
