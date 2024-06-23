import { Box } from "@mantine/core";
import { getPackageData, getPackageDownloads } from "@/services/package";
import { genereatePackageName } from "@/constants/services.constants";
import PackageContainer from "@/components/PackageContainer";
import PageTabs from "@/components/PackageTabs";

export async function generateMetadata({
  params,
}: {
  params: { package: [] };
}) {
  const name = genereatePackageName(params.package);
  const { npm, gitHub } = await getPackageData(name);
  return {
    title: npm?.data?.name,
    description: npm?.data?.description,
    openGraph: {
      images: [gitHub?.data?.avatar],
    },
    alternates: {
      canonical: `${process.env.SITE_URL}/package/${name}`,
    },
  };
}

export default async function Package({ params }: { params: { package: [] } }) {
  const name = genereatePackageName(params.package);
  const data = await getPackageData(name);
  const downloads = await getPackageDownloads(name);
  return (
    <Box>
      <PackageContainer packageInfo={data} downloads={downloads?.data?.total} />
      <PageTabs packageInfo={data} downloads={downloads} />
    </Box>
  );
}
