"use client";
import Link from "next/link";
import {
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  Image,
  Title,
  Flex,
  Anchor,
  Button,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Search } from "@/components/Search";
import classes from "./Layout.module.css";
import Icon from "@/assets/logos/icon.svg";
import { NPMPACKAGE_TITLE } from "@/constants";
import { Suspense } from "react";

const PageLayout = ({
  children,
  hideLayout,
  disableSpotlight = false,
}: any) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      disabled={hideLayout}
    >
      <AppShell.Header>
        <Group
          h="100%"
          px={{ base: "md", sm: "xl" }}
          justify="space-between"
          align="center"
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            mr={10}
          />
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
                <Title
                  display={{ base: "none", sm: "block" }}
                  order={3}
                  c="white"
                >
                  {NPMPACKAGE_TITLE}
                </Title>
              </Flex>
            </Anchor>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control} disabled>
                Package
              </UnstyledButton>
              <UnstyledButton className={classes.control} disabled>
                Downloads
              </UnstyledButton>
              <UnstyledButton className={classes.control} disabled>
                Compare
              </UnstyledButton>
              <UnstyledButton className={classes.control} disabled>
                About
              </UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>
        {!disableSpotlight && (
          <Suspense fallback={<>loading...</>}>
            <Search />
          </Suspense>
        )}
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default PageLayout;
