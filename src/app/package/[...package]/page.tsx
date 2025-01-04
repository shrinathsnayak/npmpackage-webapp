import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
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
