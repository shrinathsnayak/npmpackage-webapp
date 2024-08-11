import React from "react";
import Link from "next/link";
import {
  Anchor,
  Badge,
  Container,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconTag } from "@tabler/icons-react";
import OverviewCard from "@/components/shared/OverviewCard";
import { removeSimilarByName } from "@/utils";
import { DataItem } from "@/types/npm";

const Suggestions = ({ searchData, packageName = "" }: any) => {
  const data = removeSimilarByName(searchData, packageName);
  return (
    <Container className="responsiveContainer">
      <OverviewCard title={`Other packages similar to ${packageName}`}>
        <SimpleGrid
          spacing={{ base: 10, sm: "xs" }}
          cols={{ base: 1, sm: 2, lg: data.length }}
          verticalSpacing={{ base: "sm", sm: "xs" }}
        >
          {data?.map((item: DataItem) => (
            <Anchor
              prefetch
              key={item?.name}
              component={Link}
              underline="never"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/package/${item?.name}`}
            >
              <Paper
                w="100%"
                withBorder
                p={{ base: 15, sm: 10 }}
                radius="md"
                bg="dark.9"
                shadow="sm"
              >
                <Text fz="sm" c="white">
                  {item?.name}
                </Text>
                <Badge
                  variant="outline"
                  color="green"
                  opacity={0.9}
                  radius={5}
                  size="sm"
                  my={5}
                  leftSection={<IconTag size={12} />}
                >
                  {item?.version}
                </Badge>
                <Text fz="xs" c="dimmed" lineClamp={2}>
                  {item?.description}
                </Text>
              </Paper>
            </Anchor>
          ))}
        </SimpleGrid>
      </OverviewCard>
    </Container>
  );
};

export default Suggestions;
