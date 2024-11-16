import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * The GoogleAnalyticsPackage component renders Google Analytics with the provided gaId or an empty
 * string.
 */
export const GoogleAnalyticsPackage = () => (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
);
