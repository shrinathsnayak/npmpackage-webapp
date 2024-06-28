import React from "react";
import Link from "next/link";
import { Anchor, Badge, Box, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconTag } from "@tabler/icons-react";
import OverviewCard from "@/components/shared/OverviewCard";
import { formatDate } from "@/utils";

const ReleaseCard = ({ name, publishedAt, url, tag }: any) => {
  return (
    <Anchor href={url} component={Link} target="_blank" underline="never">
      <Paper p="sm" radius="md">
        <Text fz="sm" fw="500">
          {name}
        </Text>
        <Badge
          variant="outline"
          color="green"
          opacity={0.9}
          radius={5}
          size="md"
          mt={5}
          leftSection={<IconTag size={12} />}
        >
          {tag.name}
        </Badge>
        <Text fz="xs" mt={5} color="dimmed">
          Published on {formatDate(new Date(publishedAt))}
        </Text>
      </Paper>
    </Anchor>
  );
};

const Releases = ({ releases, repositoryUrl }: any) => {
  const { total, data } = releases || {};
  return (
    <OverviewCard title="Releases" badge={total}>
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" withBorder>
        <SimpleGrid cols={{ base: 1, xs: 3 }}>
          {data?.map((item: any) => {
            return <ReleaseCard key={item.publishedAt} {...item} />;
          })}
        </SimpleGrid>
        <Box mt={15}>
          <Anchor
            display="inline-block"
            component={Link}
            href={`${repositoryUrl}/releases`}
            target="_blank"
          >
            <Text fz="sm">View all {total} releases</Text>
          </Anchor>
        </Box>
      </Paper>
    </OverviewCard>
  );
};

export default Releases;
