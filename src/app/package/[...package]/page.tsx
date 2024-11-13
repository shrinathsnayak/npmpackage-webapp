import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  getPackageData,
  getPackageDownloads,
  getPackageVulnerabilities,
  searchPackage,
} from "@/services/package";
import Conditional from "@/components/shared/Conditional";
import { genereatePackageName } from "@/constants/services.constants";
import JSONLD from "@/components/shared/JSONLD";
import { removeSimilarByName } from "@/utils";
import OGImage from "@/assets/og.png";

const PackageContainer = dynamic(
  () => import("@/components/packages/PackageContainer"),
  { ssr: true }
);
const PageTabs = dynamic(() => import("@/components/packages/PackageTabs"), {
  ssr: true,
});

const Suggestions = dynamic(
  () => import("@/components/packages/Tabs/components/Suggestions"),
  {
    ssr: true,
  }
);

export async function generateMetadata({
  params,
}: {
  params: { package: [] };
}) {
  const { package: packages } = params;
  const packageName = genereatePackageName(packages);
  return {
    title: packageName,
    openGraph: {
      images: [OGImage.src],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/package/${packageName}`,
    },
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_SITE_URL}/package/${packageName}`
    ),
  };
}

export default async function Package({ params }: { params: { package: [] } }) {
  const { package: packages } = params;
  const packageName = genereatePackageName(packages);

  const [data, downloads, searchData, vulnerabilities] = await Promise.all([
    getPackageData(packageName),
    getPackageDownloads(packageName),
    searchPackage(packageName),
    getPackageVulnerabilities(packageName),
  ]);

  const filteredData = removeSimilarByName(searchData?.data, packageName);

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
      <Conditional if={filteredData?.length > 0}>
        <Suspense fallback={<p>Loading suggestions...</p>}>
          <Suggestions searchData={filteredData} packageName={packageName} />
        </Suspense>
      </Conditional>
    </div>
  );
}
