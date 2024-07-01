import { Box } from "@mantine/core";
import { getPackageData, getPackageDownloads } from "@/services/package";
import { genereatePackageName } from "@/constants/services.constants";
import PackageContainer from "@/components/packages/PackageContainer";
import PageTabs from "@/components/packages/PackageTabs";

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
  return (
    <div>
      <PackageContainer packageInfo={data} downloads={downloads?.data?.total} />
      <PageTabs packageInfo={data} downloads={downloads} />
    </div>
  );
}
