import React from "react";
import { Adsense } from "@ctrl/react-adsense";
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
import Score from "@/components/packages/Tabs/components/Score";
import DeveloperGuide from "@/components/packages/Tabs/components/DeveloperGuide";
import DownloadStatistics from "@/components/packages/Tabs/components/DownloadStatistics";
import Maintainers from "@/components/packages/Tabs/components/Maintainers";
import Sponsor from "@/components/packages/Tabs/components/Sponsor";
import PublishedPackageInfo from "@/components/packages/Tabs/components/PublishedPackageInfo";

const Overview = ({ packageInfo, downloads }: any) => {
  const { data: npm } = packageInfo?.npm || {};
  const { data: gitHub } = packageInfo?.gitHub || {};
  const { data: bundle } = packageInfo?.bundle || {};
  const { data: vulnerabilityScore } = packageInfo?.vulnerabilityScore || {};

  return (
    <Flex
      gap={{ base: 5, sm: 20 }}
      direction={{
        base: "column",
        sm: "row",
      }}
    >
      <Box w={{ base: "100%", sm: "70%" }}>
        <Conditional if={npm}>
          <Installations packageName={npm?.name} />
        </Conditional>
        <Conditional if={npm}>
          <DeveloperGuide npm={npm} />
        </Conditional>
        <Conditional
          if={vulnerabilityScore && Object.keys(vulnerabilityScore).length > 0}
        >
          <Score scoreData={vulnerabilityScore} packageName={npm?.name} />
        </Conditional>
        <Conditional if={gitHub?.prs || gitHub?.issues}>
          <Actions
            prs={gitHub?.prs}
            issues={gitHub?.issues}
            repositoryUrl={gitHub?.repositoryUrl}
          />
        </Conditional>
        {/* <Conditional if={gitHub?.releases?.total > 0 && gitHub?.repositoryUrl}> */}
        <Releases
          releases={gitHub?.releases}
          repositoryUrl={gitHub?.repositoryUrl}
        />
        {/* </Conditional> */}
        {/* <Conditional
          if={
            gitHub?.contributors?.length > 0 &&
            gitHub?.contributorsCount > 0 &&
            Array.isArray(gitHub?.contributors)
            //|| npm?.collaborators?.length > 0
          }
        > */}
        <Collaborators
          contributorsCount={
            gitHub?.contributorsCount || npm?.collaborators?.length
          }
          contributors={gitHub?.contributors || npm?.collaborators || []}
          repositoryUrl={gitHub?.repositoryUrl || ""}
        />
        {/* </Conditional> */}
        <Conditional if={gitHub && gitHub?.languages?.length > 0}>
          <Languages languages={gitHub?.languages} />
        </Conditional>
      </Box>
      <Box w={{ base: "100%", sm: "30%" }}>
        <Box>
          <Adsense
            client="ca-pub-8328087114055733"
            slot="7774613503"
            style={{ display: "block" }}
            layout="in-article"
            format="fluid"
          />
        </Box>
        <Conditional if={gitHub?.avatar && gitHub?.owner}>
          <Developer
            avatar={gitHub?.avatar}
            owner={gitHub?.owner}
            developerUrl={gitHub?.homepageUrl}
          />
        </Conditional>
        <Conditional if={downloads}>
          <DownloadStatistics downloads={downloads} />
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
        <Conditional if={npm?.funding}>
          <Sponsor funding={npm?.funding} />
        </Conditional>
        <Conditional if={npm?.collaborators}>
          <Maintainers
            maintainers={npm?.collaborators}
            contributorsCount={
              gitHub?.contributorsCount || npm?.collaborators?.length
            }
            repositoryUrl={gitHub?.repositoryUrl || ""}
          />
        </Conditional>
        <Conditional if={npm}>
          <PublishedPackageInfo npm={npm} />
        </Conditional>
      </Box>
    </Flex>
  );
};

export default Overview;
