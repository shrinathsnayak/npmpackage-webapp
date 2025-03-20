import GraphContainer from "@/components/downloads/GraphContainer";
import SearchContainer from "@/components/downloads/SearchContainer";
import React, { Suspense } from "react";
import Loading from "./loading";

export async function generateMetadata(props: any) {
  const searchParams = await props.searchParams;
  const { packageName } = searchParams || {};
  return {
    title: `${packageName || ""} Downloads`,
  };
}

export default async function Downloads(props: any) {
  const searchParams = await props.searchParams;
  const { packageName, endDate, startDate } = searchParams || {};
  return (
    <div>
      <SearchContainer />
      {packageName && (
        <Suspense key={packageName} fallback={<Loading />}>
          <GraphContainer
            packageName={packageName}
            endDate={endDate}
            startDate={startDate}
          />
        </Suspense>
      )}
    </div>
  );
}
