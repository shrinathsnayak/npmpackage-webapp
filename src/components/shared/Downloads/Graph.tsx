import React from "react";
import { useTranslations, useFormatter } from "next-intl";
import {
  AreaChart,
  BarChart,
  getFilteredChartTooltipPayload,
} from "@mantine/charts";
import { Group, Paper, Text, Title } from "@mantine/core";
import { CHART_DATE_TYPES } from "@/constants";

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
  type: string | any;
}

const ChartsMapping: any = {
  area: AreaChart,
  bar: BarChart,
};
function ChartTooltip({ label, payload, type }: ChartTooltipProps) {
  const t = useTranslations();
  const format = useFormatter();
  if (!payload) return null;

  const date = new Date(label || new Date());

  const labelMapping = {
    [CHART_DATE_TYPES.yearly]: date.getFullYear(),
    [CHART_DATE_TYPES.monthly]: format.dateTime(new Date(date), {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
  };

  return (
    <Paper px="md" py="sm" shadow="md" radius="md" bg="dark.9" withBorder>
      <Text fw={500} mb={5} fz="sm" c="white">
        {labelMapping[type] ||
          format.dateTime(date, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
      </Text>
      {getFilteredChartTooltipPayload(payload)?.map((item: any) => (
        <Group key={item.name} gap={4}>
          <Text fz="sm" c="dimmed">
            {t("tabs.downloads")}:
          </Text>
          <Text fz="sm" c={item.color} fw="bold">
            {format.number(item?.value || 0)}
          </Text>
        </Group>
      ))}
    </Paper>
  );
}

const DownloadGraph = ({
  data,
  type,
  chartType = "area",
  xAxisProps,
  yAxisProps,
  title,
}: any) => {
  const format = useFormatter();
  const Chart = ChartsMapping[chartType];
  return (
    <Paper p="lg" radius="md" bg="dark.7" shadow="sm" mb={15} withBorder>
      <Title order={5} mb={50}>
        {title}
      </Title>
      <Chart
        h={300}
        data={data}
        dataKey="day"
        strokeWidth={2}
        withDots={false}
        curveType="linear"
        gridColor="gray.1"
        fillOpacity={0.51}
        tooltipAnimationDuration={200}
        legendProps={{ verticalAlign: "bottom" }}
        series={[{ name: "downloads", color: "red.8" }]}
        yAxisProps={
          yAxisProps || {
            tickFormatter: (value: number) =>
              format.number(value || 0, {
                notation: "compact",
                compactDisplay: "short",
              }),
          }
        }
        xAxisProps={
          xAxisProps || {
            minTickGap: 8,
            interval: "preserveStartEnd",
            tickFormatter: (value: any) =>
              format.dateTime(new Date(value), {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }),
          }
        }
        tooltipProps={{
          content: ({ label, payload }: any) => (
            <ChartTooltip label={label} payload={payload} type={type} />
          ),
        }}
        valueFormatter={(value: any) =>
          format.number(value || 0, {
            notation: "compact",
            compactDisplay: "short",
          })
        }
      />
    </Paper>
  );
};

export default DownloadGraph;
