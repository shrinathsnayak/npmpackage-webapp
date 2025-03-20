"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, Center, Container, Image, Paper, Title } from "@mantine/core";
import { genereatePackageName } from "@/constants/services.constants";
import { saveErrors } from "@/services/supbase";
import { isDevelopment } from "@/utils";
import ErrorImage from "@/assets/error.webp";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  params?: any;
}) {
  const params: any = useParams();
  const packageName = genereatePackageName(params.package);

  useEffect(() => {
    if (error && packageName && !isDevelopment) {
      (async function () {
        const errorObj: any = {
          url: window.location.href,
          error_message: error?.message,
          package_id: packageName,
        };
        await saveErrors(errorObj);
      })();
    }
  }, [error, packageName]);

  return (
    <Center mih="calc(100vh - 65px)">
      <Paper ta="center" bg="dark.9">
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
          <Button
            onClick={() => {
              window.location.reload();
              reset();
            }}
            color="red.8"
            mt={20}
          >
            Reload the page
          </Button>
        </Container>
      </Paper>
    </Center>
  );
}
