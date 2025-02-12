"use client";

import { useMemo } from "react";
import { NumberFormatter } from "@mantine/core";

const AnimatedNumber = ({ value }: { value: string | number }) => {
  const parsedValue = useMemo(() => (value ? Number(value) : 0), [value]);
  return <NumberFormatter value={parsedValue} thousandSeparator />;
};

export default AnimatedNumber;
