import React from "react";
import { genereatePackageName } from "@/constants/services.constants";
import { getPackageDownloadsWithRange } from "@/services/package";
import ClientGraphContainer from "./ClientGraph";

export default async function GraphContainer({
  packageName = [],
  startDate,
  endDate,
}: any) {
  const name = packageName && genereatePackageName([packageName] as any);
  const downloads =
    (name && startDate && endDate && (await getPackageDownloadsWithRange(name, startDate, endDate))) || {};
  return (
    <ClientGraphContainer packageName={packageName} downloads={downloads} />
  );
}
