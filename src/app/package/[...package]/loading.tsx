'use client';

import { useParams } from 'next/navigation';
import { Center, Container, Loader, Text, Flex, Blockquote, Code } from "@mantine/core";
import { generateRandomNPMFact } from "@/utils";
import { IconInfoSquareRounded } from "@tabler/icons-react";
import { genereatePackageName } from '@/constants/services.constants';

export default function Loading() {
  const params: any = useParams();
  const packageName = genereatePackageName(params.package);

  return (
    <Center mih="calc(100vh - 65px)">
      <Container size="xs" ta="center">
        <Flex mb={10} gap={15} align="center" direction="column">
          <Loader color="red.8" size="xl" type="dots" />
          <Text c="red.8" fz="md" fw="bold" display="block">
            Gathering detailed insights and metrics for {packageName}
          </Text>
          <Blockquote color="red" icon={<IconInfoSquareRounded />} mt="xl">
            {generateRandomNPMFact()}
          </Blockquote>
        </Flex>
      </Container>
    </Center>
  );
}