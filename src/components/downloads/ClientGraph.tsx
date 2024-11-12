"use client";
import React from "react";
import { Container } from "@mantine/core";
import Downloads from "../shared/Downloads";

export default function ClientGraphContainer({ downloads, packageName }: any) {
  return (
    <Container size="lg" className="responsiveContainer" mt={{ base: -70, sm: -100 }}>
      <Downloads
        downloads={downloads}
        showDailyDownloads={true}
        packageName={packageName}
      />
    </Container>
  );
}
