"use client";

import { List, Text, Title } from "@mantine/core";

const Why = () => {
  return (
    <>
      <Title order={3} c="white" my={30} mb={13}>
        Why Sponsor Us?
      </Title>
      <List type="ordered" size="md" maw="95%">
        <List.Item>
          <Text c="white" fw={700} size="md" mb={5}>
            Support the Developer Ecosystem
          </Text>
          <Text c="gray.5" size="md" mb={5}>
            Your sponsorship directly impacts the lives of developers by
            enhancing their workflows, saving time, and promoting better package
            management practices.
          </Text>
        </List.Item>

        <List.Item mt={10}>
          <Text c="white" fw={700} size="md" mb={5}>
            High Visibility Among Developers
          </Text>
          <Text c="gray.5" size="md" mb={5}>
            npmpackage.info is featured in JavaScript Weekly and attracts
            thousands of developers each month. Your brand will be seen by
            engaged, tech-savvy users in the open-source and web development
            communities.
          </Text>
        </List.Item>

        <List.Item mt={10}>
          <Text c="white" fw={700} size="md" mb={5}>
            Continuous Innovation
          </Text>
          <Text c="gray.5" size="md" mb={5}>
            Sponsorship will help us expand features like advanced analytics,
            real-time monitoring, and new developer tools that enhance package
            discovery and management.
          </Text>
        </List.Item>
      </List>
    </>
  );
};

export default Why;
