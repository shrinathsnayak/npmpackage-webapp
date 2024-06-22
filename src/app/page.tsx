import { Center, Container, Image, Title, Text } from "@mantine/core";
import PageLayout from "@/components/PageLayout";
import { NPMPACKAGE_TITLE } from "@/constants";
import SearchBar from "@/components/Landing/LandingSearch";

export default function Home() {
  return (
    <PageLayout hideSearch={true}>
      <Center mah="calc(100vh - 65px)" mih="calc(100vh - 65px)" w="100%">
        <Container
          ta="center"
          w={{ base: "100%", sm: "50%" }}
          mt={{ base: "-20%", sm: 0 }}
        >
          <Title>{NPMPACKAGE_TITLE}</Title>
          <SearchBar />
        </Container>
      </Center>
    </PageLayout>
  );
}
