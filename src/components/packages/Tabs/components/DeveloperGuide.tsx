import { Paper, Text, Title, Box, Tooltip, Group, Flex } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";

const ShowDeveloperGuide = ({ title, value, tooltip }: any) => {
  return (
    <Conditional if={value}>
      <Box>
        <Group gap={5} mb={1}>
          <Text fz="xs" c="gray.6">
            {title}
          </Text>
          <Conditional if={tooltip}>
            <Tooltip
              label={tooltip}
              position="top"
              color="dark.8"
              maw={300}
              multiline
              radius="md"
              p={12}
              fz="xs"
            >
              <IconInfoCircle size={18} />
            </Tooltip>
          </Conditional>
        </Group>
        <Conditional if={value}>
          <Title order={5} fw={600} c="white" textWrap="balance">
            {value}
          </Title>
        </Conditional>
      </Box>
    </Conditional>
  );
};

const DeveloperGuide = ({ npm }: any) => {
  const { moduleFormats, minNodeVersion, _nodeVersion, _npmVersion, types } =
    npm || {};
  return (
    <OverviewCard title="Developer Guide" badge="BETA">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        <Flex
          gap={15}
          align="center"
          direction={{ base: "row", sm: "row" }}
          justify={{ base: "flex-start", sm: "space-between" }}
          wrap={{ base: "wrap", sm: "nowrap" }}
        >
          <ShowDeveloperGuide
            title="Typescript"
            value={types ? "✅ Yes" : "❌ No"}
          />
          <ShowDeveloperGuide
            title="Module System"
            value={moduleFormats}
            tooltip={
              moduleFormats === "N/A" &&
              "Unable to determine the module system for this package."
            }
          />
          <ShowDeveloperGuide
            title="Min. Node Version"
            value={minNodeVersion}
          />
          <ShowDeveloperGuide
            title="Node Version"
            value={_nodeVersion}
            tooltip="The version of Node.js used by the maintainer to publish this package."
          />
          <ShowDeveloperGuide
            title="NPM Version"
            value={_npmVersion}
            tooltip="The version of the npm client used by the maintainer to publish this package."
          />
        </Flex>
      </Paper>
    </OverviewCard>
  );
};

export default DeveloperGuide;
