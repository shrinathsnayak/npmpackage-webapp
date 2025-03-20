"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Anchor, Badge, Box, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconTag } from "@tabler/icons-react";
import OverviewCard from "@/components/shared/OverviewCard";
import { updatePopularPackageCount } from "@/services/supbase";
import { removeSimilarByName } from "@/utils";
import { DataItem } from "@/types/npm";
import classes from "./Installation.module.css";

const Suggestions = ({ searchData, packageName = "" }: any) => {
  const t = useTranslations("overview");
  const data = removeSimilarByName(searchData, packageName);
  return (
    <Box p={16} className={classes.similarPackagesBorder}>
      <OverviewCard title={t("similar_packages", { packageName })} mb={0}>
        <SimpleGrid
          mt={10}
          spacing={{ base: 10, sm: "xs" }}
          cols={{ base: 1, sm: 2, lg: 4 }}
          verticalSpacing={{ base: "sm", sm: "xs" }}
        >
          {data?.map((item: DataItem) => (
            <Anchor
              key={item?.name}
              component={Link}
              underline="never"
              href={`/package/${item?.name}`}
              scroll={false}
              shallow={true}
              onClick={() => updatePopularPackageCount(item?.name)}
            >
              <Paper
                w="100%"
                h="100%"
                radius="md"
                bg="dark.7"
                shadow="xs"
                p={{ base: 15, sm: 10 }}
                className={classes.suggestedItem}
              >
                <Text fz="md" c="white" fw={500}>
                  {item?.name}
                </Text>
                <Badge
                  my={5}
                  size="sm"
                  maw="100%"
                  radius={5}
                  color="green"
                  opacity={0.9}
                  variant="outline"
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
    </Box>
  );
};

export default Suggestions;
