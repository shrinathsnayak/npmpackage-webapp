import Link from "next/link";
import React from "react";
import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  NumberFormatter,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import { IconExternalLink } from "@tabler/icons-react";

const ActionsCard = ({ data, link }: any) => {
  const { total, open, closed, merged } = data || {};
  return (
    <Box>
      <Flex p="md" px="lg" justify="space-between">
        <Box>
          <Text fz="xs" c="dimmed" mb={1}>
            Open
          </Text>
          <Title order={2} c="green.6">
            <NumberFormatter thousandSeparator value={Number(open)} />
          </Title>
        </Box>
        <ActionIcon
          prefetch
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
      <Divider />
      <Flex align="center" justify="space-around">
        <Box p="xs" ta="center">
          <Text fz="sm" c="dimmed">
            Total
          </Text>
          <Title order={4}>
            <NumberFormatter thousandSeparator value={Number(total)} />
          </Title>
        </Box>
        <Divider orientation="vertical" />
        <Box p="xs" ta="center">
          <Text fz="sm" c="dimmed">
            Closed
          </Text>
          <Title order={4} c="red.6">
            <NumberFormatter thousandSeparator value={Number(closed)} />
          </Title>
        </Box>
        {merged > 0 && (
          <>
            <Divider orientation="vertical" />
            <Box p="xs" ta="center">
              <Text fz="sm" c="dimmed">
                Merged
              </Text>
              <Title order={4} c="grape.6">
                <NumberFormatter thousandSeparator value={Number(merged)} />
              </Title>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};

const Actions = ({ prs, issues, repositoryUrl }: any) => {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={{ base: 5, sm: 20 }}>
      <OverviewCard title="Pull Requests">
        <Paper p={0} radius="md" bg="dark.9" shadow="sm" withBorder>
          <ActionsCard data={prs} link={`${repositoryUrl}/pulls`} />
        </Paper>
      </OverviewCard>
      <OverviewCard title="Issues">
        <Paper p={0} radius="md" bg="dark.9" shadow="sm" withBorder>
          <ActionsCard data={issues} link={`${repositoryUrl}/issues`} />
        </Paper>
      </OverviewCard>
    </SimpleGrid>
  );
};

export default Actions;
