import { useTranslations } from "next-intl";
import { Paper, Box, Text, SimpleGrid } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import AnimatedNumber from "@/components/shared/AnimatedNumber";

const DownloadCard = ({ label, value }: any) => {
  return (
    <Box>
      <Text fz="xs" c="dimmed" fw={500}>
        {label}
      </Text>
      <Text fz="lg" fw={600} c="white">
        <AnimatedNumber value={value} />
      </Text>
    </Box>
  );
};
const DownloadStatistics = ({ downloads }: any) => {
  const to = useTranslations("overview");
  const td = useTranslations("downloads");
  const { data } = downloads || {};
  const { lastDay, lastMonth, lastWeek, lastYear, total } = data || {};
  return (
    <OverviewCard title={to("download_statistics")}>
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        <DownloadCard label={td("total_downloads")} value={total} />
        <SimpleGrid mt="sm" cols={2} spacing="sm" verticalSpacing="sm">
          <DownloadCard label={td("last_day")} value={lastDay} />
          <DownloadCard label={td("last_week")} value={lastWeek} />
          <DownloadCard label={td("last_month")} value={lastMonth} />
          <DownloadCard label={td("last_year")} value={lastYear} />
        </SimpleGrid>
      </Paper>
    </OverviewCard>
  );
};

export default DownloadStatistics;
