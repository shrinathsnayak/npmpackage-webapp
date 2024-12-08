import Link from "next/link";
import { Badge, Flex, Tooltip } from "@mantine/core";
import {
  IconCode,
  IconDownload,
  IconFileDigit,
  IconFileInfo,
  IconLicense,
  IconShieldLock,
  IconStar,
  IconTag,
  IconZip,
} from "@tabler/icons-react";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import Conditional from "@/components/shared/Conditional";
import { formatSize, getScoreTextColor } from "@/utils";

const CustomTags = ({ icon, value, color = "gray", tooltip, href }: any) => {
  return (
    <Tooltip label={tooltip} position="bottom">
      <Badge
        leftSection={icon}
        color={color}
        opacity={0.9}
        radius={5}
        size="lg"
        {...(href && { component: Link, href, style: { cursor: "pointer" } })}
      >
        {value}
      </Badge>
    </Tooltip>
  );
};

const Tags = ({ data }: any) => {
  const {
    stars,
    license,
    security,
    language,
    size,
    downloads,
    version,
    unpackedSize,
    fileCount,
  } = data || {};

  return (
    <Flex
      gap={10}
      mt={15}
      justify={{ base: "center", sm: "flex-start" }}
      wrap="wrap"
    >
      <Conditional if={version}>
        <CustomTags
          tooltip="Latest Version"
          icon={<IconTag size={14} />}
          value={version}
        />
      </Conditional>
      <Conditional if={stars > 0}>
        <CustomTags
          tooltip="Stars"
          icon={<IconStar size={14} />}
          value={<AnimatedNumber value={stars} />}
        />
      </Conditional>
      <Conditional if={license}>
        <CustomTags
          tooltip="License"
          icon={<IconLicense size={14} />}
          value={license}
        />
      </Conditional>
      <Conditional if={language}>
        <CustomTags
          tooltip="Primary Language"
          icon={<IconCode size={14} />}
          value={language}
        />
      </Conditional>
      <Conditional if={size}>
        <CustomTags
          tooltip="gzip size"
          icon={<IconZip size={14} />}
          value={formatSize(size)}
        />
      </Conditional>
      <Conditional if={unpackedSize && !size}>
        <CustomTags
          tooltip="Unpacked Size"
          icon={<IconFileInfo size={14} />}
          value={formatSize(unpackedSize)}
        />
      </Conditional>
      <Conditional if={fileCount > 0}>
        <CustomTags
          tooltip="File Count"
          icon={<IconFileDigit size={16} />}
          value={<AnimatedNumber value={fileCount} />}
        />
      </Conditional>
      <Conditional if={!!downloads}>
        <CustomTags
          href="?t=downloads"
          tooltip="Total Downloads"
          icon={<IconDownload size={14} />}
          value={<AnimatedNumber value={downloads} />}
        />
      </Conditional>
      <Conditional if={security}>
        <CustomTags
          color={getScoreTextColor(security)}
          tooltip="OpenSSF Score"
          icon={<IconShieldLock size={14} />}
          value={security}
          href="?t=scorecard"
        />
      </Conditional>
    </Flex>
  );
};

export default Tags;
