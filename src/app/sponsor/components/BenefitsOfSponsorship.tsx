"use client";

import { List, Title } from "@mantine/core";

const BenefitsOfSponsorship = () => {
  return (
    <>
      <Title order={3} c="white" my={30} mb={13}>
        Benefits for Sponsors
      </Title>
      <List type="unordered" size="md" c="white" maw="95%">
        <List.Item>
          Brand Recognition: Showcase your company to a global audience of
          developers.
        </List.Item>

        <List.Item mt={10}>
          Developer Loyalty: Position your brand as a key contributor to
          open-source innovation.
        </List.Item>

        <List.Item mt={10}>
          Customized Exposure: Tailored sponsorship packages to align with your
          marketing goals.
        </List.Item>
      </List>
    </>
  );
};

export default BenefitsOfSponsorship;
