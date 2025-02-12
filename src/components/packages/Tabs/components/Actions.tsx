import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import OverviewCard from "@/components/shared/OverviewCard";
import AnimatedNumber from "@/components/shared/AnimatedNumber";

const ActionsCard = ({ data, link }: any) => {
  const t = useTranslations("overview");
  const { total, open, closed, merged } = data || {};
  return (
    <Box>
      <Flex p="md" px="lg" justify="space-between">
        <Box>
          <Text fz="xs" c="white" mb={1}>
            {t("open")}
          </Text>
          <Title order={2} c="green.6">
            <AnimatedNumber value={open} />
          </Title>
        </Box>
        <ActionIcon
          variant="light"
          color="gray"
          component={Link}
          href={link}
          target="_blank"
        >
          <IconExternalLink
            style={{ width: "60%", height: "60%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Flex>
      <Divider c="dark.7" />
      <Flex align="center" justify="space-around">
        <Box p="xs" ta="center">
          <Text fz="sm" c="white">
            {t("total")}
          </Text>
          <Title order={4}>
            <AnimatedNumber value={Number(total)} />
          </Title>
        </Box>
        <Divider orientation="vertical" c="dark.7" />
        <Box p="xs" ta="center">
          <Text fz="sm" c="white">
            {t("closed")}
          </Text>
          <Title order={4} c="red.6">
            <AnimatedNumber value={Number(closed)} />
          </Title>
        </Box>
        {merged > 0 && (
          <>
            <Divider orientation="vertical" c="dark.7" />
            <Box p="xs" ta="center">
              <Text fz="sm" c="white">
                {t("merged")}
              </Text>
              <Title order={4} c="grape.6">
                <AnimatedNumber value={Number(merged)} />
              </Title>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};

const Actions = ({ prs, issues, repositoryUrl }: any) => {
  const t = useTranslations("overview");
  return (
    <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={{ base: 5, sm: 20 }}>
      <OverviewCard title={t("pull_requests")}>
        <Paper p={0} radius="md" bg="dark.9" shadow="sm">
          <ActionsCard data={prs} link={`${repositoryUrl}/pulls`} />
        </Paper>
      </OverviewCard>
      <OverviewCard title={t("issues")}>
        <Paper p={0} radius="md" bg="dark.9" shadow="sm">
          <ActionsCard data={issues} link={`${repositoryUrl}/issues`} />
        </Paper>
      </OverviewCard>
    </SimpleGrid>
  );
};

export default Actions;
