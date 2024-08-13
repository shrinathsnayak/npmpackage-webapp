import React from "react";
import {
  AreaChart,
  BarChart,
  getFilteredChartTooltipPayload,
} from "@mantine/charts";
import { Group, NumberFormatter, Paper, Text, Title } from "@mantine/core";
import { formatDate } from "@/utils";

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

const ChartsMapping: any = {
  area: AreaChart,
  bar: BarChart,
};
function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5} fz="lg" c="white">
        {label}
      </Text>
      {getFilteredChartTooltipPayload(payload)?.map((item: any) => (
        <Group key={item.name} gap={4}>
          <Text fz="sm" c="dimmed">
            {item.name}:
          </Text>
          <Text fz="sm" c={item.color} fw="bold">
            <NumberFormatter thousandSeparator value={item?.value} />
          </Text>
        </Group>
      ))}
    </Paper>
  );
}

const DownloadGraph = ({ data, type, chartType = "area" }: any) => {
  const Chart = ChartsMapping[chartType];
  return (
    <Paper withBorder p="lg" radius="md" bg="dark.9" shadow="sm" mb={15}>
      <Title order={5} mb={50}>
        {type} Downloads
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
        yAxisProps={{
          tickFormatter: (value: number) =>
            new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value || 0),
        }}
        xAxisProps={{
          minTickGap: 8,
          interval: "preserveStartEnd",
          tickFormatter: (value: any) => formatDate(new Date(value)),
        }}
        tooltipProps={{
          content: ({ label, payload }: any) => (
            <ChartTooltip label={label} payload={payload} />
          ),
        }}
        valueFormatter={(value: any) =>
          new Intl.NumberFormat("en-US").format(value || 0)
        }
      />
    </Paper>
  );
};

export default DownloadGraph;
