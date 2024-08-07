import React from "react";
import {
  Container,
  Box,
  Title,
  Flex,
  Text,
  Pill,
  Group,
  Tooltip,
} from "@mantine/core";
import Tags from "./Tags";
import { LinksContainer } from "./LinksContainer";

const PackageContainer = ({ packageInfo, downloads }: any) => {
  const { data: npm } = packageInfo?.npm || {};
  const { data: github } = packageInfo?.gitHub || {};
  const { data: bundle } = packageInfo?.bundle || {};
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
              {npm?.name || github?.name}
            </Title>
            {(github?.latestRelease || npm?.version) && (
              <Tooltip label="Latest Release" position="right">
                <Pill radius={5} size="md" mt={10}>
                  {github?.latestRelease || `v${npm?.version}`}
                </Pill>
              </Tooltip>
            )}
          </Group>
          <Box
            mb={{
              base: 15,
              sm: 0,
            }}
          >
            <LinksContainer
              homePage={github?.homepageUrl}
              github={github?.repositoryUrl}
              npm={npm?.name && `https://www.npmjs.com/package/${npm?.name}`}
              typesLink={npm?.types && `https://tsdocs.dev/docs/${npm?.name}/`}
              runKit={npm?.name && `https://npm.runkit.com/${npm?.name}`}
            />
          </Box>
        </Flex>
        <Text size="md" mt={10} c="dimmed" ta={{ base: "center", sm: "left" }}>
          {github?.description}
        </Text>
        <Tags
          data={{
            size: bundle?.gzip,
            stars: github?.stars,
            downloads: downloads,
            license: github?.license,
            security: security?.score,
            language: github?.primaryLanguage,
          }}
        />
      </Container>
    </Box>
  );
};

export default PackageContainer;
