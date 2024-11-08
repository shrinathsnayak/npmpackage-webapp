"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useMemo, memo, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import { Badge, Group, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { createSpotlight, Spotlight } from "@mantine/spotlight";
import { formatDate } from "@/utils";
import { searchPackage } from "@/services/package";
import { updatePopularPackageCount } from "@/services/supbase";

export const [searchStore, searchHandlers] = createSpotlight();

const MemoizedSpotlightAction = memo(({ item, setQuery, setData }: any) => {
  const router = useRouter();
  const formattedDate = useMemo(
    () => formatDate(new Date(item.date)),
    [item.date]
  );

  const handleClick = useCallback(
    async (packageName: string) => {
      setQuery("");
      setData([]);
      await updatePopularPackageCount(packageName);
      router.push(`/package/${packageName}`, { scroll: false });
    },
    [router, setData, setQuery]
  );

  return (
    <Spotlight.Action onClick={() => handleClick(item.name)}>
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
            Published on {formattedDate}
          </Text>
        </div>
      </Group>
    </Spotlight.Action>
  );
});

MemoizedSpotlightAction.displayName = "MemoizedSpotlightAction";

const SearchComponent = () => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [debouncedQuery] = useDebouncedValue(query, 500);
  const shortcuts = useMemo<string[]>(() => ["mod + K", "mod + P", "/"], []);

  const searchPackageName = async (packageName: any) => {
    const { status, data } =
      ((await searchPackage(packageName)) as any) || ({} as any);
    if (status === 200) {
      setData(data);
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      searchPackageName(debouncedQuery);
    }
  }, [debouncedQuery]);

  const handleChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const items = useMemo(
    () =>
      data.map((item) => (
        <MemoizedSpotlightAction
          key={`${item.name}${item.version}`}
          setQuery={setQuery}
          setData={setData}
          item={item}
        />
      )),
    [data]
  );

  const memoizedIconSearch = useMemo(() => <IconSearch stroke={1.5} />, []);

  return (
    <Spotlight.Root
      scrollable
      query={query}
      maxHeight={500}
      store={searchStore}
      onQueryChange={handleChange}
      shortcut={shortcuts}
      triggerOnContentEditable={true}
    >
      <Spotlight.Search
        pointer
        required
        placeholder="Search Package Name"
        leftSection={memoizedIconSearch}
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
};

export const Search = memo(SearchComponent);
