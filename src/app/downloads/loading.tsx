import { Center, Container } from "@mantine/core";
import { generateRandomNPMFact } from "@/utils";

export default function Loading() {
  return (
    <Center mih="calc(100vh - 65px)">
      <Container size="xs" ta="center">
        {generateRandomNPMFact()}
      </Container>
    </Center>
  );
}
