"use client";

import { List, Title } from "@mantine/core";

const HowSponsorshipHelps = () => {
  return (
    <>
      <Title order={3} c="white" my={30} mb={13}>
        How Sponsorship Helps Us
      </Title>
      <List type="unordered" size="md" c="white" maw="95%">
        <List.Item>
          Scale infrastructure for faster data fetching and better uptime.
        </List.Item>

        <List.Item mt={10}>
          Implement advanced analytics to provide deeper package insights.
        </List.Item>

        <List.Item mt={10}>
          Maintain and grow npmpackage.info as a free, open-access tool for the
          community.
        </List.Item>
      </List>
    </>
  );
};

export default HowSponsorshipHelps;
