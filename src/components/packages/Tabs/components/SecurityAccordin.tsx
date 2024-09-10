"use client";

import React, { useMemo, useState, useCallback } from "react";
import { Box, Group, List, Text, Accordion, Title } from "@mantine/core";
import { getScoreTextColor } from "@/utils";

const AccordionLabel = React.memo(({ score, name, description }: any) => {
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
});

AccordionLabel.displayName = "AccordionLabel";

const AccordionContent = React.memo(({ reason, details }: any) => {
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
});

AccordionContent.displayName = "AccordionContent";

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

  const accordinStyles = useMemo(
    () => ({
      overflow: "hidden",
      borderRadius: "0.5rem",
    }),
    []
  );

  const handleAccordionChange = useCallback((newValue: string[]) => {
    setValue(newValue);
  }, []);

  return (
    <Box w="100%">
      <Accordion
        multiple
        value={value}
        variant="contained"
        onChange={handleAccordionChange}
        chevronPosition="right"
        bg="dark.9"
        radius="md"
        style={accordinStyles}
      >
        {items}
      </Accordion>
    </Box>
  );
};

SecurityAccordin.displayName = "SecurityAccordin";

export default SecurityAccordin;
