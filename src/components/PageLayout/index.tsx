"use client";
import Link from "next/link";
import { Suspense } from "react";
import {
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  Image,
  Title,
  Flex,
  Anchor,
  Text,
  rem,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Search, searchHandlers } from "@/components/shared/Search";
import classes from "./Layout.module.css";
import Icon from "@/assets/logos/icon.png";
import { NPMPACKAGE_TITLE } from "@/constants";

const PageLayout = ({
  children,
  hideLayout,
  hideSearch = false,
  disableSpotlight = false,
  hideHeader = false,
  fixedFooter = false,
}: any) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 65 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      disabled={hideLayout}
    >
      {!hideHeader && (
        <AppShell.Header>
          <Group
            h="100%"
            px={{ base: "md", sm: "xl" }}
            justify="space-between"
            align="center"
          >
            {/* <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              mr={10}
            /> */}
            <Group
              justify="space-between"
              align="center"
              style={{ flex: 1 }}
              py="xs"
            >
              <Anchor component={Link} href="/" underline="never">
                <Flex gap={6} justify="space-between" align="center">
                  <Image
                    src={Icon.src}
                    alt="npmpackage.info logo"
                    w={30}
                    h={30}
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
      )}
      {/* <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Downloads</UnstyledButton>
        <UnstyledButton className={classes.control}>Compare</UnstyledButton>
        <UnstyledButton className={classes.control}>About</UnstyledButton>
      </AppShell.Navbar> */}

      <AppShell.Main bg="dark.7">
        {!disableSpotlight && (
          <Suspense fallback={<>loading...</>}>
            <Search />
          </Suspense>
        )}
        {children}
      </AppShell.Main>
      <AppShell.Footer
        fz="sm"
        ta="center"
        bg="dark.9"
        withBorder
        pos={fixedFooter ? "fixed" : "static"}
        p={{ base: "md", sm: "lg" }}
      >
        This is a weekend project by{" "}
        <Anchor
          fz="sm"
          component={Link}
          href="https://snayak.dev"
          target="blank"
          underline="never"
        >
          Shrinath Nayak
        </Anchor>{" "}
        and is currently under development.
      </AppShell.Footer>
    </AppShell>
  );
};

export default PageLayout;
