import React from "react";
import { Group, Paper, Text } from "@mantine/core";
import {
  IconEye,
  IconGitBranch,
  IconGitFork,
  IconHistory,
  IconLicense,
  IconReload,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";
import OverviewCard from "@/components/shared/OverviewCard";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import { formatDate } from "@/utils";

const Stat = ({ icon, value, tooltip }: any) => {
  return (
    <Group mb={5} gap={10} align="center">
      {icon}
      <Text fz="sm" fw={400} c="white">
        {value} {tooltip}
      </Text>
    </Group>
  );
};

const Statistics = ({ data }: any) => {
  const {
    commits,
    license,
    stars,
    forks,
    branches,
    watchers,
    contributors,
    updatedAt,
  } = data || {};
  return (
    <OverviewCard title="Statistics">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        {license && (
          <Stat
            tooltip="License"
            icon={<IconLicense size={16} color="#fff" stroke={2} />}
            value={license}
          />
        )}
        {stars > 0 && (
          <Stat
            tooltip="Stars"
            icon={<IconStar size={16} color="#fff" stroke={2} />}
            value={<AnimatedNumber value={stars} />}
          />
        )}
        {commits > 0 && (
          <Stat
            tooltip="Commits"
            icon={<IconHistory size={16} color="#fff" stroke={2} />}
            value={<AnimatedNumber value={commits} />}
          />
        )}
        {forks > 0 && (
          <Stat
            tooltip="Forks"
            icon={<IconGitFork size={16} color="#fff" stroke={2} />}
            value={<AnimatedNumber value={forks} />}
          />
        )}
        {watchers > 0 && (
          <Stat
            tooltip="Watching"
            icon={<IconEye size={16} color="#fff" stroke={2} />}
            value={<AnimatedNumber value={watchers} />}
          />
        )}
        {branches > 0 && (
          <Stat
            tooltip="Branches"
            icon={<IconGitBranch size={16} color="#fff" stroke={2} />}
            value={<AnimatedNumber value={branches} />}
          />
        )}
        {contributors > 0 && (
          <Stat
            tooltip="Contributors"
            icon={<IconUsers size={16} color="#fff" stroke={2} />}
            value={<AnimatedNumber value={contributors} />}
          />
        )}
        {updatedAt && (
          <Stat
            icon={<IconReload size={16} color="#fff" stroke={2} />}
            value={`Updated on ${formatDate(new Date(updatedAt))}`}
          />
        )}
      </Paper>
    </OverviewCard>
  );
};

export default Statistics;
