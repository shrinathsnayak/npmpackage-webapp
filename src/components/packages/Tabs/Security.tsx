import React, { Suspense } from "react";
import { Title, Flex, Text, Paper, Anchor } from "@mantine/core";
import SecurityAccordin from "@/components/packages/Tabs/components/SecurityAccordin";
import { getScoreTextColor } from "@/utils";

const Security = ({ packageInfo }: any) => {
  const { overallScore, score, lastScanned, checks } = packageInfo || {};

  if (!score) {
    return (
      <Paper radius="md" bg="dark.9" p="xl" shadow="sm" withBorder ta="center">
        <Title order={4}>Security Score not available for this package</Title>
      </Paper>
    );
  }

  return (
    <Suspense fallback={<>loading...</>}>
      <Flex
        direction={{ base: "column-reverse", sm: "row" }}
        gap={{ base: "sm", sm: "sm" }}
      >
        <SecurityAccordin checks={checks} />
        <Paper
          p="lg"
          top="75px"
          withBorder
          shadow="sm"
          h="fit-content"
          radius="md"
          bg="dark.9"
          w={{ base: "100%", sm: "500" }}
          pos={{ base: "static", sm: "sticky" }}
        >
          <Text fw="500">Score</Text>
          <Flex my={5} align="flex-end">
            <Title order={1} size="h1" c={getScoreTextColor(score)}>
              {score}
            </Title>
            <Title order={3} mb={4}>
              /{overallScore}
            </Title>
          </Flex>

          <Text size="sm" c="dimmed" fw={400} mt={3}>
            Last Scanned on {lastScanned}
          </Text>

          <Text fz="sm" my={10}>
            The Open Source Security Foundation is a cross-industry
            collaboration to improve the security of open source software (OSS).
            The Scorecard provides security health metrics for open source
            projects.
          </Text>

          <Anchor
            fz="sm"
            href="https://github.com/ossf/scorecard/blob/main/docs/checks.md"
            target="_blank"
          >
            Learn More
          </Anchor>
        </Paper>
      </Flex>
    </Suspense>
  );
};

export default Security;
