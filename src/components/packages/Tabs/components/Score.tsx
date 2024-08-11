import React from "react";
import { Flex, Paper, RingProgress, SimpleGrid, Text } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";
import { VULNERABILITY } from "@/constants";
import { getScoreTextColor } from "@/utils";

const ScoreCardProgress = ({ name, score, label }: any) => {
  const colour = getScoreTextColor(score, 10);
  return (
    <Flex direction="column" gap={2} align="center">
      <RingProgress
        size={95}
        roundCaps
        thickness={9}
        sections={[
          { value: score, color: colour, tooltip: `${label} - ${score}` },
        ]}
        label={
          <Text c={colour} fw={700} ta="center" size="lg">
            {score}
          </Text>
        }
      />
      <Text fz="sm" fw={600} ta="center">
        {name}
      </Text>
    </Flex>
  );
};

const Score = ({ scoreData = {}, packageName }: any) => {
  return (
    <OverviewCard title="Score">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" withBorder>
        <SimpleGrid
          cols={{ base: 2, sm: 3, lg: 5 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {Object.keys(scoreData).map((item: any) => (
            <Conditional key={item} if={VULNERABILITY[item]?.name}>
              <ScoreCardProgress
                name={VULNERABILITY[item]?.name}
                label={VULNERABILITY[item]?.label}
                score={scoreData[item]}
              />
            </Conditional>
          ))}
        </SimpleGrid>
      </Paper>
    </OverviewCard>
  );
};

export default Score;
