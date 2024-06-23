import React, { useMemo } from "react";
import { PieChart } from "@mantine/charts";
import { Box, Flex, Group, Paper, Text } from "@mantine/core";
import { formatLanguagesData } from "@/utils";
import OverviewCard from "@/components/shared/OverviewCard";
import { IconPointFilled } from "@tabler/icons-react";

export const LanguageLegend = ({ name, color, value }: any) => {
  return (
    <Flex align="center">
      <IconPointFilled fill={color} />
      <Text fz="xs">
        {name}
        <span> ({value}%)</span>
      </Text>
    </Flex>
  );
};

const Languages = ({ languages }: any) => {
  const languagesData = useMemo(() => {
    return formatLanguagesData(languages);
  }, [languages]);

  return (
    <OverviewCard title="Languages">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" withBorder>
        <PieChart data={languagesData} mx="auto" size={180} h={200} />
        <Group gap={2} mt={10}>
          {languagesData?.map((item: any) => (
            <LanguageLegend key={item.name} {...item} />
          ))}
        </Group>
      </Paper>
    </OverviewCard>
  );
};

export default Languages;
