import { Anchor, AppShell } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Footer = ({ fixedFooter }: boolean | any) => {
  return (
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
  );
};

export default Footer;
