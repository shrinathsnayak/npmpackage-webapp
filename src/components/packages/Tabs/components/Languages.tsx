import React, { memo, useMemo } from "react";
import {
  Flex,
  Group,
  isLightColor,
  Paper,
  Progress,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import { formatLanguagesData } from "@/utils";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";

export const LanguageLegend = memo(({ name, color, value }: any) => {
  if (value) {
    return (
      <Flex align="center">
        <IconPointFilled fill={color} />
        <Text fz="xs" c="white">
          {name}
          <span> ({value}%)</span>
        </Text>
      </Flex>
    );
  }
});

LanguageLegend.displayName = "LanguageLegend";

const Languages = ({ languages }: any) => {
  const languagesData = useMemo(() => {
    return formatLanguagesData(languages);
  }, [languages]);

  const MemoizedProgress = useMemo(
    () => (
      <Progress.Root size={18} mb={10}>
        {languagesData
          ?.sort((a: any, b: any) => b.value - a.value)
          ?.map((item: any) => (
            <Conditional if={item} key={item.name}>
              <Tooltip
                withArrow
                color="dark.8"
                label={`${item.name} - ${item.value}%`}
              >
                <Progress.Section value={item.value} color={item.color}>
                  <Progress.Label
                    fz={10}
                    fw={500}
                    c={isLightColor(item?.color || "white") ? "black" : "white"}
                  >
                    {item.name}
                  </Progress.Label>
                </Progress.Section>
              </Tooltip>
            </Conditional>
          ))}
      </Progress.Root>
    ),
    [languagesData]
  );

  const legendItems = useMemo(() => {
    return languagesData
      ?.sort((a: any, b: any) => b.value - a.value)
      ?.map((item: any) => <LanguageLegend key={item.name} {...item} />);
  }, [languagesData]);

  return (
    <OverviewCard title="Languages">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        {MemoizedProgress}
        <Group gap={2} mt={20}>
          {legendItems}
        </Group>
      </Paper>
    </OverviewCard>
  );
};

export default Languages;
