import React from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Flex,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
  Tooltip,
} from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";
import { VULNERABILITY } from "@/constants";
import { breakCamelCase, getScoreTextColor } from "@/utils";
import { IconInfoCircle } from "@tabler/icons-react";

const RenderScoreBreakup = ({ component, vulnerabilityCount, vulnerabilities }: any) => {
  return (
    <Flex direction="column" gap={8}>
      {component &&
        Object.keys(component)?.map((item: any) => (
          <Conditional if={item} key={item}>
            <Flex align="center" gap={20} justify="space-between">
              <Text fw={500} fz="sm">
                {breakCamelCase(item)}
              </Text>
              <Text fz="sm" fw={700} c={getScoreTextColor(component[item], 10)}>
                {component[item]}
              </Text>
            </Flex>
          </Conditional>
        ))}

      {/* Show vulnerability summary if available */}
      <Conditional if={vulnerabilityCount && vulnerabilityCount > 0}>
        <Box pt={8} style={{ borderTop: '1px solid var(--mantine-color-dark-4)' }}>
          <Text fw={500} fz="sm" c="red.6" mb={4}>
            Vulnerabilities Found: {vulnerabilityCount}
          </Text>
          {vulnerabilities && (
            <Flex direction="column" gap={4}>
              {Object.entries(vulnerabilities).map(([severity, vulns]: [string, any]) => (
                <Conditional key={severity} if={Array.isArray(vulns) && vulns.length > 0}>
                  <Text fz="xs" c="dimmed">
                    {severity}: {vulns.length} {vulns.length === 1 ? 'issue' : 'issues'}
                  </Text>
                </Conditional>
              ))}
            </Flex>
          )}
        </Box>
      </Conditional>
    </Flex>
  );
};

const ScoreCardProgress = ({ name, score, label, component, tooltip, vulnerabilityCount, vulnerabilities }: any) => {
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
                vulnerabilityCount={vulnerabilityCount}
                vulnerabilities={vulnerabilities}
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
      <Flex gap={4} align="center" justify="center" direction="row">
        <Text fz="sm" fw={400} ta="center" c="white">
          {name}
        </Text>
        {/* Show vulnerability count if available */}
        {/* <Conditional if={vulnerabilityCount && vulnerabilityCount > 0}>
          <Text fz="xs" c="red.6" fw={500}>
            {vulnerabilityCount} {vulnerabilityCount === 1 ? 'vulnerability' : 'vulnerabilities'}
          </Text>
        </Conditional> */}
        {/* <Conditional if={tooltip}> */}
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
          <IconInfoCircle size={20} />
        </Tooltip>
        {/* </Conditional> */}
      </Flex>
    </Flex>
  );
};

const Score = ({ scoreData = {} }: any) => {
  const t = useTranslations("overview");
  return (
    <OverviewCard title={t("score")}>
      <Paper p="lg" radius="md" bg="dark.7" shadow="sm" withBorder>
        <SimpleGrid
          cols={{ base: 2, sm: 2, lg: 5 }}
          spacing={{ base: 10, sm: "md" }}
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
                vulnerabilityCount={scoreData[item]?.vulnerabilityCount}
                vulnerabilities={scoreData[item]?.vulnerabilities}
              />
            </Conditional>
          ))}
        </SimpleGrid>
      </Paper>
    </OverviewCard>
  );
};

export default Score;
