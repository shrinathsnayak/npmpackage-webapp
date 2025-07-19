import {
  getOGPackageInfo,
  getNpmPackageData,
  getGitHubData,
  getVulnerabilityData,
  getVulnerabilityScoreData,
  getSecurityScanData,
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
    getNpmPackageData(packageName),
    getPackageDownloads(packageName),
  ]);

  // Extract owner and repo from NPM data for GitHub and security scan APIs

  const [owner, repo] = matchGithubRepo(npmData);
  // Fetch additional data in parallel
  const [githubData, vulnerabilityData, vulnerabilityScoreData, scanData] = await Promise.allSettled([
    getGitHubData(packageName, owner || undefined, repo || undefined),
    getVulnerabilityData(packageName, npmData?.data?.version),
    getVulnerabilityScoreData(packageName, npmData?.data?.version),
    getSecurityScanData(packageName, owner || undefined, repo || undefined),
  ]);

  // Combine vulnerability score data with vulnerability data
  const vulnerabilityScore = vulnerabilityScoreData.status === "fulfilled" ? vulnerabilityScoreData.value : null;
  const vulnerabilities = vulnerabilityData.status === "fulfilled" ? vulnerabilityData.value : null;

  // Enhance vulnerability score with vulnerability data if available
  if (vulnerabilityScore?.data && vulnerabilities?.data) {
    // Add vulnerability count and details to the vulnerability score
    const vulnerabilityCount = Object.values(vulnerabilities.data).reduce((total: number, vulns: any) => {
      return total + (Array.isArray(vulns) ? vulns.length : 0);
    }, 0);

    // Enhance the vulnerability score data with vulnerability information
    if (vulnerabilityScore.data.vulnerability) {
      vulnerabilityScore.data.vulnerability.vulnerabilityCount = vulnerabilityCount;
      vulnerabilityScore.data.vulnerability.vulnerabilities = vulnerabilities.data;
    }
  }

  const data = {
    npm: npmData,
    gitHub: githubData.status === "fulfilled" ? githubData.value : null,
    vulnerabilities: vulnerabilities,
    vulnerabilityScore: vulnerabilityScore,
    scan: scanData.status === "fulfilled" ? scanData.value : null,
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
        vulnerabilities={data?.vulnerabilities || {}}
      />
    </div>
  );
}
