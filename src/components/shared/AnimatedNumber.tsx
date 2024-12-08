"use client";

import { useMemo } from "react";
import NumberFlow, { useCanAnimate } from "@number-flow/react";
import { NumberFormatter } from "@mantine/core";

const AnimatedNumber = ({ value }: { value: string | number }) => {
  const canAnimate = useCanAnimate();
  const parsedValue = useMemo(() => (value ? Number(value) : 0), [value]);
  return canAnimate ? (
    <NumberFlow value={parsedValue} isolate={true} locales="en-US" />
  ) : (
    <NumberFormatter value={parsedValue} thousandSeparator />
  );
};

export default AnimatedNumber;
