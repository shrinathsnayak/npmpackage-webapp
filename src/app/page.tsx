import { Center, Title, rem, Flex } from "@mantine/core";
import PageLayout from "@/components/shared/PageLayout";
import SearchBar from "@/components/Landing/LandingSearch";
import PopularPackages from "@/components/Landing/PopularPackages";
import ProductHuntLaunch from "@/components/shared/ProductHuntLaunch";
import Conditional from "@/components/shared/Conditional";
import { NPMPACKAGE_TITLE } from "@/constants";
import { getPopularPackages } from "@/services/supbase";

export const revalidate = 60;

export default async function Home() {
  const popularPackages: any = await getPopularPackages();
  return (
    <PageLayout
      hideHeader={false}
      hideSearch={true}
      fixedFooter={true}
      bg="dark.9"
    >
      <Center mih="calc(75vh)" w="100%">
        <Flex align="center" direction="column" mt={{ base: "-25%", sm: 0 }}>
          <ProductHuntLaunch />
          <Title size={rem(35)} c="white">
            {NPMPACKAGE_TITLE}
          </Title>
          <SearchBar />
          <Conditional if={popularPackages?.length > 0}>
            <PopularPackages popularPackages={popularPackages} />
          </Conditional>
        </Flex>
      </Center>
    </PageLayout>
  );
}
