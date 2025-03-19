import { useTranslations } from "next-intl";
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
  const t = useTranslations();
  const to = useTranslations("overview");
  const tp = useTranslations("package");
  const { moduleFormats, minNodeVersion, _nodeVersion, _npmVersion, types } =
    npm || {};
  return (
    <OverviewCard title={to("developer_guide")} badge={to("beta")}>
      <Paper p="lg" radius="md" bg="dark.7" shadow="sm" withBorder>
        <Flex
          gap={15}
          align="center"
          direction={{ base: "row", sm: "row" }}
          justify={{ base: "flex-start", sm: "space-between" }}
          wrap={{ base: "wrap", sm: "nowrap" }}
        >
          <ShowDeveloperGuide
            title={tp("typescript")}
            value={types ? t("yes") : t("no")}
          />
          <ShowDeveloperGuide
            title={tp("module_system")}
            value={moduleFormats}
            tooltip={
              moduleFormats === "N/A" && to("unable_to_determine_module")
            }
          />
          <ShowDeveloperGuide
            title={tp("min_node_version")}
            value={minNodeVersion}
          />
          <ShowDeveloperGuide
            title={tp("node_version")}
            value={_nodeVersion}
            tooltip={tp("node_version_tooltip")}
          />
          <ShowDeveloperGuide
            title={tp("npm_version")}
            value={_npmVersion}
            tooltip={tp("npm_version_tooltip")}
          />
        </Flex>
      </Paper>
    </OverviewCard>
  );
};

export default DeveloperGuide;
