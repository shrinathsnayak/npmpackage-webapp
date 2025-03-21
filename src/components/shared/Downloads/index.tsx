import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useTranslations, useFormatter } from "next-intl";
import {
  Box,
  Button,
  Flex,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconDownload, IconShare2 } from "@tabler/icons-react";
import { downloadDivAsImage } from "@/utils";
import { CHART_DATE_TYPES } from "@/constants";

const AnalyticsCard = dynamic(() => import("./AnalyticsCard"), { ssr: true });
const DownloadGraph = dynamic(() => import("./Graph"), { ssr: true });

const Downloads = ({ downloads, packageName }: any) => {
  const format = useFormatter();
  const { data } = downloads || {};
  const t = useTranslations("downloads");
  const cardRef = useRef<HTMLDivElement>(null);
  const clipboard = useClipboard({ timeout: 1000 });

  const formatValue = (value: string | number) => format.number(Number(value));

  return (
    <Box>
      <Flex align="center" justify="flex-end" mb={15} gap={10}>
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
          {t("export_as_png")}
        </Button>

        <Button
          color="teal.8"
          leftSection={<IconShare2 size={15} />}
          onClick={() => clipboard.copy(window?.location?.href)}
        >
          {clipboard.copied ? t("copied") : t("share")}
        </Button>
      </Flex>
      <div ref={cardRef}>
        <Paper
          px="lg"
          py="md"
          radius="md"
          bg="dark.7"
          shadow="sm"
          mb={15}
          withBorder
        >
          <Flex
            align="center"
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
          >
            <Box display={{ base: "none", sm: "block" }}>
              <Title order={3} c="white">
                {t("total_downloads")}
              </Title>
              <Text fz="sm" c="dimmed" mt={5}>
                {t("cumulative_downloads")}
              </Text>
            </Box>
            <Box display={{ base: "block", sm: "none" }}>
              <Text fz="md" c="dimmed" mb={5}>
                {t("total_downloads")}
              </Text>
            </Box>
            <Title order={1} c="white">
              {formatValue(data?.total)}
            </Title>
          </Flex>
        </Paper>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} mb={15}>
          <AnalyticsCard
            title={t("last_day")}
            value={data?.lastDay}
            previousValue={data?.lastDayPreviousWeek}
            description={t("compared_to_previous_day")}
          />
          <AnalyticsCard
            title={t("last_week")}
            value={data?.lastWeek}
            previousValue={data?.previousWeek}
            description={t("compared_to_previous_week")}
          />
          <AnalyticsCard
            title={t("last_month")}
            value={data?.lastMonth}
            previousValue={data?.previousMonth}
            description={t("compared_to_previous_month")}
          />
          <AnalyticsCard
            title={t("last_year")}
            value={data?.lastYear}
            previousValue={data?.previousYear}
            description={t("compared_to_previous_year")}
          />
        </SimpleGrid>
        <DownloadGraph
          chartType="bar"
          data={data?.allDailyDownloads ?? []}
          type={CHART_DATE_TYPES.daily}
          title={t("daily_downloads")}
        />
        <DownloadGraph
          chartType="bar"
          data={data?.weekly ?? []}
          type={CHART_DATE_TYPES.weekly}
          title={t("weekly_downloads")}
        />
        <DownloadGraph
          data={data?.monthly ?? []}
          type={CHART_DATE_TYPES.monthly}
          chartType="bar"
          xAxisProps={{
            minTickGap: 10,
            interval: "preserveStartEnd",
            tickFormatter: (value: any) =>
              new Intl.DateTimeFormat("en-IN", {
                year: "numeric",
                month: "short",
              }).format(new Date(value)),
          }}
          title={t("monthly_downloads")}
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
          title={t("yearly_downloads")}
        />
      </div>
    </Box>
  );
};

export default Downloads;
