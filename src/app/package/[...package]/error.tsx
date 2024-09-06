"use client";

import { useEffect } from "react";
import {
  Box,
  Center,
  Container,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import ErrorImage from "@/assets/error.webp";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Center mih="calc(100vh - 65px)">
      <Paper ta="center">
        <Center mb={30}>
          <Image
            w="150"
            h="150"
            radius="md"
            src={ErrorImage.src}
            alt="Something went wrong!"
          />
        </Center>
        <Container size="sm">
          <Title size="h2">
            Oops! Our website is taking a breather. Hang tight while we fix
            things up!
          </Title>
        </Container>
      </Paper>
    </Center>
  );
}
