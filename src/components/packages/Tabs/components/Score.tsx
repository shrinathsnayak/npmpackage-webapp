import React from "react";
import {
  Flex,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
  Box,
  Tooltip,
} from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";
import { VULNERABILITY } from "@/constants";
import { breakCamelCase, getScoreTextColor } from "@/utils";
import { IconInfoCircle } from "@tabler/icons-react";

const RenderScoreBreakup = ({ component, label, score }: any) => {
  if (component) {
    return (
      <Box>
        {component &&
          Object.keys(component)?.map((item: any) => (
            <Conditional if={item} key={item}>
              <Flex align="center" gap={20} justify="space-between">
                <Text fw={500} fz="sm">
                  {breakCamelCase(item)}
                </Text>
                <Text
                  fz="sm"
                  fw={700}
                  c={getScoreTextColor(component[item], 10)}
                >
                  {component[item]}
                </Text>
              </Flex>
            </Conditional>
          ))}
      </Box>
    );
  }
};

const ScoreCardProgress = ({ name, score, label, component, tooltip }: any) => {
  const colour = getScoreTextColor(score, 10);
  return (
    <Flex direction="column" gap={2} align="center">
      <RingProgress
        roundCaps
        size={95}
        thickness={10}
        sections={[
          {
            value: score,
            color: colour,
            tooltip: (
              <RenderScoreBreakup
                score={score}
                label={label}
                component={component}
              />
            ),
          },
        ]}
        label={
          <Text c={colour} fw={600} ta="center" size="lg">
            {score}
          </Text>
        }
      />
      <Flex gap={4} align="center" justify="center">
        <Text fz="sm" fw={400} ta="center" c="white">
          {name}
        </Text>
        <Tooltip
          multiline
          withArrow
          maw={300}
          color="dark.8"
          radius="md"
          p={12}
          fz="xs"
          label={tooltip}
        >
          <IconInfoCircle size={18} />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

const Score = ({ scoreData = {} }: any) => {
  return (
    <OverviewCard title="Score">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        <SimpleGrid
          cols={{ base: 2, sm: 2, lg: 4 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {Object.keys(scoreData)?.map((item: any) => (
            <Conditional
              key={item}
              if={VULNERABILITY[item]?.name && scoreData[item]}
            >
              <ScoreCardProgress
                score={scoreData[item]?.score}
                name={VULNERABILITY[item]?.name}
                label={VULNERABILITY[item]?.label}
                tooltip={VULNERABILITY[item]?.tooltip}
                component={scoreData[item]?.component}
              />
            </Conditional>
          ))}
        </SimpleGrid>
      </Paper>
    </OverviewCard>
  );
};

export default Score;
