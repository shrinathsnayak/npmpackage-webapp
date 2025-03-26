"use client";

import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import { ActionIcon, Group } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandNpm,
  IconWorld,
  IconBrandTypescript,
  IconPlayerPlayFilled,
  IconBookmark,
  IconBookmarkFilled,
} from "@tabler/icons-react";
import Conditional from "@/components/shared/Conditional";
import { useBookmark } from "@/components/shared/Bookmark/useBookmark";
import { EVENT_NAMES, track } from "@/utils/gaEvents";

export const LinksContainer = ({
  homePage,
  github,
  npm,
  typesLink,
  runKit,
  bookmarkObject,
}: any) => {
  const { addBookmark, isBookmarked, removeBookmark } = useBookmark();

  const bookmarked = useMemo(
    () => isBookmarked(bookmarkObject.key),
    [bookmarkObject, isBookmarked]
  );

  const bookmarkHandler = useCallback(() => {
    track(bookmarked ? EVENT_NAMES.UNBOOKMARK : EVENT_NAMES.BOOKMARK, {
      value: bookmarkObject.key,
    });
    return bookmarked
      ? removeBookmark(bookmarkObject.key)
      : addBookmark(bookmarkObject);
  }, [bookmarked, bookmarkObject, addBookmark, removeBookmark]);

  return (
    <Group gap={10} mb={{ base: 5, sm: 0 }}>
      <ActionIcon
        size="lg"
        variant="outline"
        color="red.8"
        title="Bookmark"
        onClick={bookmarkHandler}
      >
        {bookmarked ? (
          <IconBookmarkFilled size={18} fill="var(--mantine-color-red-8)" />
        ) : (
          <IconBookmark size={18} color="var(--mantine-color-red-8)" />
        )}
      </ActionIcon>

      <Conditional if={homePage}>
        <ActionIcon
          size="lg"
          variant="light"
          color="gray"
          component={Link}
          href={homePage}
          target="_blank"
          onClick={() => track(EVENT_NAMES.WEBSITE_LINK)}
        >
          <IconWorld size={18} />
        </ActionIcon>
      </Conditional>

      <Conditional if={github}>
        <ActionIcon
          variant="light"
          size="lg"
          color="gray"
          component={Link}
          href={github}
          target="_blank"
          onClick={() => track(EVENT_NAMES.GITHUB_LINK)}
        >
          <IconBrandGithub size={18} />
        </ActionIcon>
      </Conditional>

      <Conditional if={npm}>
        <ActionIcon
          variant="light"
          size="lg"
          color="gray"
          component={Link}
          href={npm}
          target="_blank"
          onClick={() => track(EVENT_NAMES.NPM_LINK)}
        >
          <IconBrandNpm size={18} />
        </ActionIcon>
      </Conditional>

      <Conditional if={runKit}>
        <ActionIcon
          variant="light"
          size="lg"
          color="gray"
          component={Link}
          href={runKit}
          target="_blank"
          onClick={() => track(EVENT_NAMES.RUNKIT_LINK)}
        >
          <IconPlayerPlayFilled size={18} />
        </ActionIcon>
      </Conditional>

      <Conditional if={false}>
        <ActionIcon
          variant="light"
          size="lg"
          color="gray"
          component={Link}
          href={typesLink}
          target="_blank"
        >
          <IconBrandTypescript size={18} />
        </ActionIcon>
      </Conditional>
    </Group>
  );
};
