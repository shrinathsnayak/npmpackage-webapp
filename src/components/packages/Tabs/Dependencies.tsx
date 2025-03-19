import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Anchor, Box, Flex, Group, Paper, Text, Title } from "@mantine/core";
import EmptyState from "@/components/shared/Empty";
import { updatePopularPackageCount } from "@/services/supbase";
import { EMPTY_TYPE } from "@/constants/empty";

const DependenciesRenderer = ({ dependency, name }: any) => {
  const { push } = useRouter();
  const { data, totalCount } = dependency || {};

  const handleRouteChange = (item: string) => {
    push(`/package/${item}`);
    updatePopularPackageCount(item);
  };

  return (
    <Box mb={10}>
      <Paper bg="dark.7" p={6} px={18} withBorder>
        <Flex align="center" justify="space-between">
          <Title order={5} c="white">
            {name}
          </Title>
          <Text fs="lg" fw="bolder" c="white">
            {totalCount}
          </Text>
        </Flex>
      </Paper>
      <Group my={5} gap={5}>
        {Object.keys(data)?.map((item) => {
          return (
            <Anchor
              p={5}
              key={`${item}${data[item]}`}
              onClick={() => handleRouteChange(item)}
            >
              {item}
            </Anchor>
          );
        })}
      </Group>
    </Box>
  );
};

const Dependencies = ({ data }: any) => {
  const t = useTranslations("dependencies");
  const {
    dependencies,
    peerDependencies,
    devDependencies,
    optionalDependencies,
  } = data || {};
  if (data && Object.keys(data).length === 0) {
    return <EmptyState type={EMPTY_TYPE.DEPENDENCIES} />;
  }
  return (
    <Box>
      {dependencies && (
        <DependenciesRenderer
          dependency={dependencies}
          name={t("dependencies")}
        />
      )}
      {peerDependencies && (
        <DependenciesRenderer
          dependency={peerDependencies}
          name={t("peer_dependencies")}
        />
      )}
      {devDependencies && (
        <DependenciesRenderer
          dependency={devDependencies}
          name={t("dev_dependencies")}
        />
      )}
      {optionalDependencies && (
        <DependenciesRenderer
          dependency={optionalDependencies}
          name={t("optional_dependencies")}
        />
      )}
    </Box>
  );
};

export default Dependencies;
