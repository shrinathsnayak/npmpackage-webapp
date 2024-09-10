import React, { Suspense } from "react";
import { Paper } from "@mantine/core";
import MDX from "@/components/shared/mdx";

const ReadMe = ({ data }: any) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" c="white">
        <MDX content={data} />
      </Paper>
    </Suspense>
  );
};

export default ReadMe;
