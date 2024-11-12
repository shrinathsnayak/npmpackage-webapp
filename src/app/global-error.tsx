"use client";

import { useEffect } from "react";
import {
  Button,
  Center,
  Container,
  Image,
  MantineProvider,
  Paper,
  Title,
} from "@mantine/core";
import ErrorImage from "@/assets/error.webp";
import theme from "./theme";

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
    <MantineProvider
      theme={theme}
      forceColorScheme="dark"
      defaultColorScheme="dark"
    >
      <Center mih="calc(100vh - 65px)">
        <Paper ta="center">
          <Center mb={30}>
            <Image
              w="200"
              h="200"
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
            <Button mt={10} onClick={() => reset()}>
              Try again
            </Button>
          </Container>
        </Paper>
      </Center>
    </MantineProvider>
  );
}
