"use client";

import React, { useMemo, useState } from "react";
import { Box, Group, List, Text, Accordion, Title } from "@mantine/core";
import { getScoreTextColor } from "@/utils";

function AccordionLabel({ score, name, description }: any) {
  return (
    <Group wrap="nowrap" gap={10}>
      <Box miw={50} w={50}>
        <Title order={1} c={getScoreTextColor(score)} ta="center">
          {score}
        </Title>
      </Box>
      <div>
        <Text fz="md" fw="bold" c="white">
          {name}
        </Text>
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      </div>
    </Group>
  );
}

function AccordionContent({ reason, details }: any) {
  return (
    <div>
      <Box my={10} mb={15}>
        <Text size="sm" c="dimmed" fw={400} mb={5}>
          Reason
        </Text>
        <Text size="sm" fw={400}>
          {reason}
        </Text>
      </Box>
      {details && (
        <Box my={10}>
          <Text size="sm" c="dimmed" fw={400} mb={5}>
            Details
          </Text>
          <List size="sm" spacing="xs">
            {details?.map((item: any) => (
              <List.Item my={2} key={item}>
                {item}
              </List.Item>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
}

const SecurityAccordin = ({ checks = [] }: any) => {
  const [value, setValue] = useState<string[]>([]);
  const items = useMemo(() => {
    return checks?.map((item: any) => (
      <Accordion.Item value={item.name} key={item.name}>
        <Accordion.Control>
          <AccordionLabel {...item} />
        </Accordion.Control>
        <Accordion.Panel>
          <AccordionContent {...item} />
        </Accordion.Panel>
      </Accordion.Item>
    ));
  }, [checks]);

  return (
    <Box w="100%">
      <Accordion
        multiple
        value={value}
        variant="contained"
        onChange={setValue}
        chevronPosition="right"
        bg="dark.9"
        radius="md"
        style={{ overflow: "hidden", borderRadius: "0.5rem" }}
      >
        {items}
      </Accordion>
    </Box>
  );
};

export default SecurityAccordin;
