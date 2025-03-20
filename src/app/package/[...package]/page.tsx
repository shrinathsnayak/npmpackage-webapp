import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  getOGPackageInfo,
  getPackageData,
  getPackageDownloads,
  getPackageVulnerabilities,
} from "@/services/package";
import { genereatePackageName } from "@/constants/services.constants";
import JSONLD from "@/components/shared/JSONLD";
import OGImage from "../../../../public/og.png";

const PackageContainer = dynamic(
  () => import("@/components/packages/PackageContainer"),
  { ssr: true }
);
const PageTabs = dynamic(() => import("@/components/packages/PackageTabs"), {
  ssr: true,
});

export async function generateMetadata(props: {
  params: Promise<{ package: [] }>;
  searchParams: Promise<any>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { package: packages } = params;
  const packageName = genereatePackageName(packages);
  const packageData = await getOGPackageInfo(packageName);
  const hasSearchParams = !!searchParams?.t;

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
    robots: hasSearchParams ? "noindex, follow" : "index, follow",
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
      <Suspense fallback={<p>Loading package information...</p>}>
        <PackageContainer
          packageInfo={data || {}}
          downloads={downloads?.data?.total || 0}
        />
      </Suspense>
      <Suspense fallback={<p>Loading tabs...</p>}>
        <PageTabs
          packageInfo={data || {}}
          downloads={downloads || {}}
          vulnerabilities={vulnerabilities || {}}
        />
      </Suspense>
    </div>
  );
}
