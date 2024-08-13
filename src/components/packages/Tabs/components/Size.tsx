import React from "react";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import { Anchor, Box, Flex, Paper, Text, Title } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import { formatSize } from "@/utils";

const Size = ({ bundleSize, packageName }: any) => {
  const { gzip, size } = bundleSize || {};
  return (
    <OverviewCard title="Bundle Size">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" withBorder>
        <Flex gap="xs" align="center" justify="space-between">
          <Box>
            <Title order={3} c="white">
              {formatSize(size)}
            </Title>
            <Text fz="xs" c="dimmed">
              Minified
            </Text>
          </Box>
          <Box>
            <Title order={3} c="white">
              {formatSize(gzip)}
            </Title>
            <Text fz="xs" c="dimmed">
              Minified + Gzipped
            </Text>
          </Box>
        </Flex>
        <Box mt={6} mb={0}>
          <Anchor
            display="inline-block"
            component={Link}
            prefetch
            href={`https://bundlephobia.com/package/${packageName}`}
            target="_blank"
          >
            <Flex align="center" gap={8}>
              <Text fz="sm" fw={400}>
                Bundlephobia
              </Text>
              <IconExternalLink
                style={{ width: 18, height: 18 }}
                stroke={1.5}
              />
            </Flex>
          </Anchor>
        </Box>
      </Paper>
    </OverviewCard>
  );
};

export default Size;
