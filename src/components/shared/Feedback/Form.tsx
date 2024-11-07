"use client";

import { useState } from "react";
import { ActionIcon, Button, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SCORE_VALUES } from "./constants";

const Form = ({ formSubmit }: any) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      message: "",
      score: null,
      url: window.location.href,
    },
    validate: {
      message: (value: string) =>
        value.trim().length === 0
          ? "Please enter a feedback message."
          : value.length < 5
            ? "Message is too short. Please enter at least 5 characters."
            : null,
    },
  });

  const handleFormSubmit = (values: any) => {
    if (!loading) {
      setLoading(true);
      formSubmit(values);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
      <Flex direction="column" gap={20}>
        <Flex align="center" gap={15}>
          {SCORE_VALUES.map((item: any) => (
            <ActionIcon
              key={item.value}
              color="red.8"
              size="xl"
              onClick={() => form.setFieldValue("score", item.value)}
              variant={form.values.score === item.value ? "filled" : "outline"}
            >
              {item.label}
            </ActionIcon>
          ))}
        </Flex>
        <Textarea
          autosize
          autoFocus
          minRows={3}
          label="Message"
          placeholder="Enter feedback message"
          {...form.getInputProps("message")}
        />
        <Button type="submit" fullWidth color="red.8">
          {loading ? "Submitting" : "Submit"} Feedback
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
