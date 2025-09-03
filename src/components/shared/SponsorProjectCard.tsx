import Link from "next/link";
import { useTranslations } from "next-intl";
import { Paper, Text, Anchor, Title } from "@mantine/core";

const SponsorProjectCard = () => {
  const t = useTranslations();
  return (
    <Anchor
      component={Link}
      href="mailto:shrinathnayak07@gmail.com"
      target="blank"
      underline="never"
    >
      <Paper p="md" py="sm" radius="md" bg="red.9" shadow="sm" mb={15}>
        {/* <Text fz="sm" c="white">
          {t("sponsor_card")}
        </Text> */}
        <Title fz="sm" c="white">
          🚀 npmpackage.info for sale
        </Title>
        <Text fz="xs" c="white" mt={10}>
          Built with Next.js • Fully responsive • SEO optimized • Open source
          ready
        </Text>
      </Paper>
    </Anchor>
  );
};

export default SponsorProjectCard;
