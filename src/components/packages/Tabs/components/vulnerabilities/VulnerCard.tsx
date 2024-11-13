import { Badge, Box, Card, Group, Text } from "@mantine/core";
import { VULNERABILITY_COLORS } from "@/constants";
import classes from "./index.module.css";

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
      shadow="sm"
      padding="md"
      radius="md"
      bg="dark.9"
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
      <Text fz="md" my="sm" c="white">
        {summary}
      </Text>
      <Group justify="space-between" align="center" mb="xs">
        <Box>
          <Text fz="xs" c="dimmed">
            Affected Versions
          </Text>
          <Text fz="sm" fw="bold">
            {affectedVerions}
          </Text>
        </Box>
        <Box>
          <Text fz="xs" c="dimmed">
            Patched Versions
          </Text>
          <Text fz="sm" fw="bold">
            {patchedVersion}
          </Text>
        </Box>
      </Group>
    </Card>
  );
};

export default VulnerCard;
