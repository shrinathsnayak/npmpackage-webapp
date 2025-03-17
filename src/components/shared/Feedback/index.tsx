"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ActionIcon, Affix, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMessageDots } from "@tabler/icons-react";
import { saveFeedback } from "@/services/supbase";
import Form from "./Form";
import Success from "./Success";

const Feedback = () => {
  const t = useTranslations("feedback");
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
      <Affix position={{ bottom: 20, left: 20 }} withinPortal={true}>
        <Button
          radius="xl"
          color="red.8"
          visibleFrom="md"
          onClick={() => handlers.open()}
          leftSection={<IconMessageDots size={16} />}
        >
          {t("title")}
        </Button>
        <ActionIcon
          size={55}
          radius="xl"
          color="red"
          hiddenFrom="md"
          autoContrast={true}
          onClick={() => handlers.open()}
        >
          <IconMessageDots size={25} />
        </ActionIcon>
      </Affix>
      <Modal
        centered
        size="md"
        shadow="xl"
        radius="md"
        opened={opened}
        title={t("title")}
        withinPortal={true}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 4,
        }}
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
