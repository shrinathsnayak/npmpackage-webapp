import { useTranslations } from "next-intl";
import { Badge, Box, Card, Group, Paper, Text } from "@mantine/core";
import { VULNERABILITY_COLORS, VULNERABILITY_LOCALES } from "@/constants";
import classes from "./index.module.css";
import Conditional from "@/components/shared/Conditional";

const VulnerCard = ({
  severity,
  summary,
  affectedVerions,
  patchedVersion,
  score,
  onClick,
}: any) => {
  const t = useTranslations("vulnerability");
  return (
    <Paper
      withBorder
      shadow="md"
      p="md"
      radius="md"
      bg="dark.7"
      onClick={onClick}
      className={classes.cardComponent}
    >
      <Group justify="space-between" align="center">
        <Badge
          variant="outline"
          radius="xs"
          size="md"
          color={VULNERABILITY_COLORS[severity]}
        >
          {t(VULNERABILITY_LOCALES[severity])}
        </Badge>
        <Text fz="sm" c="white">
          <b>{score}</b>/10
        </Text>
      </Group>
      <Box my="sm">
        <Text fz="xs" c="dimmed">
          {t("summary")}
        </Text>
        <Text fz="sm" c="white">
          {summary}
        </Text>
      </Box>
      <Group justify="space-between" align="center" mb="xs">
        <Box>
          <Text fz="xs" c="dimmed">
            {t("affected_versions")}
          </Text>
          <Text fz="sm" fw="bold" c="white">
            {affectedVerions}
          </Text>
        </Box>
        <Conditional if={patchedVersion}>
          <Box>
            <Text fz="xs" c="dimmed">
              {t("patched_versions")}
            </Text>
            <Text fz="sm" fw="bold" c="white" ta="right">
              {patchedVersion}
            </Text>
          </Box>
        </Conditional>
      </Group>
    </Paper>
  );
};

export default VulnerCard;
