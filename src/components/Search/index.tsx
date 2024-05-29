"use client";

import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import {
  createSpotlight,
  Spotlight,
  SpotlightActionData,
} from "@mantine/spotlight";

export const [searchStore, searchHandlers] = createSpotlight();

export function Search() {
  const router = useRouter();

  const actions: SpotlightActionData[] = [
    {
      id: "home",
      label: "Home",
      description: "Get to home page",
      onClick: () => console.log("Home"),
    },
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Get full information about current system status",
      onClick: () => console.log("Dashboard"),
    },
    {
      id: "documentation",
      label: "Documentation",
      description: "Visit documentation to lean more about all features",
      onClick: () => console.log("Documentation"),
    },
  ];

  return (
    <Spotlight
      store={searchStore}
      shortcut={["mod + K", "mod + P", "/"]}
      actions={actions}
      tagsToIgnore={[]}
      highlightQuery
      clearQueryOnClose
      radius="md"
      limit={7}
      nothingFound="Nothing found..."
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} />,
        placeholder: "Search documentation...",
      }}
    />
  );
}
