"use client";

import {
  Box,
  Paper,
  Drawer,
  Group,
  Title,
  Text,
  CloseButton,
} from "@mantine/core";
import { useBookmark } from "./useBookmark";

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
      title="Bookmarks"
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
              <Title order={4} lineClamp={1}>
                {bookmark.package.name}
              </Title>
              <CloseButton onClick={() => removeBookmark(bookmark.key)} />
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
