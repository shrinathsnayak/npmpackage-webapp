import React from "react";
import Link from "next/link";
import {
  Anchor,
  Badge,
  Box,
  Paper,
  SimpleGrid,
  Text,
  NumberFormatter,
} from "@mantine/core";
import { IconTag } from "@tabler/icons-react";
import OverviewCard from "@/components/shared/OverviewCard";
import { formatDate } from "@/utils";

const ReleaseCard = ({ name, publishedAt, url, tag }: any) => {
  return (
    <Anchor
      href={url}
      component={Link}
      target="_blank"
      underline="never"
    >
      <Paper p="sm" radius="md" h="100%">
        <Text fz="sm" fw="500">
          {name || tag?.name}
        </Text>
        <Badge
          mt={5}
          size="md"
          maw="100%"
          radius={5}
          opacity={0.9}
          color="green"
          variant="outline"
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
    <OverviewCard
      title="Releases"
      badge={<NumberFormatter thousandSeparator value={total} />}
    >
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
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
            <Text fz="sm">
              View all <NumberFormatter thousandSeparator value={total} />{" "}
              releases
            </Text>
          </Anchor>
        </Box>
      </Paper>
    </OverviewCard>
  );
};

export default Releases;
