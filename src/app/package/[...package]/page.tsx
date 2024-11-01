import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  getPackageData,
  getPackageDownloads,
  searchPackage,
} from "@/services/package";
import Conditional from "@/components/shared/Conditional";
import { genereatePackageName } from "@/constants/services.constants";
import { removeSimilarByName } from "@/utils";

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
  const name = await genereatePackageName(packages);
  const { npm, gitHub } = (await getPackageData(name)) || {};
  return {
    title: npm?.data?.name,
    description: npm?.data?.description,
    openGraph: {
      images: [gitHub?.data?.avatar],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/package/${packages}`,
    },
  };
}

export default async function Package({ params }: { params: { package: [] } }) {
  const { package: packages } = params;
  const packageName = await genereatePackageName(packages);

  const [data, downloads, searchData] = await Promise.all([
    getPackageData(packageName),
    getPackageDownloads(packageName),
    searchPackage(packageName),
  ]);

  const filteredData = removeSimilarByName(searchData?.data, packageName);

  return (
    <div>
      <Suspense fallback={<p>Loading package information...</p>}>
        <PackageContainer
          packageInfo={data || {}}
          downloads={downloads?.data?.total || 0}
        />
      </Suspense>
      <Suspense fallback={<p>Loading tabs...</p>}>
        <PageTabs packageInfo={data || {}} downloads={downloads || {}} />
      </Suspense>
      <Conditional if={filteredData?.length > 0}>
        <Suspense fallback={<p>Loading suggestions...</p>}>
          <Suggestions searchData={filteredData} packageName={packageName} />
        </Suspense>
      </Conditional>
    </div>
  );
}
