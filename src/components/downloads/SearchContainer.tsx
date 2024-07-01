"use client";

import React from "react";
import * as dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Container, Flex, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Search } from "./Search";

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
    // transformValues: value => {
    //   return {
    //     ...value,
    //     startDate: value.startDate?.toISOString().split("T")[0],
    //     endDate: value.endDate?.toISOString().split("T")[0],
    //   };
    // }

    // validate: {
    //   package: (value) => value ? null : 'Search a package',
    // },
  });

  const handleFormSubmit = (value: any) => {
    const params = new URLSearchParams(value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box w="100%" bg="dark.9" pb={60}>
      <Container className="responsiveContainer" py={30}>
        <Title order={3} size="2.3rem" fw={800} mb={20}>
          Dowloads
        </Title>

        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          <Flex align="center" gap={10} w="100%">
            <Search form={form} />
            <DatePickerInput
              w="18%"
              size="md"
              dropdownType="modal"
              valueFormat="YYYY MMM DD"
              key={form.key("startDate")}
              placeholder="Pick start date"
              {...form.getInputProps("startDate")}
            />
            <DatePickerInput
              w="18%"
              size="md"
              dropdownType="modal"
              key={form.key("endDate")}
              valueFormat="YYYY MMM DD"
              placeholder="Pick end date"
              {...form.getInputProps("endDate")}
            />
            <Button size="md" bg="red.8" type="submit">
              Search
            </Button>
          </Flex>
        </form>
      </Container>
    </Box>
  );
};

export default SearchContainer;
