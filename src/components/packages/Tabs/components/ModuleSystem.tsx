import React from "react";
import { Badge, Paper, Text, Title } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";

const ModuleSystem = ({ moduleFormats }: any) => {
  return (
    <OverviewCard title="Module System" badge="BETA">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        <Title order={5} fw={500} c="white">
          {moduleFormats}
        </Title>
        <Conditional if={moduleFormats === "N/A"}>
          <Text c="dimmed" mt={5} fz="xs">
            Unable to determine the module system for this package.
          </Text>
        </Conditional>
      </Paper>
    </OverviewCard>
  );
};

export default ModuleSystem;
