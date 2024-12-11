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
  const { data } = downloads || {};
  const { lastDay, lastMonth, lastWeek, lastYear, total } = data || {};
  return (
    <OverviewCard title="Download Statistics">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        <DownloadCard label="Total Downloads" value={total} />
        <SimpleGrid mt="sm" cols={2} spacing="sm" verticalSpacing="sm">
          <DownloadCard label="Last Day" value={lastDay} />
          <DownloadCard label="Last Week" value={lastWeek} />
          <DownloadCard label="Last Month" value={lastMonth} />
          <DownloadCard label="Last Year" value={lastYear} />
        </SimpleGrid>
      </Paper>
    </OverviewCard>
  );
};

export default DownloadStatistics;
