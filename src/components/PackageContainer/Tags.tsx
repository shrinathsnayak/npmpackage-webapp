import { formatBytes, getScoreTextColor } from "@/utils";
import { Badge, Flex, Group, NumberFormatter, Tooltip } from "@mantine/core";
import {
  IconCode,
  IconDownload,
  IconHistory,
  IconLicense,
  IconShieldLock,
  IconStar,
  IconZip,
} from "@tabler/icons-react";
import React from "react";

const CustomTags = ({ icon, value, color = "gray", tooltip }: any) => {
  return (
    <Tooltip label={tooltip} position="bottom">
      <Badge
        leftSection={icon}
        color={color}
        opacity={0.9}
        radius={5}
        size="lg"
      >
        {value}
      </Badge>
    </Tooltip>
  );
};

const Tags = ({ data }: any) => {
  const { stars, commits, license, security, language, size, downloads } =
    data || {};

  return (
    <Flex
      gap={10}
      mt={15}
      justify={{ base: "center", sm: "flex-start" }}
      wrap="wrap"
    >
      {stars && (
        <CustomTags
          tooltip="Stars"
          icon={<IconStar size={12} />}
          value={<NumberFormatter thousandSeparator value={stars} />}
        />
      )}
      {commits && (
        <CustomTags
          tooltip="Commits"
          icon={<IconHistory size={12} />}
          value={<NumberFormatter thousandSeparator value={commits} />}
        />
      )}
      {license && (
        <CustomTags
          tooltip="License"
          icon={<IconLicense size={12} />}
          value={license}
        />
      )}
      {language && (
        <CustomTags
          tooltip="Primary Language"
          icon={<IconCode size={12} />}
          value={language.name}
        />
      )}
      {size && (
        <CustomTags
          tooltip="gzip size"
          icon={<IconZip size={12} />}
          value={formatBytes(size)}
        />
      )}
      {downloads && (
        <CustomTags
          tooltip="Total Downloads"
          icon={<IconDownload size={12} />}
          value={<NumberFormatter thousandSeparator value={downloads} />}
        />
      )}
      {security && (
        <CustomTags
          color={getScoreTextColor(security)}
          tooltip="Security Score"
          icon={<IconShieldLock size={12} />}
          value={security}
        />
      )}
    </Flex>
  );
};

export default Tags;
