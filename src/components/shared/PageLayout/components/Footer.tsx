import React from "react";
import Link from "next/link";
import { Anchor, AppShell, Container, Flex, Image, Text } from "@mantine/core";
import IndiaFlag from "@/assets/india-flag.svg";

const Footer = ({ fixedFooter }: boolean | any) => {
  return (
    <AppShell.Footer
      fz="sm"
      bg="dark.7"
      withBorder={false}
      p={{ base: "sm", sm: "lg" }}
      pos={fixedFooter ? "fixed" : "static"}
    >
      <Container className="responsiveContainer">
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
        >
          <Flex gap={5} align="center">
            <Text fz="xs" c="white" fw={400}>
              Made in{" "}
            </Text>
            <Image
              src={IndiaFlag.src}
              w={20}
              h={11}
              alt="India Flag"
            />{" "}
            <Text fz="xs" c="white" fw={400}>
              by{" "}
            </Text>
            <Anchor
              fz="xs"
              component={Link}
              href="https://snayak.dev"
              target="blank"
              underline="never"
              prefetch
              fw={400}
              c="blue.4"
            >
              Shrinath Nayak
            </Anchor>
          </Flex>

          <Text
            fw={400}
            fz="xs"
            c="dark.0"
            ta="center"
            mt={{ base: 10, sm: 0 }}
          >
            We do not own or store any data displayed on the website.
          </Text>
        </Flex>
      </Container>
    </AppShell.Footer>
  );
};

export default Footer;
