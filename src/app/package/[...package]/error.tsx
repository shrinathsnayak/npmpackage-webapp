"use client";

import NextImage from "next/image";
import { useEffect } from "react";
import { Box, Center, Image, Paper, Text } from "@mantine/core";
import ErrorImage from "@/assets/error.webp";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Center mih="100vh">
      <Paper ta="center">
        <Center mb={20}>
          <Image
            w="150"
            h="150"
            radius="md"
            src={ErrorImage.src}
            alt="Something went wrong!"
          />
        </Center>
        <Text>
          Oops! Our website is taking a breather. Hang tight while we fix things
          up!
        </Text>
      </Paper>
    </Center>
  );
}
