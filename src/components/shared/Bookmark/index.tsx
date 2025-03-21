import { rem, UnstyledButton, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBookmarkFilled } from "@tabler/icons-react";
import { useBookmark } from "./useBookmark";
import classes from "../PageLayout/Layout.module.css";
import Bookmarks from "./Bookmarks";

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
          onClick={() => handlers.open()}
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
