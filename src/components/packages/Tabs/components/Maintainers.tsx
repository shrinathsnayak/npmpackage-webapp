import Link from "next/link";
import { Anchor, Avatar, Box, Flex, Paper, Text, Tooltip } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import Conditional from "@/components/shared/Conditional";

const Maintainers = ({
  maintainers,
  contributorsCount,
  repositoryUrl,
}: any) => {
  return (
    <OverviewCard title="Maintainers & Contributors">
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
        <Conditional if={repositoryUrl}>
          <Box mt={15}>
            <Anchor
              display="inline-block"
              component={Link}
              href={`${repositoryUrl}/contributors`}
              target="_blank"
            >
              <Text fz="sm">
                View all <AnimatedNumber value={contributorsCount} />{" "}
                contributors
              </Text>
            </Anchor>
          </Box>
        </Conditional>
      </Paper>
    </OverviewCard>
  );
};

export default Maintainers;
