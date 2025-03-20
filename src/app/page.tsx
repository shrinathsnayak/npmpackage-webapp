import { Center, Title, Container, rem, Flex } from "@mantine/core";
import PageLayout from "@/components/shared/PageLayout";
import SearchBar from "@/components/Landing/LandingSearch";
import PopularPackages from "@/components/Landing/PopularPackages";
import ProductHuntLaunch from "@/components/shared/ProductHuntLaunch";
import Conditional from "@/components/shared/Conditional";
import { NPMPACKAGE_TITLE } from "@/constants";
import { getPopularPackages } from "@/services/supbase";
import classes from "@/components/shared/PageLayout/Layout.module.css";

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
      <Container size="lg" className={classes.borderX}>
        <Center mah="calc(80vh)" mih="calc(80vh)" w="100%">
          <Flex align="center" direction="column">
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
      </Container>
    </PageLayout>
  );
}
