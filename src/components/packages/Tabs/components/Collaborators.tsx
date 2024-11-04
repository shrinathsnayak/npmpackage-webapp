import React from "react";
import Link from "next/link";
import {
  Anchor,
  Avatar,
  Box,
  Group,
  Paper,
  Text,
  Tooltip,
  NumberFormatter,
} from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";

const Collaborators = ({
  contributorsCount,
  contributors = [],
  repositoryUrl,
}: any) => {
  return (
    <OverviewCard
      title="Contributors"
      badge={<NumberFormatter thousandSeparator value={contributorsCount} />}
    >
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        <Tooltip.Group openDelay={300} closeDelay={100}>
          <Group gap="xs">
            {contributors.length > 0 &&
              contributors?.map((item: any) => (
                <Tooltip label={item?.name} withArrow key={item?.name}>
                  <Anchor
                    component={Link}
                    href={
                      item?.profile_url || `https://github.com/${item?.name}`
                    }
                    target="_blank"
                    prefetch
                  >
                    <Avatar
                      size="md"
                      src={item?.url}
                      radius="xl"
                      alt={item?.name}
                      imageProps={{
                        loading: "lazy",
                      }}
                    />
                  </Anchor>
                </Tooltip>
              ))}
          </Group>
        </Tooltip.Group>
        <Conditional if={repositoryUrl}>
          <Box mt={15}>
            <Anchor
              display="inline-block"
              component={Link}
              prefetch
              href={`${repositoryUrl}/contributors`}
              target="_blank"
            >
              <Text fz="sm">
                View all{" "}
                <NumberFormatter thousandSeparator value={contributorsCount} />{" "}
                contributors
              </Text>
            </Anchor>
          </Box>
        </Conditional>
      </Paper>
    </OverviewCard>
  );
};

export default Collaborators;
