import { Box } from "@mantine/core";
import { getPackageData } from "@/services/package";
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
  const name = await genereatePackageName(params.package);
  const data = await getPackageData(name);
  return (
    <Box>
      <PackageContainer packageInfo={data} />
      <PageTabs pacakgeInfo={data} />
    </Box>
  );
}
