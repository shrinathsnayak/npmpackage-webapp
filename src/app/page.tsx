import NextImage from "next/image";
import { Center, Container, Image, Title, Text } from "@mantine/core";
import PageLayout from "@/components/PageLayout";
import { NPMPACKAGE_DESCRIPTION, NPMPACKAGE_TITLE } from "@/constants";
import Favicon from "../assets/logos/icon.png";
export default function Home() {
  return (
    <PageLayout hideLayout={true} disableSpotlight={true}>
      <Center h="100vh">
        <Container ta="center" size="sm">
          <Center mb={30}>
            <Image
              ta="center"
              src={Favicon.src}
              alt={NPMPACKAGE_TITLE}
              w={100}
              h={100}
            />
          </Center>
          <Title>{NPMPACKAGE_TITLE}</Title>
          <Text my={20}>{NPMPACKAGE_DESCRIPTION}</Text>
          <Text>Stay tuned for more!</Text>
        </Container>
      </Center>
    </PageLayout>
  );
}
