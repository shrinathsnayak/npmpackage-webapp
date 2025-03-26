import { rem, UnstyledButton, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBookmarkFilled } from "@tabler/icons-react";
import { useBookmark } from "./useBookmark";
import { EVENT_NAMES, track } from "@/utils/gaEvents";
import Bookmarks from "./Bookmarks";
import classes from "../PageLayout/Layout.module.css";

const Bookmark = () => {
  const { value } = useBookmark();
  const [opened, handlers] = useDisclosure(false);

  return (
    <>
      <Indicator
        inline
        size={16}
        color="red.8"
        label={value.length}
        disabled={value.length <= 0}
      >
        <UnstyledButton
          onClick={() => {
            track(EVENT_NAMES.VIEW_BOOKMARK);
            handlers.open();
          }}
          className={classes.mobilecontrol}
        >
          <IconBookmarkFilled
            stroke={2}
            fill="var(--mantine-color-red-8)"
            style={{ width: rem(25), height: rem(25) }}
          />
        </UnstyledButton>
      </Indicator>
      <Bookmarks opened={opened} onClose={() => handlers.close()} />
    </>
  );
};

export default Bookmark;
