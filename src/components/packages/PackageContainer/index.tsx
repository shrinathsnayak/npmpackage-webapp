import React from "react";
import { emojify } from "node-emoji";
import { Container, Box, Title, Flex, Text } from "@mantine/core";
import { LinksContainer } from "./LinksContainer";
import Tags from "./Tags";

const PackageContainer = ({ packageInfo, downloads }: any) => {
  const { data: npm } = packageInfo?.npm || {};
  const { data: github } = packageInfo?.gitHub || {};
  const { data: bundle } = packageInfo?.bundle || {};
  const { data: security } = packageInfo?.securityScore || {};

  return (
    <Box w="100%" bg="dark.9" pb={60}>
      <Container size="lg" className="responsiveContainer" py={30}>
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column-reverse", sm: "row" }}
        >
          <Title
            order={1}
            size="2.3rem"
            fw={800}
            c="white"
            textWrap="balance"
            ta={{ base: "center", sm: "left" }}
            w={{ base: "100%", sm: "auto" }}
            style={{ wordBreak: "break-word" }}
          >
            {npm?.name || github?.name}
          </Title>
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
        <Text size="md" mt={10} c="gray.5" ta={{ base: "center", sm: "left" }}>
          {github?.description &&
            emojify(github?.description, { fallback: github?.description })}
        </Text>
        <Tags
          data={{
            downloads: downloads,
            stars: github?.stars,
            version: npm?.version,
            license: github?.license,
            security: security?.score,
            language: github?.primaryLanguage,
            size: bundle?.gzip,
            unpackedSize: npm?.package?.unpackedSize,
            fileCount: npm?.package?.fileCount,
          }}
        />
      </Container>
    </Box>
  );
};

export default PackageContainer;
