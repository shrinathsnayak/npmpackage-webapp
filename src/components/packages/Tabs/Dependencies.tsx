import React from "react";
import { useRouter } from "next/navigation";
import { Anchor, Box, Flex, Group, Paper, Text, Title } from "@mantine/core";

const DependenciesRenderer = ({ dependency, name }: any) => {
  const { push } = useRouter();
  const { data, totalCount } = dependency || {};

  const handleRouteChange = (item: string) => {
    push(`/package/${item}`);
  };

  return (
    <Box mb={10}>
      <Paper bg="dark.9" p={8} px={20} withBorder>
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
  const {
    dependencies,
    peerDependencies,
    devDependencies,
    optionalDependencies,
  } = data || {};
  return (
    <Box>
      {dependencies && (
        <DependenciesRenderer dependency={dependencies} name="Dependencies" />
      )}
      {peerDependencies && (
        <DependenciesRenderer
          dependency={peerDependencies}
          name="Peer Dependencies"
        />
      )}
      {devDependencies && (
        <DependenciesRenderer
          dependency={devDependencies}
          name="Dev Dependencies"
        />
      )}
      {optionalDependencies && (
        <DependenciesRenderer
          dependency={optionalDependencies}
          name="Optional Dependencies"
        />
      )}
    </Box>
  );
};

export default Dependencies;
