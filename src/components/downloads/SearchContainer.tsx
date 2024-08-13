"use client";

import React from "react";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Flex,
  Title,
  Text,
  Paper,
  CloseButton,
  rem,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconArrowRight } from "@tabler/icons-react";
import { Search } from "./Search";
import { FIRST_AVAILABLE_DATE } from "@/constants";
import Conditional from "../shared/Conditional";

const SearchContainer = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      packageName: searchParams.get("packageName") ?? "",
      startDate: searchParams.get("startDate")
        ? new Date(searchParams.get("startDate") as any)
        : null,
      endDate: searchParams.get("endDate")
        ? new Date(searchParams.get("endDate") as any)
        : null,
    },
  });

  const handleFormSubmit = (value: any) => {
    const queryParams = {
      packageName: value.packageName,
      startDate: value.startDate
        ? dayjs(value.startDate).format("YYYY-MM-DD")
        : null,
      endDate: value.endDate ? dayjs(value.endDate).format("YYYY-MM-DD") : null,
    };
    const filteredValue: any = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([_, val]) => val !== undefined && val !== null && val !== ""
      )
    );
    if (Object.keys(filteredValue).length > 0) {
      const params = new URLSearchParams(filteredValue);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const showDetails = () => {
    const { packageName, startDate, endDate } = {
      packageName: searchParams.get("packageName") ?? "",
      startDate: searchParams.get("startDate")
        ? new Date(searchParams.get("startDate") as any)
        : null,
      endDate: searchParams.get("endDate")
        ? new Date(searchParams.get("endDate") as any)
        : null,
    };
    return (
      <Paper p={2} px="sm" radius="sm" bg="dark.7" shadow="sm" withBorder>
        <Flex gap={10} align="center">
          <Conditional if={packageName}>
            <Text fz="sm" ml={1}>
              {packageName}
            </Text>
          </Conditional>
          <Conditional if={startDate}>
            <Text fz="sm">{dayjs(startDate).format("YYYY-MM-DD")}</Text>
          </Conditional>
          <Conditional if={startDate && endDate}>
            <IconArrowRight style={{ width: rem(20), height: rem(20) }} />
          </Conditional>
          <Conditional if={endDate}>
            <Text fz="sm">{dayjs(endDate).format("YYYY-MM-DD")}</Text>
          </Conditional>
          <CloseButton
            onClick={() => {
              form.reset();
              replace(pathname);
            }}
          />
        </Flex>
      </Paper>
    );
  };

  return (
    <Box w="100%" bg="dark.9" pb={60}>
      <Container className="responsiveContainer" py={30}>
        <Title order={3} size="2.2rem" fw={800} mb={20} c="white">
          Dowloads
        </Title>

        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          <Flex
            align="center"
            gap={10}
            w="100%"
            direction={{ base: "column", sm: "row" }}
          >
            <Search form={form} />
            <Flex align="center" gap={10} w={{ base: "100%", sm: "36%" }}>
              <DatePickerInput
                w="100%"
                size="md"
                dropdownType="modal"
                maxDate={new Date()}
                valueFormat="YYYY MMM DD"
                key={form.key("startDate")}
                placeholder="Pick start date"
                {...form.getInputProps("startDate")}
                minDate={new Date(FIRST_AVAILABLE_DATE)}
              />
              <DatePickerInput
                w="100%"
                size="md"
                dropdownType="modal"
                maxDate={new Date()}
                key={form.key("endDate")}
                valueFormat="YYYY MMM DD"
                placeholder="Pick end date"
                {...form.getInputProps("endDate")}
              />
            </Flex>
            <Button
              size="md"
              bg="red.8"
              type="submit"
              w={{ base: "100%", sm: "auto" }}
            >
              Search
            </Button>
          </Flex>
        </form>
        <Conditional if={searchParams.get("packageName")}>
          <Box display="flex" mt="md">
            {showDetails()}
          </Box>
        </Conditional>
      </Container>
    </Box>
  );
};

export default SearchContainer;
