import React, { Suspense } from "react";
import { Paper } from "@mantine/core";
import MDX from "@/components/shared/mdx";
import EmptyState from "@/components/shared/Empty";
import { EMPTY_TYPE } from "@/constants/empty";

const ReadMe = ({ data, gitHub }: any) => {
  if (!data) return <EmptyState type={EMPTY_TYPE.README} />;

  const { owner, defaultBranch, name } = gitHub || {};

  return (
    <Suspense fallback={<>loading...</>}>
      <Paper p="lg" radius="md" bg="dark.9" shadow="sm" c="white">
        <MDX content={data} owner={owner} name={name} branch={defaultBranch} />
      </Paper>
    </Suspense>
  );
};

export default ReadMe;
