import React from "react";
import { useTranslations } from "next-intl";
import { AppShell, Container, Flex, Text } from "@mantine/core";
import { DEFAULT_CACHE_HOUR } from "@/constants";
import LocaleSwitcher from "@/components/shared/LocaleSwitcher";
import Signature from "@/components/shared/Signature";
import classes from "../Layout.module.css";

const Footer = ({ fixedFooter }: boolean | any) => {
  const t = useTranslations();
  return (
    <AppShell.Footer
      fz="sm"
      bg="dark.9"
      pos={fixedFooter ? "fixed" : "static"}
      className={classes.footerBorder}
    >
      <Container size="lg" className={classes.borderX}>
        <Flex
          px={0}
          justify="space-between"
          p={{ base: "sm", sm: "sm" }}
          gap={{ base: "lg", sm: "xl" }}
          align={{ base: "center", sm: "flex-start" }}
          direction={{ base: "column-reverse", sm: "row" }}
        >
          <Signature />
          <LocaleSwitcher />
        </Flex>
      </Container>
      <Container
        size="lg"
        p="sm"
        className={`${classes.borderX} ${classes.footerBorder}`}
      >
        <Text fz="xs" fw={400} c="white" ta="center" opacity={1}>
          <b>{t("disclaimer")}:</b>{" "}
          {t("disclaimer_text", { hour: DEFAULT_CACHE_HOUR })}
        </Text>
      </Container>
    </AppShell.Footer>
  );
};

export default Footer;
