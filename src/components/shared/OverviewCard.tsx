import { Badge, Box, Group, Title } from "@mantine/core";
import React, { Suspense } from "react";

const OverviewCard = ({ children, title, badge }: any) => {
  return (
    <Box mb={15}>
      <Group gap={10} align="center" mb={7}>
        <Title order={5}>{title}</Title>
        {badge && (
          <Badge radius={5} size="md" color="dark">
            {badge}
          </Badge>
        )}
      </Group>
      <Suspense>{children}</Suspense>
    </Box>
  );
};

export default OverviewCard;
