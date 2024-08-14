import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  Anchor,
  AppShell,
  Flex,
  Group,
  Image,
  rem,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconSearch, IconDownload } from "@tabler/icons-react";
import { NPMPACKAGE_TITLE } from "@/constants";
import { searchHandlers } from "@/components/shared/Search";
import Icon from "@/assets/logos/icon.png";
import classes from "../Layout.module.css";

const Header = ({ hideSearch }: any) => {
  return (
    <AppShell.Header>
      <Group
        h="100%"
        px={{ base: "xs", sm: 100 }}
        justify="space-between"
        align="center"
      >
        <Group
          justify="space-between"
          align="center"
          style={{ flex: 1 }}
          py="xs"
          gap={1}
        >
          <Anchor component={Link} href="/" underline="never" prefetch>
            <Flex gap={5} justify="space-between" align="center">
              <Image
                width={30}
                height={30}
                src={Icon.src}
                priority={true}
                component={NextImage}
                alt="npmpackage.info logo"
              />
              <Title order={3} c="white">
                {NPMPACKAGE_TITLE}
              </Title>
            </Flex>
          </Anchor>
          <Group gap={6} align="center">
            {!hideSearch && (
              <>
                <UnstyledButton
                  onClick={() => searchHandlers.open()}
                  className={classes.searchRoot}
                  data-desktop
                >
                  <Group gap="xs">
                    <IconSearch
                      style={{ width: rem(15), height: rem(15) }}
                      stroke={1.5}
                    />
                    <Text fz="sm" c="dimmed" pr={80}>
                      Search
                    </Text>
                    <Text fw={700} className={classes.shortcut}>
                      Ctrl + K
                    </Text>
                  </Group>
                </UnstyledButton>
                <UnstyledButton
                  onClick={() => searchHandlers.open()}
                  className={classes.mobilecontrol}
                  data-mobile
                >
                  <IconSearch
                    style={{ width: rem(22), height: rem(22) }}
                    stroke={2}
                  />
                </UnstyledButton>
              </>
            )}
            <UnstyledButton
              component={Link}
              href="/downloads"
              className={classes.mobilecontrol}
            >
              <IconDownload
                style={{ width: rem(22), height: rem(22) }}
                stroke={2}
              />
            </UnstyledButton>
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default Header;
