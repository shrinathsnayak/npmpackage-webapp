import GraphContainer from "@/components/downloads/GraphContainer";
import SearchContainer from "@/components/downloads/SearchContainer";
import React, { Suspense } from "react";
import Loading from "./loading";

export async function generateMetadata({ searchParams }: any) {
  const { packageName } = searchParams || {};
  return {
    title: `${packageName || ""} Downloads`,
  };
}

export default async function Downloads({ searchParams }: any) {
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
