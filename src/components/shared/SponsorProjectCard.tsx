import Link from "next/link";
import { useTranslations } from "next-intl";
import { Paper, Text, Anchor } from "@mantine/core";

const SponsorProjectCard = () => {
  const t = useTranslations();
  return (
    <Anchor component={Link} href="/sponsor" target="blank" underline="never">
      <Paper p="md" py="sm" radius="md" bg="red.9" shadow="sm" mb={15}>
        <Text fz="sm" c="white">
          {t("sponsor_card")}
        </Text>
      </Paper>
    </Anchor>
  );
};

export default SponsorProjectCard;
