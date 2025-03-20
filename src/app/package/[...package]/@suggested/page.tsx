import dynamic from "next/dynamic";
import { searchPackage } from "@/services/package";
import { genereatePackageName } from "@/constants/services.constants";
import { removeSimilarByName } from "@/utils";
import Conditional from "@/components/shared/Conditional";

const Suggestions = dynamic(
  () => import("@/components/packages/Tabs/components/Suggestions"),
  {
    ssr: true,
  }
);

export default async function Suggested(props: {
  params: Promise<{ package: [] }>;
}) {
  const params = await props.params;
  const { package: packages } = params;
  const packageName = genereatePackageName(packages);
  const searchData = await searchPackage(packageName);
  const filteredData = removeSimilarByName(searchData?.data, packageName);

  return (
    <Conditional if={filteredData?.length > 0}>
      <Suggestions searchData={filteredData} packageName={packageName} />
    </Conditional>
  );
}
