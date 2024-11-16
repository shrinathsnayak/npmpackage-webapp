import { GoogleAnalyticsPackage } from "./GoogleAnalytics";
import MicrosoftClarity from "./MicrosoftClarity";

const Metrics = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <MicrosoftClarity />
      <GoogleAnalyticsPackage />
    </>
  );
};

export default Metrics;
