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
import { IconStar, IconHistory } from "@tabler/icons-react";
import "./Container.module.css";
import Tags from "./Tags";

const PackageContainer = ({ packageInfo }: any) => {
  const { data: github } = packageInfo?.gitHub || {};
  const { data: security } = packageInfo?.securityScore || {};
  return (
    <Box w="100%" bg="dark.9" pb={60}>
      <Container className="responsiveContainer" py={30}>
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column-reverse", sm: "row" }}
        >
          <Group align="center">
            <Title order={1} size="2.3rem" fw={800}>
              {github?.name}
            </Title>
            {github?.latestRelease && (
              <Tooltip label="Latest Release" position="right">
                <Pill radius={5} size="md" mt={10}>
                  {github?.latestRelease}
                </Pill>
              </Tooltip>
            )}
          </Group>
          <Flex
            gap={10}
            align="center"
            mt={10}
            display={{ base: "none", sm: "flex" }}
          >
            <Image
              width={20}
              height={20}
              radius="sm"
              src={github?.avatar}
              component={NextImage}
              alt={`${github.name} logo`}
            />
            <Title order={5} fw={500}>
              {github?.owner}
            </Title>
          </Flex>
        </Flex>
        <Text size="md" mt={10} c="dimmed" ta={{ base: "center", sm: "left" }}>
          {github?.description}
        </Text>
        <Tags
          data={{
            stars: github?.stars,
            commits: github?.commits,
            license: github?.license,
            security: security?.score,
            language: github?.languages?.[0],
          }}
        />
      </Container>
    </Box>
  );
};

export default PackageContainer;
