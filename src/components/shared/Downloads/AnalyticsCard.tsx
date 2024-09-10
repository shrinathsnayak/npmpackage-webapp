import React from "react";
import { Group, NumberFormatter, Paper, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import classes from "./Downloads.module.css";

const AnalyticsCard = ({ value, previousValue, title, type }: any) => {
  const difference =
    value !== 0 && previousValue !== 0
      ? ((value - previousValue) / previousValue) * 100
      : 0;
  const DiffIcon = difference > 0 ? IconArrowUpRight : IconArrowDownRight;
  return (
    <Paper
      p="md"
      radius="md"
      key={title}
      bg="dark.9"
      shadow="sm"
      className={classes.analyticsCard}
    >
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.analyticsCardTitle}>
          {title}
        </Text>
        <Group>
          <Text
            c={difference > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={classes.analyticsCardDiff}
          >
            <span>
              {(difference || 0).toLocaleString("en", {
                maximumFractionDigits: 1,
              })}
              %
            </span>
            <DiffIcon
              size="1rem"
              stroke={1.5}
              className={classes.analyticsCardDiffIcon}
            />
          </Text>
        </Group>
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text className={classes.analyticsCardValue} c="white">
          <NumberFormatter thousandSeparator value={value} />
        </Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous {type}
      </Text>
    </Paper>
  );
};

export default AnalyticsCard;
