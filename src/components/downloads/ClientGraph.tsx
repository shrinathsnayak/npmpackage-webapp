"use client";
import React from "react";
import { Container } from "@mantine/core";
import Downloads from "../shared/Downloads";

export default function ClientGraphContainer({ downloads }: any) {
  return (
    <Container className="responsiveContainer" mt={-50}>
      <Downloads downloads={downloads} />
    </Container>
  );
}
