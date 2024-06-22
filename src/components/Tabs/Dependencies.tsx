import React from "react";
import Link from "next/link";
import { Anchor, Box, Flex, Group, Text, Title } from "@mantine/core";

const DependenciesRenderer = ({ dependency, name }: any) => {
  const { data, totalCount } = dependency || {};
  return (
    <Box mb={10}>
      <Flex
        align="center"
        justify="space-between"
        p={8}
        px={20}
        bg="gray.8"
        style={{ borderRadius: 5 }}
      >
        <Title order={5}>{name}</Title>
        <Text fs="lg" fw="bolder">
          {totalCount}
        </Text>
      </Flex>
      <Group my={5} gap={5}>
        {Object.keys(data).map((item) => {
          return (
            <Anchor component={Link} href={`/package/${item}`} key={item} p={5}>
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
