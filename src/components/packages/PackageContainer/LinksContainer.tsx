import { ActionIcon, Group } from "@mantine/core";
import { IconBrandGithub, IconBrandNpm, IconWorld } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import Conditional from "@/components/shared/Conditional";

export const LinksContainer = ({ homePage, github, npm }: any) => {
  return (
    <Group gap={15} mt={10} mb={{ base: 5, sm: 0 }}>
      <Conditional if={homePage}>
        <ActionIcon
          size="lg"
          variant="light"
          color="gray"
          component={Link}
          href={homePage}
          target="_blank"
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
        >
          <IconBrandNpm size={18} />
        </ActionIcon>
      </Conditional>
    </Group>
  );
};
