import { Anchor, Paper } from "@mantine/core";
import OverviewCard from "@/components/shared/OverviewCard";

const Sponsor = ({ funding }: any) => {
  return (
    <OverviewCard title="Sponsor this package">
      <Paper
        p="lg"
        radius="md"
        bg="dark.9"
        shadow="sm"
        style={{ textOverflow: "ellipsis", overflow: "hidden" }}
      >
        {funding?.length > 0 &&
          funding?.map((item: any) => (
            <Anchor target="_blank" href={item} key={item} fz="sm">
              {item}
            </Anchor>
          ))}
      </Paper>
    </OverviewCard>
  );
};

export default Sponsor;
