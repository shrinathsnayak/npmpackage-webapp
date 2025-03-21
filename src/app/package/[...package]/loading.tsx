"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Center, Container, Loader, Text, Flex } from "@mantine/core";
import { useTimeout, useWindowScroll } from "@mantine/hooks";
import { genereatePackageName } from "@/constants/services.constants";
import Conditional from "@/components/shared/Conditional";

export default function Loading() {
  const params: any = useParams();
  const t = useTranslations("loading");
  const [_, scrollTo] = useWindowScroll();
  const [showRefresh, setShowRefresh] = useState(false);
  const { clear, start } = useTimeout(() => setShowRefresh(true), 5000);
  const packageName = genereatePackageName(params.package);

  useEffect(() => {
    start();
    scrollTo({ y: 0 });
    return () => clear();
  }, [clear, scrollTo, start]);

  return (
    <Center mih="calc(100vh - 65px)">
      <Container size="xs" ta="center">
        <Flex mb={10} gap={15} align="center" direction="column">
          <Loader color="red.8" size="xl" type="dots" />
          <Text c="red.8" fz="lg" fw="bold" display="block">
            {t("title", { packageName: packageName })}
          </Text>
          <Conditional if={showRefresh}>
            <Text c="gray" fz="sm" display="block">
              {t("description")}
            </Text>
          </Conditional>
        </Flex>
      </Container>
    </Center>
  );
}
