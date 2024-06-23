import { ActionIcon, Group } from "@mantine/core";
import { IconBrandGithub, IconBrandNpm, IconWorld } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import Conditional from "../shared/Conditional";

export const LinksContainer = ({ homePage, github, npm }: any) => {
  return (
    <Group gap={10} mt={10} mb={{ base: 5, sm: 0 }}>
      <Conditional if={homePage}>
        <ActionIcon
          variant="light"
          color="gray"
          component={Link}
          href={homePage}
        >
          <IconWorld size={16} />
        </ActionIcon>
      </Conditional>

      <Conditional if={github}>
        <ActionIcon variant="light" color="gray" component={Link} href={github}>
          <IconBrandGithub size={16} />
        </ActionIcon>
      </Conditional>

      <Conditional if={npm}>
        <ActionIcon variant="light" color="gray" component={Link} href={npm}>
          <IconBrandNpm size={16} />
        </ActionIcon>
      </Conditional>
    </Group>
  );
};
