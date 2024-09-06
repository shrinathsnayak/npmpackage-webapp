import React, { memo, useMemo } from "react";
import { PieChart } from "@mantine/charts";
import { Box, Flex, Group, Paper, Text } from "@mantine/core";
import { formatLanguagesData } from "@/utils";
import OverviewCard from "@/components/shared/OverviewCard";
import { IconPointFilled } from "@tabler/icons-react";

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

  return (
    <OverviewCard title="Languages">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" withBorder>
        <PieChart data={languagesData} mx="auto" size={180} h={200} />
        <Group gap={2} mt={10}>
          {languagesData
            ?.sort((a: any, b: any) => b.value - a.value)
            ?.map((item: any) => (
              <LanguageLegend key={item.name} {...item} />
            ))}
        </Group>
      </Paper>
    </OverviewCard>
  );
};

export default Languages;
