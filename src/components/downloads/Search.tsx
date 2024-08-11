"use client";

import { useEffect, useState } from "react";
import {
  Badge,
  Combobox,
  Group,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { searchPackage } from "@/services/package";
import { useThrottledCallback } from "@mantine/hooks";

export function Search({ form }: any) {
  const [value, setValue] = useState(form.getValues()?.packageName ?? "");
  const [data, setData] = useState<any>([]);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    if (!form.getValues()?.packageName) {
      setValue("");
    }
  }, [form.getValues()?.packageName]);

  const searchPackageName = async (packageName: any) => {
    const { status, data } =
      ((await searchPackage(packageName)) as any) || ({} as any);
    if (status === 200) {
      setData(data);
    }
  };

  const handleSearch = useThrottledCallback((query: string) => {
    searchPackageName(query);
  }, 1000);

  const handleChange = (event: any) => {
    const packageName = event.currentTarget.value;
    if (packageName) {
      handleSearch(packageName);
    }
    setValue(packageName);
    combobox.resetSelectedOption();
    combobox.openDropdown();
    combobox.updateSelectedOptionIndex();
  };

  const options = (data || [])?.map((item: any) => (
    <Combobox.Option value={item?.name} key={item?.name}>
      <Group align="center" justify="space-between">
        <Text>{item?.name}</Text>
        <Badge>{item?.version}</Badge>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      size="md"
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        form.setFieldValue("packageName", optionValue);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          size="md"
          value={value}
          onChange={handleChange}
          w={{ base: "100%", sm: "50%" }}
          placeholder="Search Package Name"
          onClick={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={data?.length <= 0}>
        <Combobox.Options>
          {options}
          {data?.length <= 0 && (
            <Combobox.Empty>No results found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
