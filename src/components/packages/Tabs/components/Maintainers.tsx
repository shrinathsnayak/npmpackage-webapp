import Link from "next/link";
import { useTranslations, useFormatter } from "next-intl";
import { Anchor, Avatar, Box, Flex, Paper, Tooltip, Text } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";

const Maintainers = ({
  maintainers,
  contributorsCount,
  repositoryUrl,
}: any) => {
  const t = useTranslations("overview");
  const format = useFormatter();
  const contributorCountValue = format.number(contributorsCount);

  return (
    <OverviewCard title={t("maintainers")} badge={maintainers?.length}>
      <Paper p="lg" radius="md" bg="dark.7" shadow="sm" withBorder>
        <Tooltip.Group openDelay={300} closeDelay={100}>
          <Flex align="center" wrap="wrap" gap={10}>
            {maintainers.length > 0 &&
              maintainers?.map((item: any) => (
                <Tooltip label={item?.name} withArrow key={item?.name}>
                  <Avatar
                    size="md"
                    component={Link}
                    target="_blank"
                    src={item?.url}
                    radius="xl"
                    alt={item?.name}
                    href={
                      item?.profile_url || `https://github.com/${item?.name}`
                    }
                    imageProps={{
                      loading: "lazy",
                    }}
                  />
                </Tooltip>
              ))}
          </Flex>
        </Tooltip.Group>
        <Conditional if={repositoryUrl && contributorsCount > 0}>
          <Box mt={15}>
            <Anchor
              display="inline-block"
              component={Link}
              href={`${repositoryUrl}/contributors`}
              target="_blank"
            >
              <Text fz="sm">
                {t("view_all_contributors", { value: contributorCountValue })}
              </Text>
            </Anchor>
          </Box>
        </Conditional>
      </Paper>
    </OverviewCard>
  );
};

export default Maintainers;
