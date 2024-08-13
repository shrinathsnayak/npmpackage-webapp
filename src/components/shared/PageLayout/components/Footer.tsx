import React from "react";
import Link from "next/link";
import { Anchor, AppShell, Container, Flex, Image, Text } from "@mantine/core";
import IndiaFlag from "@/assets/india-flag.svg";

const Footer = ({ fixedFooter }: boolean | any) => {
  return (
    <AppShell.Footer
      fz="sm"
      bg="dark.7"
      withBorder
      pos={fixedFooter ? "fixed" : "static"}
      p={{ base: "md", sm: "lg" }}
    >
      <Container className="responsiveContainer">
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
        >
          <Text fz="sm" c="white" fw={300}>
            Project by{" "}
            <Anchor
              fz="sm"
              component={Link}
              href="https://snayak.dev"
              target="blank"
              underline="never"
              prefetch
            >
              Shrinath Nayak
            </Anchor>{" "}
          </Text>
          <Text fw={500} fz="xs" c="white" ta="center" mt={{ base: 10, sm: 0 }}>
            We do not own or store any data displayed on the website.
          </Text>
        </Flex>
      </Container>
    </AppShell.Footer>
  );
};

export default Footer;
