import type { Metadata } from "next";
import { Box, Container, Title, Text } from "@mantine/core";
import Why from "./components/Why";
import SponsorTypes from "./components/SponsorTypes";
import BenefitsOfSponsorship from "./components/BenefitsOfSponsorship";
import HowSponsorshipHelps from "./components/HowSponsorshipHelps";

export const metadata: Metadata = {
  title: "Sponsor",
  description: "Sponsorship opportunity is now available for npmpackage.info.",
};

export default async function Sponsor() {
  return (
    <Box pb={20}>
      <Box w="100%" bg="dark.9">
        <Container size="lg" className="responsiveContainer" py={40}>
          <Title order={1} fw={800} mb={20} c="white">
            Become a Sponsor
          </Title>
          <Text size="md" c="white">
            Sponsorship opportunity is now available for npmpackage.info.
          </Text>
        </Container>
      </Box>
      <Container size="lg" className="responsiveContainer" py={20}>
        <Text c="white" size="md">
          Welcome to npmpackage.info, a powerful tool built for developers to
          gain actionable insights into npm packages. Our platform provides
          critical data on package downloads, bundle size, dependency health,
          OpenSSF scores, GitHub metrics, TypeScript compatibility, and much
          more—all in one place.
        </Text>
        <Why />
        <SponsorTypes />
        <BenefitsOfSponsorship />
        <HowSponsorshipHelps />

        <Box>
          <Title order={3} c="white" my={30} mb={13}>
            Get In Touch
          </Title>
          <Text c="white" size="md">
            If you are interested in sponsoring npmpackage.info, please reach
            out to us at{" "}
            <a href="mailto:sponsor@npmpackage.info">sponsor@npmpackage.info</a>
          </Text>
          <Text c="white" size="md" mt={10}>
            Let’s collaborate to build the future of npm package insights.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
