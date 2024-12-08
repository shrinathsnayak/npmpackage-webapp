import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Text,
} from "@mantine/core";
import { VULNERABILITY_COLORS } from "@/constants";
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
  return (
    <Card
      shadow="md"
      padding="md"
      radius="md"
      bg="dark.9"
      // withBorder
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
          {severity}
        </Badge>
        <Text fz="sm" c="white">
          <b>{score}</b>/10
        </Text>
      </Group>
      <Box my="sm">
        <Text fz="xs" c="dimmed">
          Summary
        </Text>
        <Text fz="sm" c="white">
          {summary}
        </Text>
      </Box>
      <Group justify="space-between" align="center" mb="xs">
        <Box>
          <Text fz="xs" c="dimmed">
            Affected Versions
          </Text>
          <Text fz="sm" fw="bold" c="white">
            {affectedVerions}
          </Text>
        </Box>
        <Conditional if={patchedVersion}>
          <Box>
            <Text fz="xs" c="dimmed">
              Patched Versions
            </Text>
            <Text fz="sm" fw="bold" c="white" ta="right">
              {patchedVersion}
            </Text>
          </Box>
        </Conditional>
      </Group>
    </Card>
  );
};

export default VulnerCard;
