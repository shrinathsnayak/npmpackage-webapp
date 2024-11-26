import React, { Suspense } from "react";
import PageLayout from "@/components/shared/PageLayout";

const layout = ({ children, suggested }: any) => {
  return (
    <PageLayout>
      {children}
      <Suspense fallback={<p>Loading suggestions...</p>}>{suggested}</Suspense>
    </PageLayout>
  );
};

export default layout;
