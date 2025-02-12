import { useTranslations, useFormatter } from "next-intl";
import { Anchor, Badge, Flex, Group, Paper, Text } from "@mantine/core";
import MDX from "@/components/shared/mdx";
import { VULNERABILITY_COLORS, VULNERABILITY_LOCALES } from "@/constants";
import Conditional from "@/components/shared/Conditional";

const ModalContent = ({ data }: any) => {
  const to = useTranslations();
  const format = useFormatter();
  const t = useTranslations("vulnerability");
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

  const formatDate = (publishedAt: Date) =>
    format.dateTime(new Date(publishedAt || new Date()), {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

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
          {t(VULNERABILITY_LOCALES[severity])}
        </Badge>
        <Text fz="lg" c="white">
          <b>{cvssScore}</b>/10
        </Text>
      </Group>
      {/* Summary */}
      <div>
        <Text fz="sm" c="dimmed" mb={0}>
          {t("summary")}
        </Text>
        <Text fz="md" c="white">
          {summary}
        </Text>
      </div>

      {/* Affected versions */}
      <Group justify="space-between" align="center">
        <div>
          <Text fz="sm" c="dimmed" mb={0}>
            {t("affected_versions")}
          </Text>
          <Text fz="md" c="white">
            {vulnerableVersionRange}
          </Text>
        </div>
        <Conditional if={firstPatchedVersion}>
          <div>
            <Text fz="sm" c="dimmed" mb={0} ta="right">
              {t("patched_versions")}
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
            {to("published_on")}
          </Text>
          <Text fz="md" c="white">
            {publishedAt && formatDate(publishedAt)}
          </Text>
        </div>
        <div>
          <Text fz="sm" c="dimmed" mb={0} ta="right">
            {to("updated_on")}
          </Text>
          <Text fz="md" c="white" ta="right">
            {updatedAt && formatDate(updatedAt)}
          </Text>
        </div>
      </Group>

      {/* Description */}
      <div>
        <Text fz="sm" c="dimmed" mb={3}>
          {t("description")}
        </Text>
        <Paper p="md" radius="md" bg="dark.9" shadow="sm" c="white">
          <MDX content={description} />
        </Paper>
      </div>

      <div>
        <Text fz="sm" c="dimmed" mb={0}>
          {t("additional_links")}
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
