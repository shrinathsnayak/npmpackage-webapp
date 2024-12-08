import Link from "next/link";
import { Avatar, Flex, Paper, Tooltip } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";

const Maintainers = ({ maintainers }: any) => {
  return (
    <OverviewCard title="Maintainers">
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
        <Tooltip.Group openDelay={300} closeDelay={100}>
          <Flex align="center" wrap="wrap"></Flex>
          <Avatar.Group spacing="xs" style={{ flexWrap: "wrap" }}>
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
          </Avatar.Group>
        </Tooltip.Group>
      </Paper>
    </OverviewCard>
  );
};

export default Maintainers;
