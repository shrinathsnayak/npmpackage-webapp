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
import { IconSearch } from "@tabler/icons-react";
import { NPMPACKAGE_TITLE } from "@/constants";
import { searchHandlers } from "@/components/shared/Search";
import Icon from "@/assets/logos/icon.png";
import classes from "../Layout.module.css";

const Header = ({ hideSearch }: any) => {
  return (
    <AppShell.Header>
      <Group
        h="100%"
        px={{ base: "md", sm: "xl" }}
        justify="space-between"
        align="center"
      >
        <Group
          justify="space-between"
          align="center"
          style={{ flex: 1 }}
          py="xs"
        >
          <Anchor component={Link} href="/" underline="never" prefetch>
            <Flex gap={6} justify="space-between" align="center">
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
          {/* <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control} disabled>
                Downloads
              </UnstyledButton>
              <UnstyledButton className={classes.control} disabled>
                Compare
              </UnstyledButton>
              <UnstyledButton className={classes.control} disabled>
                About
              </UnstyledButton>
            </Group> */}
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default Header;
