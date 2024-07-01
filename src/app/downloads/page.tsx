import GraphContainer from "@/components/downloads/GraphContainer";
import SearchContainer from "@/components/downloads/SearchContainer";
import React, { Suspense } from "react";

export default async function Downloads({ searchParams }: any) {
  const { packageName, endDate, startDate } = searchParams || {};
  return (
    <div>
      <SearchContainer />
      {packageName && (
        <Suspense key={packageName} fallback={<>loading !!</>}>
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
