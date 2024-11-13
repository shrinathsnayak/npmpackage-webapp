import { Anchor, Badge, Box, Flex, Group, Text } from "@mantine/core";
import { VULNERABILITY_COLORS } from "@/constants";
import MDX from "@/components/shared/mdx";
import { formatDate } from "@/utils";

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
    <Flex py={10} direction="column" gap={20}>
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
        <Text fz="sm" c="dimmed" mb={3}>
          Summary
        </Text>
        <Text fz="md" c="white">
          {summary}
        </Text>
      </div>

      {/* Affected versions */}
      <Group justify="space-between" align="center">
        <div>
          <Text fz="sm" c="dimmed" mb={3}>
            Affected versions
          </Text>
          <Text fz="md" c="white">
            {vulnerableVersionRange}
          </Text>
        </div>
        <div>
          <Text fz="sm" c="dimmed" mb={3}>
            Patched versions
          </Text>
          <Text fz="md" c="white">
            {firstPatchedVersion}
          </Text>
        </div>
      </Group>

      <Group justify="space-between" align="center">
        <div>
          <Text fz="sm" c="dimmed" mb={3}>
            Published on
          </Text>
          <Text fz="md" c="white">
            {publishedAt && formatDate(new Date(publishedAt))}
          </Text>
        </div>
        <div>
          <Text fz="sm" c="dimmed" mb={3}>
            Updated on
          </Text>
          <Text fz="md" c="white">
            {updatedAt && formatDate(new Date(updatedAt))}
          </Text>
        </div>
      </Group>

      {/* Description */}
      <div>
        <Text fz="sm" c="dimmed" mb={3}>
          Description
        </Text>
        <MDX content={description} />
      </div>

      <div>
        <Text fz="sm" c="dimmed" mb={3}>
          Additional Links
        </Text>
        {references?.map((ref: any, index: number) => (
          <div key={index} style={{ wordWrap: "break-word" }}>
            <Anchor fz="sm" href={ref} target="_blank">
              {ref}
            </Anchor>
          </div>
        ))}
      </div>
    </Flex>
  );
};

export default ModalContent;
