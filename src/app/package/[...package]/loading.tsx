"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Center, Container, Loader, Text, Flex } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { genereatePackageName } from "@/constants/services.constants";

export default function Loading() {
  const params: any = useParams();
  const [_, scrollTo] = useWindowScroll();
  const packageName = genereatePackageName(params.package);

  useEffect(() => {
    scrollTo({ y: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center mih="calc(100vh - 65px)">
      <Container size="xs" ta="center">
        <Flex mb={10} gap={15} align="center" direction="column">
          <Loader color="red.8" size="xl" type="dots" />
          <Text c="red.8" fz="md" fw="bold" display="block">
            Gathering detailed insights and metrics for {packageName}
          </Text>
        </Flex>
      </Container>
    </Center>
  );
}
