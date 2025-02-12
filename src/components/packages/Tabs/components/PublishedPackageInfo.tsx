import { useTranslations, useFormatter } from "next-intl";
import { Flex, Group, Paper, Text } from "@mantine/core";
import { formatSize } from "@/utils";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import Conditional from "@/components/shared/Conditional";
import OverviewCard from "@/components/shared/OverviewCard";

const PackageInfo = ({ label, value }: any) => (
  <Conditional if={!!value}>
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
  const t = useTranslations();
  const format = useFormatter();
  const to = useTranslations("overview");
  const tp = useTranslations("package");
  const { package: info } = npm || {};
  return (
    <OverviewCard title={to("package_meta_information")}>
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        <Flex gap={5} direction="column">
          <PackageInfo label={tp("latest_version")} value={npm?.version} />
          <PackageInfo label={tp("package_id")} value={info?.id} />
          <PackageInfo
            label={tp("unpacked_size")}
            value={info?.unpackedSize ? formatSize(info?.unpackedSize) : null}
          />
          <PackageInfo
            label={tp("size")}
            value={info?.size ? formatSize(info?.size) : null}
          />
          <PackageInfo
            label={tp("file_count")}
            value={
              info?.fileCount ? (
                <AnimatedNumber value={info?.fileCount} />
              ) : null
            }
          />
          <PackageInfo label={tp("npm_version")} value={info?.npmVersion} />
          <PackageInfo label={tp("node_version")} value={info?.nodeVersion} />
          <PackageInfo
            label={t("published_on")}
            value={
              npm?.publishedOn
                ? format.dateTime(new Date(npm?.publishedOn || new Date()), {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })
                : null
            }
          />
        </Flex>
      </Paper>
    </OverviewCard>
  );
};

export default PublishedPackageInfo;
