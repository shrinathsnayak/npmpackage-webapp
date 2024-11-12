"use client";

import { useRouter } from "next/navigation";
import { Container, Title, Text, Button, Group } from "@mantine/core";
import { Illustration } from "./Illustration";
import classes from "./404.module.css";
import PageLayout from "../PageLayout";

export function NothingFound() {
  const { replace } = useRouter();
  return (
    <PageLayout hideFooter={true} bg="dark.9">
      <Container size="lg" className={`${classes.root} responsiveContainer`}>
        <div className={classes.inner}>
          <Illustration className={classes.image} />
          <div className={classes.content}>
            <Title className={classes.title} c="white">
              Nothing to see here
            </Title>
            <Text size="lg" ta="center" className={classes.description}>
              Page you are trying to open does not exist. You may have mistyped
              the address, or the page has been moved to another URL. If you
              think this is an error contact support.
            </Text>
            <Group justify="center">
              <Button size="md" color="red.8" onClick={() => replace("/")}>
                Take me back to home page
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
