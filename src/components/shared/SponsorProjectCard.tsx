import Link from "next/link";
import { Paper, Text, Anchor } from "@mantine/core";

const SponsorProjectCard = () => {
  return (
    <Anchor component={Link} href="/sponsor" target="blank" underline="never">
      <Paper p="md" py="sm" radius="md" bg="red.9" shadow="sm" mb={15}>
        <Text fz="sm" c="white">
          Love this project? Help keep it running — sponsor us today! 🚀
        </Text>
      </Paper>
    </Anchor>
  );
};

export default SponsorProjectCard;
