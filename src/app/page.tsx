import { Center, Title, Text, rem, Flex } from "@mantine/core";
import PageLayout from "@/components/shared/PageLayout";
import { NPMPACKAGE_TITLE } from "@/constants";
import SearchBar from "@/components/Landing/LandingSearch";
import PopularPackages from "@/components/Landing/PopularPackages";
import ProductHuntLaunch from "@/components/shared/ProductHuntLaunch";

export default function Home() {
  return (
    <PageLayout hideHeader={true} fixedFooter={true} bg="dark.9">
      <Center mah="calc(80vh - 65px)" mih="calc(80vh - 65px)" w="100%">
        <Flex
          direction="column"
          align="center"
          w={{ base: "90%", sm: "50%" }}
          mt={{ base: "-10%", sm: 0 }}
        >
          <ProductHuntLaunch />
          <Title size={rem(35)} c="white">
            {NPMPACKAGE_TITLE}
          </Title>
          <Text mt={10} c="gray.4" fz="sm" ta="center">
            Discover detailed information about npm packages.
          </Text>
          <SearchBar />
          <PopularPackages />
        </Flex>
      </Center>
    </PageLayout>
  );
}
