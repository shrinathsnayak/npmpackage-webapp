import {
  getOGPackageInfo,
  getPackageData,
  getPackageDownloads,
  getPackageVulnerabilities,
} from "@/services/package";
import { genereatePackageName } from "@/constants/services.constants";
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

  const [data, downloads] = await Promise.all([
    getPackageData(packageName),
    getPackageDownloads(packageName),
  ]);

  const vulnerabilities = await getPackageVulnerabilities(
    packageName,
    data?.npm?.data?.version
  );

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
        vulnerabilities={vulnerabilities || {}}
      />
    </div>
  );
}
