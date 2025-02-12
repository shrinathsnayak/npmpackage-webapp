import React from "react";
import { useTranslations } from "next-intl";
import { AppShell, Container, Flex, Text } from "@mantine/core";
import { DEFAULT_CACHE_HOUR } from "@/constants";
import LocaleSwitcher from "@/components/shared/LocaleSwitcher";

const Footer = ({ fixedFooter }: boolean | any) => {
  const t = useTranslations();
  return (
    <AppShell.Footer
      fz="sm"
      bg="dark.7"
      withBorder
      p={{ base: "sm", sm: "sm" }}
      pos={fixedFooter ? "fixed" : "static"}
    >
      <Container size="lg" className="responsiveContainer">
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
        >
          <LocaleSwitcher />
          <Text
            fz="xs"
            fw={400}
            maw={500}
            c="dark.0"
            pl={{ base: 5, sm: 0 }}
            mt={{ base: 10, sm: 0 }}
            ta={{ base: "center", sm: "left" }}
          >
            <b>{t("disclaimer")}:</b>{" "}
            {t("disclaimer_text", { hour: DEFAULT_CACHE_HOUR })}
          </Text>
        </Flex>
      </Container>
    </AppShell.Footer>
  );
};

export default Footer;
