import React from "react";
import Link from "next/link";
import { Anchor, Center, Group, rem, Text } from "@mantine/core";
import { popularPackages } from "@/constants/npmfacts";
import { IconTrendingUp } from "@tabler/icons-react";

const PopularPackages = () => {
  return (
    <Center>
      <Group gap={2} align="center">
        <Group gap={3} align="center">
          <IconTrendingUp
            style={{ width: rem(19), height: rem(19) }}
            color="var(--mantine-color-red-8)"
          />
          <Text c="dimmed" fz="sm">
            Popular Packages -
          </Text>
        </Group>
        {popularPackages.map((item: string) => (
          <Anchor
            p={5}
            key={item}
            prefetch
            component={Link}
            underline="hover"
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/package/${item}`}
          >
            <Text fw={500}>{item}</Text>
          </Anchor>
        ))}
      </Group>
    </Center>
  );
};

export default PopularPackages;
