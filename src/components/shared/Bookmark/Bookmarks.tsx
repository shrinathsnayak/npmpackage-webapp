"use client";
import Link from "next/link";
import {
  Box,
  Paper,
  Drawer,
  Group,
  Title,
  Text,
  CloseButton,
  Anchor,
} from "@mantine/core";
import { useBookmark } from "./useBookmark";
import { EVENT_NAMES, track } from "@/utils/gaEvents";

const Bookmarks = ({ opened, onClose }: any) => {
  const { value, removeBookmark } = useBookmark();
  return (
    <Drawer
      size="md"
      offset={8}
      radius="md"
      position="right"
      opened={opened}
      onClose={onClose}
      title={<Text>Bookmarks ({value.length})</Text>}
      overlayProps={{
        backgroundOpacity: 0.3,
        blur: 1,
      }}
    >
      <Box py={5}>
        {value.map((bookmark) => (
          <Paper
            p="sm"
            mb={10}
            withBorder
            bg="dark.9"
            key={bookmark.key}
            style={{ borderStyle: "dashed" }}
          >
            <Group mb={3} justify="space-between" align="center">
              <Anchor
                c="white"
                component={Link}
                underline="hover"
                key={bookmark.key}
                href={`/package/${bookmark.key}`}
                onClick={() => track(EVENT_NAMES.CLICK_SAVED_BOOKMARK)}
              >
                <Title order={4} lineClamp={1}>
                  {bookmark.package.name}
                </Title>
              </Anchor>
              <CloseButton
                onClick={() => {
                  track(EVENT_NAMES.UNBOOKMARK, {
                    value: bookmark.key,
                  });
                  removeBookmark(bookmark.key);
                }}
              />
            </Group>
            <Text mb={2} fz="xs" c="dimmed">
              {bookmark.package.version}
            </Text>
            <Text mb={2} fz="xs">
              {bookmark.package.description}
            </Text>
          </Paper>
        ))}
      </Box>
    </Drawer>
  );
};

export default Bookmarks;
