import React, { useRef } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Flex,
  NumberFormatter,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { downloadDivAsImage } from "@/utils";
import { IconDownload, IconShare2 } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";
import { CHART_DATE_TYPES } from "@/constants";

const AnalyticsCard = dynamic(() => import("./AnalyticsCard"), { ssr: true });
const DownloadGraph = dynamic(() => import("./Graph"), { ssr: true });

const Downloads = ({
  downloads,
  showDailyDownloads = false,
  packageName,
}: any) => {
  const { data } = downloads || {};
  const cardRef = useRef<HTMLDivElement>(null);
  const clipboard = useClipboard({ timeout: 1000 });

  return (
    <Box>
      <Flex align="center" justify={{ sm: "flex-end" }} mb={15} gap={10}>
        <Button
          color="red.8"
          leftSection={<IconDownload size={15} />}
          onClick={() =>
            downloadDivAsImage(
              cardRef,
              `npmpackage.info - ${packageName} downloads`
            )
          }
        >
          Export as PNG
        </Button>

        <Button
          color="teal.8"
          leftSection={<IconShare2 size={15} />}
          onClick={() => clipboard.copy(window?.location?.href)}
        >
          {clipboard.copied ? "Copied" : "Share"}
        </Button>
      </Flex>
      <div ref={cardRef}>
        <Paper p="lg" radius="md" bg="dark.9" shadow="sm" mb={15}>
          <Flex
            align="center"
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
          >
            <Box display={{ base: "none", sm: "block" }}>
              <Title order={3} c="white">Total Downloads</Title>
              <Text fz="sm" c="dimmed" mt={5}>
                Cumulative downloads
              </Text>
            </Box>
            <Box display={{ base: "block", sm: "none" }}>
              <Text fz="md" c="dimmed" mb={5}>
                Total Downloads
              </Text>
            </Box>
            <Title order={1} c="white">
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
        <DownloadGraph data={data?.allDailyDownloads ?? []} type={CHART_DATE_TYPES.daily} />
        <DownloadGraph data={data?.weekly ?? []} type={CHART_DATE_TYPES.weekly} />
        <DownloadGraph
          data={data?.monthly ?? []}
          type={CHART_DATE_TYPES.monthly}
          chartType="bar"
          xAxisProps={{
            minTickGap: 10,
            interval: "preserveStartEnd",
            tickFormatter: (value: any) => new Intl.DateTimeFormat("en-IN", {
              year: "numeric",
              month: "short",
            }).format(new Date(value)),
          }}
        />
        <DownloadGraph
          data={data?.yearly ?? []}
          type={CHART_DATE_TYPES.yearly}
          chartType="bar"
          xAxisProps={{
            minTickGap: 8,
            interval: "preserveStartEnd",
            tickFormatter: (value: any) => new Date(value).getFullYear(),
          }}
        />
      </div>
    </Box>
  );
};

export default Downloads;
