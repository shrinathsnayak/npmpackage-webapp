"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useMemo, memo } from "react";
import { IconSearch } from "@tabler/icons-react";
import { Badge, Group, Text } from "@mantine/core";
import { useThrottledCallback } from "@mantine/hooks";
import { createSpotlight, Spotlight } from "@mantine/spotlight";
import { formatDate } from "@/utils";
import { searchPackage } from "@/services/package";

export const [searchStore, searchHandlers] = createSpotlight();

const MemoizedSpotlightAction = memo(({ item, renderItems }: any) => {
  const router = useRouter();
  const handleClick = useCallback(
    (packageName: string) => {
      if (packageName) {
        router.prefetch(`/package/${packageName}`);
        router.push(`/package/${packageName}`);
      }
    },
    [router]
  );

  return (<Spotlight.Action onClick={() => handleClick(item.name)}>
    {renderItems(item)}
  </Spotlight.Action>
  )
});

MemoizedSpotlightAction.displayName = "MemoizedSpotlightAction";

export function Search() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const shortcuts = useMemo<string[]>(() => ["mod + K", "mod + P", "/"], []);

  const searchPackageName = async (packageName: any) => {
    const { status, data } =
      ((await searchPackage(packageName)) as any) || ({} as any);
    if (status === 200) {
      setData(data);
    }
  };

  const handleSearch = useThrottledCallback((query: string) => {
    searchPackageName(query);
  }, 500);

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      handleSearch(value);
    },
    [handleSearch]
  );

  const renderItems = useCallback((item: any) => {
    return (
      <Group wrap="nowrap" w="100%" p={2}>
        <div style={{ flex: 1 }}>
          <Group align="center" gap={5}>
            <Text fz="lg" fw="bold" c="white">
              {item.name}
            </Text>
            <Badge c="gray" variant="light">
              {item.version}
            </Badge>
          </Group>

          {item.description && (
            <Text opacity={0.6} size="sm" mt={3} c="dark.1">
              {item.description}
            </Text>
          )}

          <Text opacity={0.9} size="xs" mt={5} c="dark.0">
            Published on {formatDate(new Date(item.date))}
          </Text>
        </div>
      </Group>
    );
  }, [])

  const items = useMemo(
    () =>
      data?.map((item) => (
        <MemoizedSpotlightAction
          item={item}
          key={`${item.name}${item.version}`}
          renderItems={renderItems}
        />
      )),
    [data, renderItems]
  );

  return (
    <Spotlight.Root
      scrollable
      query={query}
      maxHeight={500}
      store={searchStore}
      onQueryChange={handleChange}
      shortcut={shortcuts}
    >
      <Spotlight.Search
        pointer
        required
        placeholder="Search Package Name"
        leftSection={<IconSearch stroke={1.5} />}
        wrapperProps={{
          focus: true
        }}
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