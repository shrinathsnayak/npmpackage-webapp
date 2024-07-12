import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "./GoogleAnalytics";
import MicrosoftClarity from "./MicrosoftClarity";

const Metrics = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Analytics />
      <MicrosoftClarity />
      <GoogleAnalytics />
    </>
  );
};

export default Metrics;
