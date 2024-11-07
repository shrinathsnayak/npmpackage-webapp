"use client";

import { useState } from "react";
import { ActionIcon, Affix, Button, Flex, Kbd, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMessageDots } from "@tabler/icons-react";
import { saveFeedback } from "@/services/feedback";
import Form from "./Form";
import Success from "./Success";

const Feedback = () => {
  const [opened, handlers] = useDisclosure(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormSubmit = async (value: any) => {
    const data = await saveFeedback(value);
    if (data) {
      setShowSuccess(true);
    }
  };

  return (
    <div>
      <Affix position={{ bottom: 20, right: 20 }} withinPortal={true}>
        <Button
          radius="xl"
          visibleFrom="md"
          variant="default"
          onClick={() => handlers.open()}
          leftSection={<IconMessageDots size={16} />}
        >
          Feedback
        </Button>
        <ActionIcon
          size="xl"
          radius="xl"
          hiddenFrom="md"
          variant="default"
          autoContrast={true}
          onClick={() => handlers.open()}
        >
          <IconMessageDots size={20} />
        </ActionIcon>
      </Affix>
      <Modal
        centered
        size="md"
        opened={opened}
        title="Feedback"
        withinPortal={true}
        radius="md"
        onClose={() => {
          handlers.close();
          setShowSuccess(false);
        }}
        removeScrollProps={{ allowPinchZoom: true }}
      >
        {showSuccess ? <Success /> : <Form formSubmit={handleFormSubmit} />}
      </Modal>
    </div>
  );
};

export default Feedback;
