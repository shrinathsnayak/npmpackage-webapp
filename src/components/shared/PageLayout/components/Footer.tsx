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
            <Text fz="sm" c="white" fw={500}>
              Made in{" "}
            </Text>
            <Image
              src={IndiaFlag.src}
              w={20}
              h={13}
              alt="India Flag"
              style={{
                display: "inline",
              }}
            />{" "}
            <Text fz="sm" c="white" fw={500}>
              by{" "}
            </Text>
            <Anchor
              fz="sm"
              component={Link}
              href="https://snayak.dev"
              target="blank"
              underline="never"
              prefetch
              fw={500}
              c="blue.4"
            >
              Shrinath Nayak
            </Anchor>
          </Flex>

          <Text
            fw={500}
            fz="xs"
            c="dimmed"
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
