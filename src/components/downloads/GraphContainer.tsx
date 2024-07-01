import React from "react";
import { genereatePackageName } from "@/constants/services.constants";
import { packageDownloadStats } from "@/services/package";
import ClientGraphContainer from "./ClientGraph";

export default async function GraphContainer({
  packageName = [],
  startDate,
  endDate,
}: any) {
  const name = packageName && genereatePackageName([packageName] as any);
  const downloads =
    (name && (await packageDownloadStats(name, startDate, endDate))) || {};
  return (
    <ClientGraphContainer downloads={downloads} />
  );
}
