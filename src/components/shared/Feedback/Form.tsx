"use client";

import { useState } from "react";
import {
  ActionIcon,
  Button,
  Flex,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { SCORE_VALUES } from "./constants";

const Form = ({ formSubmit }: any) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      message: "",
      score: null,
      email: null,
      url: window.location.href,
    },
    validate: {
      email: (value: string) =>
        !value
          ? null
          : /^\S+@\S+$/.test(value?.trim())
          ? null
          : "Invalid email",
      message: (value: string) =>
        value.trim().length === 0
          ? "Please enter a feedback message."
          : value.length < 5
          ? "Message is too short. Please enter at least 5 characters."
          : null,
    },
    transformValues(values: any) {
      return {
        ...values,
        message: values.message?.trim(),
        email: values.email?.trim() || null,
      };
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
      <Flex direction="column" gap={20} p={3}>
        <div>
          <Text fz="sm" fw="400" mb={10}>
            How would you rate this tool?
          </Text>
          <Flex align="center" gap={10}>
            {SCORE_VALUES.map((item: any) => (
              <ActionIcon
                key={item.value}
                color="red.8"
                size="xl"
                onClick={() => form.setFieldValue("score", item.value)}
                variant={
                  form.values.score === item.value ? "filled" : "outline"
                }
              >
                {item.label}
              </ActionIcon>
            ))}
          </Flex>
        </div>
        <Textarea
          autosize
          size="md"
          minRows={5}
          maxRows={10}
          // label="Message"
          placeholder="Enter feedback message"
          {...form.getInputProps("message")}
        />
        {/* <TextInput
          size="md"
          type="email"
          label="Email Address (Optional)"
          description="Your email may be used to contact you for clarification if needed."
          placeholder="Enter your email address (Optional)"
          inputWrapperOrder={["label", "input", "description", "error"]}
          {...form.getInputProps("email")}
        /> */}
        <Button type="submit" fullWidth color="red.8" size="md">
          {loading ? "Submitting" : "Submit"} Feedback
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
