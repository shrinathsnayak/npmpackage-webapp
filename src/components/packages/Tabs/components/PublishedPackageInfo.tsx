import { Flex, Group, Paper, Text } from "@mantine/core";
import { formatDate, formatSize } from "@/utils";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import Conditional from "@/components/shared/Conditional";
import OverviewCard from "@/components/shared/OverviewCard";

const PackageInfo = ({ label, value }: any) => (
  <Conditional if={value}>
    <Group gap={2} justify="space-between">
      <Text fz="sm" c="dimmed">
        {label}
      </Text>
      <Text fz="sm" c="white" fw={500}>
        {value}
      </Text>
    </Group>
  </Conditional>
);

const PublishedPackageInfo = ({ npm }: any) => {
  const { package: info } = npm || {};
  return (
    <OverviewCard title="Package Meta Information">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        <Flex gap={5} direction="column">
          <PackageInfo label="Latest Version" value={npm?.version} />
          <PackageInfo label="Package Id" value={info?.id} />
          <PackageInfo
            label="Unpacked Size"
            value={formatSize(info?.unpackedSize)}
          />
          <PackageInfo label="Size" value={formatSize(info?.size)} />
          <PackageInfo
            label="File Count"
            value={<AnimatedNumber value={info?.fileCount} />}
          />
          <PackageInfo label="NPM Version" value={info?.npmVersion} />
          <PackageInfo label="Node Version" value={info?.nodeVersion} />
          <PackageInfo
            label="Publised On"
            value={formatDate(new Date(npm?.publishedOn || new Date()))}
          />
        </Flex>
      </Paper>
    </OverviewCard>
  );
};

export default PublishedPackageInfo;
