import React from "react";
import { Box, Flex } from "@mantine/core";
import Conditional from "@/components/shared/Conditional";
import Installations from "@/components/packages/Tabs/components/Installations";
import Collaborators from "@/components/packages/Tabs/components/Collaborators";
import Languages from "@/components/packages/Tabs/components/Languages";
import Releases from "@/components/packages/Tabs/components/Releases";
import Size from "@/components/packages/Tabs/components/Size";
import Actions from "@/components/packages/Tabs/components/Actions";
import Statistics from "@/components/packages/Tabs/components/Statistics";
import Developer from "@/components/packages/Tabs/components/Developer";

const Overview = ({ packageInfo }: any) => {
  const { data: npm } = packageInfo?.npm || {};
  const { data: gitHub } = packageInfo?.gitHub || {};
  const { data: bundle } = packageInfo?.bundle || {};

  return (
    <Flex
      gap={{ base: 5, sm: 20 }}
      direction={{
        base: "column-reverse",
        sm: "row",
      }}
    >
      <Box w={{ base: "100%", sm: "70%" }}>
        <Conditional if={npm}>
          <Installations packageName={npm?.name} />
        </Conditional>
        <Conditional if={gitHub?.prs || gitHub?.issues}>
          <Actions
            prs={gitHub?.prs}
            issues={gitHub?.issues}
            repositoryUrl={gitHub?.repositoryUrl}
          />
        </Conditional>
        <Conditional if={gitHub?.releases?.total > 0 && gitHub?.repositoryUrl}>
          <Releases
            releases={gitHub?.releases}
            repositoryUrl={gitHub?.repositoryUrl}
          />
        </Conditional>
        <Conditional
          if={gitHub?.contributors?.length > 0 && gitHub?.contributorsCount > 0}
        >
          <Collaborators
            contributorsCount={gitHub?.contributorsCount}
            contributors={gitHub?.contributors}
            repositoryUrl={gitHub?.repositoryUrl}
          />
        </Conditional>
      </Box>
      <Box w={{ base: "100%", sm: "30%" }}>
        <Conditional if={gitHub?.avatar && gitHub?.owner}>
          <Developer avatar={gitHub?.avatar} owner={gitHub?.owner} />
        </Conditional>
        <Conditional if={gitHub}>
          <Statistics
            data={{
              commits: gitHub?.commits,
              // license: gitHub?.license,
              stars: gitHub?.stars,
              forks: gitHub?.forks,
              branches: gitHub?.branches,
              watchers: gitHub?.watchers,
              contributors: gitHub?.contributorsCount,
              updatedAt: gitHub?.updatedAt,
            }}
          />
        </Conditional>
        <Conditional if={bundle}>
          <Size
            bundleSize={{
              size: bundle?.size,
              gzip: bundle?.gzip,
            }}
            packageName={npm?.name}
          />
        </Conditional>
        <Conditional if={gitHub}>
          <Languages languages={gitHub?.languages} />
        </Conditional>
      </Box>
    </Flex>
  );
};

export default Overview;
