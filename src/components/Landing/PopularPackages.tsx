import React from "react";
import Link from "next/link";
import { Anchor, Center, Group, rem, Text } from "@mantine/core";
import { popularPackages } from "@/constants/npmfacts";
import { IconTrendingUp } from "@tabler/icons-react";

const PopularPackages = () => {
  return (
    <Center>
      <Group gap={3}>
        <Group gap={3}>
          <IconTrendingUp
            stroke={2}
            style={{ width: rem(18), height: rem(18) }}
            color="var(--mantine-color-red-8)"
          />
          <Text c="dimmed" fz="sm">
            Popular Packages
          </Text>
        </Group>
        {popularPackages.map((item: string) => (
          <Anchor
            p={5}
            key={item}
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
