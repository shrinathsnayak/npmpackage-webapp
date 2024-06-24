import React from "react";
import { Anchor, Box, Flex, Group, Paper, Text, Title } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import { formatSize } from "@/utils";
import Link from "next/link";

const Size = ({ bundleSize, packageName }: any) => {
  const { gzip, size } = bundleSize || {};
  return (
    <OverviewCard title="Bundle Size">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" withBorder>
        <Flex gap="xs" align="center" justify="space-between">
          <Box>
            <Title order={3}>{formatSize(gzip)}</Title>
            <Text fz="xs" c="dimmed">
              Minified + Gzipped
            </Text>
          </Box>
          <Box>
            <Title order={3}>{formatSize(size)}</Title>
            <Text fz="xs" c="dimmed">
              Minified
            </Text>
          </Box>
        </Flex>
        <Box mt={5}>
          <Anchor
            display="inline-block"
            component={Link}
            href={`https://bundlephobia.com/package/${packageName}`}
            target="_blank"
          >
            <Text fz="sm">View on Bundlephobia</Text>
          </Anchor>
        </Box>
      </Paper>
    </OverviewCard>
  );
};

export default Size;
