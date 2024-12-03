import React from "react";
import Link from "next/link";
import { Anchor, AppShell, Container, Flex, Image, Text } from "@mantine/core";
import { DEFAULT_CACHE_HOUR } from "@/constants";
import IndiaFlag from "@/assets/india-flag.svg";

const Footer = ({ fixedFooter }: boolean | any) => {
  return (
    <AppShell.Footer
      fz="sm"
      bg="dark.7"
      withBorder
      p={{ base: "sm", sm: "lg" }}
      pos={fixedFooter ? "fixed" : "static"}
    >
      <Container size="lg" className="responsiveContainer">
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
        >
          <Flex gap={5} align="center">
            <Text fz="xs" c="white" fw={400}>
              Made in{" "}
            </Text>
            <Image src={IndiaFlag.src} w={20} h={11} alt="India Flag" />{" "}
            <Text fz="xs" c="white" fw={400}>
              by{" "}
            </Text>
            <Anchor
              fz="xs"
              component={Link}
              href="https://snayak.dev"
              target="blank"
              underline="never"
              fw={400}
              c="blue.4"
            >
              Shrinath Nayak
            </Anchor>
          </Flex>
          <Text
            fz="xs"
            fw={400}
            maw={500}
            c="dark.0"
            pl={{ base: 5, sm: 0 }}
            mt={{ base: 10, sm: 0 }}
            ta={{ base: "center", sm: "left" }}
          >
            <b>Disclaimer:</b> We do not own or store the data displayed on this
            website. Data is cached for up to {DEFAULT_CACHE_HOUR} hours to
            improve performance.
          </Text>
        </Flex>
      </Container>
    </AppShell.Footer>
  );
};

export default Footer;
