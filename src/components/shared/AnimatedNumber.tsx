"use client";

import { useMemo } from "react";
import NumberFlow from "@number-flow/react";

const AnimatedNumber = ({ value }: { value: string | number }) => {
  const parsedValue = useMemo(() => (value ? Number(value) : 0), [value]);
  return <NumberFlow value={parsedValue} isolate={true} />;
};

export default AnimatedNumber;
