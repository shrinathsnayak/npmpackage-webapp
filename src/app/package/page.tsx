import type { Metadata } from "next";
import { Title } from "@mantine/core";

export const metadata: Metadata = {
  title: "Package",
};

export default function Home() {
  return <Title>Nice Try Page</Title>;
}
