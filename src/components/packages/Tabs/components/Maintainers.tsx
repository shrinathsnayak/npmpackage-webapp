import Link from "next/link";
import { useTranslations } from "next-intl";
import { Avatar, Flex, Paper, Tooltip } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";

const Maintainers = ({ maintainers }: any) => {
  const t = useTranslations("overview");
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
      </Paper>
    </OverviewCard>
  );
};

export default Maintainers;
