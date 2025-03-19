import React from "react";
import { useTranslations, useFormatter } from "next-intl";
import { Group, Paper, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import AnimatedNumber from "../AnimatedNumber";
import classes from "./Downloads.module.css";

const AnalyticsCard = ({ value, previousValue, title, description }: any) => {
  const format = useFormatter();
  const difference =
    value !== 0 && previousValue !== 0
      ? ((value - previousValue) / previousValue) * 100
      : 0;
  const DiffIcon = difference > 0 ? IconArrowUpRight : IconArrowDownRight;

  const formatValue = (value: string | number) => format.number(Number(value));

  return (
    <Paper
      p="md"
      radius="md"
      key={title}
      bg="dark.7"
      shadow="sm"
      withBorder
      className={classes.analyticsCard}
    >
      <Group justify="space-between">
        <Text size="xs" c="white" className={classes.analyticsCardTitle}>
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
          {formatValue(value)}
        </Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        {description}
      </Text>
    </Paper>
  );
};

export default AnalyticsCard;
