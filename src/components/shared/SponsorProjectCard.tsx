import Link from "next/link";
import { useTranslations } from "next-intl";
import { Paper, Text, Anchor, Title } from "@mantine/core";

const SponsorProjectCard = () => {
  const t = useTranslations();
  return (
    <Anchor
      component={Link}
      href={`${process.env.NEXT_PUBLIC_VALIDATE_EMAIL_URL}`}
      target="blank"
      underline="never"
    >
      <Paper p="md" py="sm" radius="md" bg="red.9" shadow="sm" mb={15}>
        {/* <Text fz="sm" c="white">
          {t("sponsor_card")}
        </Text> */}
        <Title fz="sm" c="white">
          validate.email 🚀
        </Title>
        <Text fz="xs" c="white" mt={10}>
          Verify real, reachable, and deliverable emails with instant MX
          records, SMTP checks, and disposable email detection.
        </Text>
      </Paper>
    </Anchor>
  );
};

export default SponsorProjectCard;
