import React from "react";
import Link from "next/link";
import { useTranslations, useFormatter } from "next-intl";
import {
  Anchor,
  Avatar,
  Box,
  Center,
  Paper,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import OverviewCard from "@/components/shared/OverviewCard";
import Conditional from "@/components/shared/Conditional";

const Collaborators = ({
  contributorsCount,
  contributors = [],
  repositoryUrl,
}: any) => {
  const format = useFormatter();
  const t = useTranslations("overview");
  const contributorCountValue = format.number(contributorsCount);

  return (
    <OverviewCard title={t("contributors")} badge={contributorCountValue}>
      <Paper p="lg" radius="md" bg="dark.7" shadow="sm" withBorder>
        {contributorsCount === 0 ||
        contributors?.length <= 0 ||
        contributors?.status ? (
          <Center ta="center" my={20}>
            <div>
              <IconUsersGroup color="#fff" size={30} />
              <Title order={5} c="white" mt={5}>
                {t("error_fetching_contributors")}
              </Title>
            </div>
          </Center>
        ) : (
          <Box>
            <Tooltip.Group openDelay={300} closeDelay={100}>
              <Avatar.Group spacing={3} style={{ flexWrap: "wrap" }}>
                {contributors.length > 0 &&
                  contributors?.map((item: any) => (
                    <Tooltip label={item?.name} withArrow key={item?.name}>
                      <Avatar
                        size="md"
                        src={item?.url}
                        radius="xl"
                        alt={item?.name}
                        component={Link}
                        href={`https://github.com/${item?.name}`}
                        target="_blank"
                        imageProps={{
                          loading: "lazy",
                        }}
                      />
                    </Tooltip>
                  ))}
              </Avatar.Group>
            </Tooltip.Group>
          </Box>
        )}
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

export default Collaborators;
