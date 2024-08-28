"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import { Badge, Group, Text } from "@mantine/core";
import { useThrottledCallback } from "@mantine/hooks";
import { createSpotlight, Spotlight } from "@mantine/spotlight";
import { formatDate } from "@/utils";
import { searchPackage } from "@/services/package";

export const [searchStore, searchHandlers] = createSpotlight();

export function Search() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  const handleClick = (event: any, packageName: string) => {
    if (packageName) {
      router.push(`/package/${packageName}`);
      setQuery("");
    }
  };

  const searchPackageName = async (packageName: any) => {
    const { status, data } =
      ((await searchPackage(packageName)) as any) || ({} as any);
    if (status === 200) {
      setData(data);
    }
  };

  const handleSearch = useThrottledCallback((query: string) => {
    searchPackageName(query);
  }, 1000);

  const handleChange = (value: string) => {
    setQuery(value);
    handleSearch(value);
  };

  const items = data?.map((item) => (
    <Spotlight.Action
      key={`${item.name}${item.version}`}
      onClick={(event: any) => handleClick(event, item.name)}
    >
      <Group wrap="nowrap" w="100%" p={2}>
        <div style={{ flex: 1 }}>
          <Group align="center" gap={5}>
            <Text fz="lg" fw="bold">
              {item.name}
            </Text>
            <Badge color="gray" variant="light">
              {item.version}
            </Badge>
          </Group>

          {item.description && (
            <Text opacity={0.6} size="sm" mt={3}>
              {item.description}
            </Text>
          )}

          <Text opacity={0.9} size="xs" mt={5}>
            Published on {formatDate(new Date(item.date))}
          </Text>
        </div>
      </Group>
    </Spotlight.Action>
  ));

  return (
    <Spotlight.Root
      scrollable
      query={query}
      maxHeight={500}
      store={searchStore}
      onQueryChange={handleChange}
      shortcut={["mod + K", "mod + P", "/"]}
    >
      <Spotlight.Search
        placeholder="Search Package Name"
        leftSection={<IconSearch stroke={1.5} />}
      />
      <Spotlight.ActionsList>
        {items.length > 0 ? (
          items
        ) : (
          <Spotlight.Empty>Nothing found...</Spotlight.Empty>
        )}
      </Spotlight.ActionsList>
    </Spotlight.Root>
  );
}
