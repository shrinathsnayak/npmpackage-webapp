import { Analytics } from "@vercel/analytics/react"
import GoogleAnalytics from "./GoogleAnalytics";
import MicrosoftClarity from "./MicrosoftClarity";

const Metrics = () => (
  <>
    <Analytics />
    <MicrosoftClarity />
    <GoogleAnalytics />
  </>
);

export default Metrics;
