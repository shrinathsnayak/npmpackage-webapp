import React, { Suspense } from "react";
import MDX from "../mdx";

const Overview = ({ data }: any) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <MDX content={data} />
    </Suspense>
  );
};

export default Overview;
