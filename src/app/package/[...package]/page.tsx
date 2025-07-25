import {
  getOGPackageInfo,
  getNPMPackageData,
  getGitHubPackageData,
  getVulnerabilityScore,
  getPackageDownloads,
} from "@/services/package";
import { genereatePackageName } from "@/constants/services.constants";
import { matchGithubRepo } from "@/utils";
import PageTabs from "@/components/packages/PackageTabs";
import PackageContainer from "@/components/packages/PackageContainer";
import JSONLD from "@/components/shared/JSONLD";
import OGImage from "../../../../public/og.png";

export async function generateMetadata(props: {
  params: Promise<{ package: [] }>;
  isNotFound: boolean;
}) {
  const params = await props.params;
  const { package: packages } = params;
  const notFound = await props.isNotFound;
  const packageName = genereatePackageName(packages);
  const packageData = await getOGPackageInfo(packageName);

  if (notFound) return null;

  return {
    title: `${packageName} - ${packageData?.data?.version}`,
    description: packageData?.data?.description,
    openGraph: {
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}${OGImage.src}`],
    },
    alternates: {
      canonical: new URL(
        `/package/${packageName}`,
        process.env.NEXT_PUBLIC_SITE_URL
      ).toString(),
    },
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_SITE_URL}/package/${packageName}`
    ),
  };
}

export default async function Package(props: {
  params: Promise<{ package: [] }>;
}) {
  const params = await props.params;
  const { package: packages } = params;
  const packageName = genereatePackageName(packages);

  // Fetch data progressively - start with fastest endpoints
  const [npmData, downloads] = await Promise.all([
    getNPMPackageData(packageName),
    getPackageDownloads(packageName),
  ]);

  // Extract owner and repo from NPM data for GitHub and security scan APIs
  const [owner, repo] = matchGithubRepo(npmData);

  // Fetch additional data in parallel
  const [githubData, vulnerabilityScoreData] = await Promise.allSettled([
    getGitHubPackageData(packageName, owner || "", repo || ""),
    getVulnerabilityScore(packageName, npmData?.data?.version || ""),
  ]);

  const vulnerabilityScore = vulnerabilityScoreData.status === "fulfilled" ? vulnerabilityScoreData.value : null;

  const data = {
    npm: npmData,
    gitHub: githubData.status === "fulfilled" ? githubData.value : null,
    vulnerabilityScore: vulnerabilityScore,
  };

  return (
    <div>
      <JSONLD data={data} packageName={packageName} />
      <PackageContainer
        packageInfo={data || {}}
        downloads={downloads?.data?.total || 0}
      />
      <PageTabs
        packageInfo={data || {}}
        downloads={downloads || {}}
      />
    </div>
  );
}
