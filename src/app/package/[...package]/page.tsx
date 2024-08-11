import dynamic from "next/dynamic";
import {
  getPackageData,
  getPackageDownloads,
  searchPackage,
} from "@/services/package";
import { genereatePackageName } from "@/constants/services.constants";

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
  const packageName = genereatePackageName(params.package);
  const data = packageName && (await getPackageData(packageName));
  const downloads = packageName && (await getPackageDownloads(packageName));
  const { data: searchData } =
    ((await searchPackage(packageName)) as any) || ({} as any);
  return (
    <div>
      <PackageContainer packageInfo={data} downloads={downloads?.data?.total} />
      <PageTabs packageInfo={data} downloads={downloads} />
      <Suggestions searchData={searchData} packageName={packageName} />
    </div>
  );
}
