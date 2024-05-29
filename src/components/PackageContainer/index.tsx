import React from "react";
import NextImage from "next/image";
import {
  Container,
  Box,
  Title,
  Flex,
  Image,
  Text,
  Pill,
  Group,
  Tooltip,
} from "@mantine/core";
import "./Container.module.css";

const PackageContainer = ({ packageInfo }: any) => {
  const { data } = packageInfo?.gitHub || {};
  return (
    <Box w="100%" bg="dark.9" pb={50}>
      <Container className="responsiveContainer" py={30}>
        <Flex align="center" justify="space-between">
          <Group align="center">
            <Title order={1} size="2.3rem" fw={800}>
              {data?.name}
            </Title>
            <Tooltip label="Latest Release" position="right">
              <Pill radius={5} size="md" mt={10}>
                {data?.latestRelease}
              </Pill>
            </Tooltip>
          </Group>
          <Flex gap={10} align="center" mt={10}>
            <Image
              width={20}
              height={20}
              radius="sm"
              src={data?.avatar}
              component={NextImage}
              alt={`${data.name} logo`}
            />
            <Title order={5} fw={500}>
              {data?.owner}
            </Title>
          </Flex>
        </Flex>
        <Text size="md" mt={10} c="dimmed">
          {data?.description}
        </Text>
      </Container>
    </Box>
  );
};

export default PackageContainer;
