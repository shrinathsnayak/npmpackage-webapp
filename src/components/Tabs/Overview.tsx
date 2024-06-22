import { Box } from "@mantine/core";
import React, { Suspense } from "react";
import Installations from "./components/Installations";

const Overview = ({ packageInfo }: any) => {
  const { npm } = packageInfo || {};
  return (
    <Box>
      <Suspense>
        <Installations packageName={npm?.data?.name} />
      </Suspense>
    </Box>
  );
};

export default Overview;
