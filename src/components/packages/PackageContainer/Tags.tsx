import { formatSize, getScoreTextColor } from "@/utils";
import { Badge, Flex, NumberFormatter, Tooltip } from "@mantine/core";
import {
  IconCode,
  IconDownload,
  IconLicense,
  IconShieldLock,
  IconStar,
  IconTag,
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
  const { stars, license, security, language, size, downloads, version } =
    data || {};

  return (
    <Flex
      gap={10}
      mt={15}
      justify={{ base: "center", sm: "flex-start" }}
      wrap="wrap"
    >
      {version && (
        <CustomTags
          tooltip="Latest Version"
          icon={<IconTag size={14} />}
          value={version}
        />
      )}
      {stars > 0 && (
        <CustomTags
          tooltip="Stars"
          icon={<IconStar size={14} />}
          value={<NumberFormatter thousandSeparator value={stars} />}
        />
      )}
      {license && (
        <CustomTags
          tooltip="License"
          icon={<IconLicense size={14} />}
          value={license}
        />
      )}
      {language && (
        <CustomTags
          tooltip="Primary Language"
          icon={<IconCode size={14} />}
          value={language}
        />
      )}
      {size && (
        <CustomTags
          tooltip="gzip size"
          icon={<IconZip size={14} />}
          value={formatSize(size)}
        />
      )}
      {downloads && (
        <CustomTags
          tooltip="Total Downloads"
          icon={<IconDownload size={14} />}
          value={<NumberFormatter thousandSeparator value={downloads} />}
        />
      )}
      {security && (
        <CustomTags
          color={getScoreTextColor(security)}
          tooltip="OpenSSF Score"
          icon={<IconShieldLock size={14} />}
          value={security}
        />
      )}
    </Flex>
  );
};

export default Tags;
