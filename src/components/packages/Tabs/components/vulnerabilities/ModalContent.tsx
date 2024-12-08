import { Anchor, Badge, Flex, Group, Paper, Text } from "@mantine/core";
import MDX from "@/components/shared/mdx";
import { formatDate } from "@/utils";
import { VULNERABILITY_COLORS } from "@/constants";
import Conditional from "@/components/shared/Conditional";

const ModalContent = ({ data }: any) => {
  const {
    severity,
    cvssScore,
    summary,
    description,
    firstPatchedVersion,
    vulnerableVersionRange,
    publishedAt,
    updatedAt,
    references,
  } = data || {};

  return (
    <Flex py={10} direction="column" gap={14}>
      {/* Badge */}
      <Group justify="space-between" align="center">
        <Badge
          size="md"
          radius="xs"
          variant="outline"
          color={VULNERABILITY_COLORS[severity]}
        >
          {severity} Severity
        </Badge>
        <Text fz="lg" c="white">
          <b>{cvssScore}</b>/10
        </Text>
      </Group>
      {/* Summary */}
      <div>
        <Text fz="sm" c="dimmed" mb={0}>
          Summary
        </Text>
        <Text fz="md" c="white">
          {summary}
        </Text>
      </div>

      {/* Affected versions */}
      <Group justify="space-between" align="center">
        <div>
          <Text fz="sm" c="dimmed" mb={0}>
            Affected versions
          </Text>
          <Text fz="md" c="white">
            {vulnerableVersionRange}
          </Text>
        </div>
        <Conditional if={firstPatchedVersion}>
          <div>
            <Text fz="sm" c="dimmed" mb={0} ta="right">
              Patched versions
            </Text>
            <Text fz="md" c="white" ta="right">
              {firstPatchedVersion}
            </Text>
          </div>
        </Conditional>
      </Group>

      <Group justify="space-between" align="center">
        <div>
          <Text fz="sm" c="dimmed" mb={0}>
            Published on
          </Text>
          <Text fz="md" c="white">
            {publishedAt && formatDate(new Date(publishedAt))}
          </Text>
        </div>
        <div>
          <Text fz="sm" c="dimmed" mb={0} ta="right">
            Updated on
          </Text>
          <Text fz="md" c="white" ta="right">
            {updatedAt && formatDate(new Date(updatedAt))}
          </Text>
        </div>
      </Group>

      {/* Description */}
      <div>
        <Text fz="sm" c="dimmed" mb={3}>
          Description
        </Text>
        <Paper p="md" radius="md" bg="dark.9" shadow="sm" c="white">
          <MDX content={description} />
        </Paper>
      </div>

      <div>
        <Text fz="sm" c="dimmed" mb={0}>
          Additional Links
        </Text>
        {references?.map((ref: any, index: number) => (
          <div key={index} style={{ wordWrap: "break-word" }}>
            <Anchor fz="sm" href={ref} target="_blank" mb={5} display="block">
              {ref}
            </Anchor>
          </div>
        ))}
      </div>
    </Flex>
  );
};

export default ModalContent;
