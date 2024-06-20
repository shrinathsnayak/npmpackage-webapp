import { Center, Container } from "@mantine/core";
import { generateRandomNPMFact } from "@/utils";

export default function Loading() {
  return (
    <Center mih="100vh">
      <Container size="xs" ta="center">
        {generateRandomNPMFact()}
      </Container>
    </Center>
  );
}
