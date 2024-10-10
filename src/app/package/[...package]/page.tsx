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
  const name = genereatePackageName(params.package);
  const { npm, gitHub } = (await getPackageData(name)) || {};
  return {
    title: npm?.data?.name,
    description: npm?.data?.description,
    openGraph: {
      images: [gitHub?.data?.avatar],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/package/${params.package}`,
    },
  };
}

export default async function Package({ params }: { params: { package: [] } }) {
  const packageName = await genereatePackageName(params.package);
  const [data, downloads, searchData] = await Promise.all([
    (await getPackageData(packageName)) || {},
    (await getPackageDownloads(packageName)) || {},
    (await searchPackage(packageName)) || {},
  ]);
  const filteredData = removeSimilarByName(searchData?.data, packageName);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <PackageContainer
          packageInfo={data}
          downloads={downloads?.data?.total}
        />
        <PageTabs packageInfo={data} downloads={downloads} />
        <Conditional if={filteredData?.length > 0}>
          <Suggestions searchData={filteredData} packageName={packageName} />
        </Conditional>
      </div>
    </Suspense>
  );
}
