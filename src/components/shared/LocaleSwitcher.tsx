import { useLocale } from "next-intl";
import { Select, SelectProps, Group, Text } from "@mantine/core";
import { IconCheck, IconLanguage } from "@tabler/icons-react";
import { setUserLocale } from "@/services/locale";
import { LOCALE_FLAGS } from "@/constants";

const iconProps = {
  stroke: 1.5,
  color: "currentColor",
  opacity: 0.6,
  size: 18,
};

const renderSelectOption: SelectProps["renderOption"] = ({
  option,
  checked,
}) => (
  <Group flex="1" gap="sm" align="center">
    <Text fz="lg">{LOCALE_FLAGS[option.value]}</Text>
    <Text fw={checked ? 700 : 400} fz="md">
      {option.label}
    </Text>
    {checked && (
      <IconCheck style={{ marginInlineStart: "auto" }} {...iconProps} />
    )}
  </Group>
);

const LanguageSwitcher = () => {
  const locale: any = useLocale();

  return (
    <Select
      w={180}
      defaultValue={locale}
      checkIconPosition="right"
      renderOption={renderSelectOption}
      onChange={(value: any) => setUserLocale(value)}
      data={[
        { label: "English", value: "en" },
        { label: "한국인", value: "ko" },
        { label: "Deutsch", value: "de" },
        { label: "Русский", value: "ru" },
      ]}
    />
  );
};

export default LanguageSwitcher;
