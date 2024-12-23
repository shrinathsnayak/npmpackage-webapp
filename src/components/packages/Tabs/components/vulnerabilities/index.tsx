"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  Drawer,
  Paper,
  SimpleGrid,
  Text,
  Title,
  Group,
  Anchor,
} from "@mantine/core";
import EmptyState from "@/components/shared/Empty";
import { IconExternalLink } from "@tabler/icons-react";
import { EMPTY_TYPE } from "@/constants/empty";
import Conditional from "@/components/shared/Conditional";
import VulnerCard from "./VulnerCard";
import ModalContent from "./ModalContent";
import classes from "./index.module.css";

interface ComponentProps {
  vulnerabilities: any;
}

const Vulnerabilities = ({ vulnerabilities }: ComponentProps) => {
  const { status, data: { sortedVulnerabilities = {}, stableVersion } = {} } =
    vulnerabilities || {};
  const [selectedVulnerability, setSelectedVulnerability] = useState<any>(null);

  if (
    (sortedVulnerabilities &&
      Object.keys(sortedVulnerabilities).length === 0) ||
    status !== 200
  ) {
    return <EmptyState type={EMPTY_TYPE.VULNERABILITIES} />;
  }

  return (
    <Box>
      <Paper
        px="lg"
        py="md"
        radius="md"
        shadow="lg"
        bg="dark.9"
        mb={15}
        withBorder
        className={classes.stableCardComponent}
      >
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
        >
          <Box display={{ base: "none", sm: "block" }}>
            <Title order={4} c="white">
              Stable Version
            </Title>
          </Box>
          <Box display={{ base: "block", sm: "none" }}>
            <Text fz="md" c="dimmed" mb={5}>
              Stable Version
            </Text>
          </Box>
          <Title order={3} c="white">
            {stableVersion}
          </Title>
        </Flex>
      </Paper>

      {sortedVulnerabilities &&
        Object.keys(sortedVulnerabilities)?.map(
          (vulnerability: any, index: number) => (
            <Box key={index} mb="md">
              <Paper bg="dark.9" p={8} px={20} mb="sm">
                <Flex align="center" justify="space-between">
                  <Title order={6} c="white" fz="sm">
                    {vulnerability}
                  </Title>
                  <Text fz="md" fw="bolder" c="white">
                    {sortedVulnerabilities[vulnerability].length}
                  </Text>
                </Flex>
              </Paper>
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, sm: "md" }}
              >
                {sortedVulnerabilities[vulnerability].map(
                  (vuln: any, index: number) => (
                    <VulnerCard
                      key={index}
                      score={vuln?.cvssScore}
                      summary={vuln?.summary}
                      severity={vuln?.severity}
                      affectedVerions={vuln?.vulnerableVersionRange}
                      patchedVersion={vuln?.firstPatchedVersion}
                      onClick={() => setSelectedVulnerability(vuln)}
                    />
                  )
                )}
              </SimpleGrid>
              <Conditional if={!!selectedVulnerability}>
                <Drawer
                  size="lg"
                  offset={8}
                  radius="md"
                  position="right"
                  opened={!!selectedVulnerability}
                  onClose={() => setSelectedVulnerability(null)}
                  title={
                    <Group gap={5} align="center" justify="center">
                      <Text fz="md" c="white">
                        Vulnerability Details
                      </Text>
                      <Anchor
                        target="_blank"
                        underline="never"
                        style={{ lineHeight: "inherit" }}
                        href={selectedVulnerability?.permalink}
                      >
                        <IconExternalLink size={18} />
                      </Anchor>
                    </Group>
                  }
                  overlayProps={{
                    backgroundOpacity: 0.3,
                    blur: 1,
                  }}
                >
                  <ModalContent data={selectedVulnerability} />
                </Drawer>
              </Conditional>
            </Box>
          )
        )}
    </Box>
  );
};
export default Vulnerabilities;
