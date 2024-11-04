import { GoogleAnalytics } from "@next/third-parties/google";

const GoogleAnalyticsPackage = () => (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
);

export default GoogleAnalyticsPackage;
