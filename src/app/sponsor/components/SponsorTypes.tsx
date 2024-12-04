"use client";

import { List, Text, Title } from "@mantine/core";

const SponsorTypes = () => {
  return (
    <>
      <Title order={3} c="white" my={30} mb={13}>
        Sponsorship Opportunities
      </Title>
      <List type="ordered" size="md" maw="95%">
        <List.Item>
          <Text c="white" fw={700} size="md" mb={5}>
            Main Sponsor
          </Text>
          <Text c="gray.5" size="md" mb={5}>
            Feature your logo prominently on the homepage with a direct link to
            your website. Gain exclusive mentions in our product updates and
            newsletters.
          </Text>
        </List.Item>

        <List.Item mt={10}>
          <Text c="white" fw={700} size="md" mb={5}>
            Feature Sponsor
          </Text>
          <Text c="gray.5" size="md" mb={5}>
            Support the development of specific features, such as download
            trends, vulnerability tracking, or code quality analysis. Your brand
            will be showcased on relevant sections.
          </Text>
        </List.Item>

        <List.Item mt={10}>
          <Text c="white" fw={700} size="md" mb={5}>
            Community Supporter
          </Text>
          <Text c="gray.5" size="md" mb={5}>
            Become a general sponsor and get recognized in the footer of every
            page. Help us keep the platform accessible to all developers.
          </Text>
        </List.Item>
      </List>
    </>
  );
};

export default SponsorTypes;
