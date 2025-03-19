import React, { Suspense } from "react";
import { Badge, Box, Group, Title } from "@mantine/core";
import ErrorBoundary from "./ErrorBoundary";

const OverviewCard = ({ children, title, badge }: any) => {
  return (
    <Box mb={15}>
      <Group gap={10} align="center" mb={7}>
        <Title order={5} c="white">
          {title}
        </Title>
        {badge && (
          <Badge radius={5} size="sm" color="dark.7">
            {badge}
          </Badge>
        )}
      </Group>
      <Suspense>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    </Box>
  );
};

export default OverviewCard;
