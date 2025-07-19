"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Anchor, Center, Group, rem, Text } from "@mantine/core";
import { IconTrendingUp } from "@tabler/icons-react";
import { updatePopularPackageCount } from "@/services/supbase";

const PopularPackages = ({ popularPackages }: any) => {
  const t = useTranslations();
  return (
    <Center>
      <Group gap={2} align="center">
        <Group gap={3} align="center">
          <IconTrendingUp
            style={{ width: rem(19), height: rem(19) }}
            color="var(--mantine-color-red-8)"
          />
          <Text c="gray.4" fz="sm">
            {t("popular_packages")}
          </Text>
        </Group>
        {popularPackages.map((item: any) => (
          <Anchor
            p={5}
            component={Link}
            underline="hover"
            key={item?.package_id}
            onClick={() => updatePopularPackageCount(item?.package_id)}
            href={`/package/${item?.package_id}`}
            prefetch={false}
          >
            <Text fw={500}>{item?.package_id}</Text>
          </Anchor>
        ))}
      </Group>
    </Center>
  );
};

export default PopularPackages;
