import { NothingFound } from "@/components/shared/NotFound";
import { MantineProvider } from "@mantine/core";
import theme from "./theme";

export default function NotFound() {
  return (
    <MantineProvider
      theme={theme}
      forceColorScheme="dark"
      defaultColorScheme="dark"
    >
      <NothingFound />
    </MantineProvider>
  );
}
