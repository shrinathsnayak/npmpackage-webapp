import { useTranslations, useFormatter } from "next-intl";
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
  const t = useTranslations();
  const format = useFormatter();
  const to = useTranslations("overview");
  const tg = useTranslations("github");
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

  const formatNumber = (value: number) => format.number(value);
  const formatDate = (value: Date) =>
    format.dateTime(new Date(value || new Date()), {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  return (
    <OverviewCard title={to("gitHub_statistics")}>
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        {license && (
          <Stat
            tooltip={tg("license")}
            icon={<IconLicense size={16} color="#fff" stroke={2} />}
            value={license}
          />
        )}
        {stars > 0 && (
          <Stat
            tooltip={tg("stars")}
            icon={<IconStar size={16} color="#fff" stroke={2} />}
            value={formatNumber(stars)}
          />
        )}
        {commits > 0 && (
          <Stat
            tooltip={tg("commits")}
            icon={<IconHistory size={16} color="#fff" stroke={2} />}
            value={formatNumber(commits)}
          />
        )}
        {forks > 0 && (
          <Stat
            tooltip={tg("forks")}
            icon={<IconGitFork size={16} color="#fff" stroke={2} />}
            value={formatNumber(forks)}
          />
        )}
        {watchers > 0 && (
          <Stat
            tooltip={tg("watchers")}
            icon={<IconEye size={16} color="#fff" stroke={2} />}
            value={formatNumber(watchers)}
          />
        )}
        {branches > 0 && (
          <Stat
            tooltip={tg("branches")}
            icon={<IconGitBranch size={16} color="#fff" stroke={2} />}
            value={formatNumber(branches)}
          />
        )}
        {contributors > 0 && (
          <Stat
            tooltip={to("contributors")}
            icon={<IconUsers size={16} color="#fff" stroke={2} />}
            value={formatNumber(contributors)}
          />
        )}
        {updatedAt && (
          <Stat
            icon={<IconReload size={16} color="#fff" stroke={2} />}
            value={`${t("updated_on")} ${formatDate(new Date(updatedAt))}`}
          />
        )}
      </Paper>
    </OverviewCard>
  );
};

export default Statistics;
