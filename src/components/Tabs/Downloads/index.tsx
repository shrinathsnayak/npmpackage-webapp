import {
  Box,
  Flex,
  NumberFormatter,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import AnalyticsCard from "./AnalyticsCard";
import DownloadGraph from "./Graph";

const Downloads = ({ downloads }: any) => {
  const { status, data } = downloads;
  return (
    <Box>
      <Paper withBorder p="lg" radius="md" bg="dark.9" shadow="sm" mb={15}>
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column-reverse", sm: "row" }}
        >
          <Box display={{ base: "none", sm: "block" }}>
            <Title order={3}>Total Downloads</Title>
            <Text fz="sm" c="dimmed" mt={5}>
              Cumulative downloads over the years
            </Text>
          </Box>
          <Title order={1}>
            <NumberFormatter thousandSeparator value={data?.total} />
          </Title>
        </Flex>
      </Paper>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} mb={15}>
        <AnalyticsCard
          title="Last day"
          value={data?.lastDay}
          previousValue={data?.lastDayPreviousWeek}
          type="day"
        />
        <AnalyticsCard
          title="Last week"
          value={data?.lastWeek}
          previousValue={data?.previousWeek}
          type="week"
        />
        <AnalyticsCard
          title="Last month"
          value={data?.lastMonth}
          previousValue={data?.previousMonth}
          type="month"
        />
        <AnalyticsCard
          title="Last year"
          value={data?.lastYear}
          previousValue={data?.previousYear}
          type="year"
        />
      </SimpleGrid>
      <DownloadGraph data={data?.weekly} type="Weekly" />
      <DownloadGraph data={data?.monthly} type="Monthly" chartType="bar" />
      <DownloadGraph data={data?.yearly} type="Yearly" chartType="bar" />
    </Box>
  );
};

export default Downloads;
