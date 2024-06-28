import React, { Suspense } from "react";
import MDX from "@/components/shared/mdx";

const ReadMe = ({ data }: any) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <MDX content={data} />
    </Suspense>
  );
};

export default ReadMe;
