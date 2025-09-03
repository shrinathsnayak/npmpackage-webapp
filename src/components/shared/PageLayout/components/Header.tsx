import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Anchor,
  AppShell,
  Container,
  Flex,
  Group,
  Image,
  rem,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconSearch, IconCoinFilled } from "@tabler/icons-react";
import { NPMPACKAGE_TITLE } from "@/constants";
import { searchHandlers } from "@/components/shared/Search";
import Icon from "@/assets/logos/icon.png";
import classes from "../Layout.module.css";
import Bookmark from "../../Bookmark";

const Header = ({ hideSearch }: any) => {
  const t = useTranslations();
  return (
    <AppShell.Header bg="dark.9" className={classes.headerBorder}>
      <Container size="lg" className={classes.borderX}>
        <Group h="100%" justify="space-between" align="center">
          <Group
            justify="space-between"
            align="center"
            style={{ flex: 1 }}
            py="sm"
            gap={1}
          >
            <Anchor
              prefetch
              component={Link}
              href="/"
              underline="never"
              w="min-content"
            >
              <Flex gap={5} justify="space-between" align="center">
                <Image
                  w={35}
                  h={35}
                  src={Icon.src}
                  alt="npmpackage.info logo"
                />
                <Title order={3} c="white" visibleFrom="md">
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
                    w={{ base: 200, sm: 250 }}
                  >
                    <Group gap="xs" justify="space-between">
                      <Group gap="xs">
                        <IconSearch
                          style={{ width: rem(15), height: rem(15) }}
                          stroke={2}
                        />
                        <Text fz="sm" c="dimmed">
                          {t("search")}
                        </Text>
                      </Group>
                      <Text fw={700} className={classes.shortcut}>
                        Ctrl + K
                      </Text>
                    </Group>
                  </UnstyledButton>
                </>
              )}
              {/* <UnstyledButton
                href="/sponsor"
                component={Link}
                className={classes.mobilecontrol}
              >
                <IconCoinFilled
                  stroke={2}
                  style={{ width: rem(25), height: rem(25) }}
                  fill="var(--mantine-color-red-8)"
                />
              </UnstyledButton> */}
              <Bookmark />
              {/* <UnstyledButton
              component={Link}
              href="/downloads"
              className={classes.mobilecontrol}
            >
              <IconDownload
                style={{ width: rem(22), height: rem(22) }}
                stroke={2}
              />
            </UnstyledButton> */}
            </Group>
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
};

export default Header;
