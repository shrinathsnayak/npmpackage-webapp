export const NPMPACKAGE_TITLE: string = "npmpackage.info";
export const DEVELOPMENT = "development";
export const NPMPACKAGE_DESCRIPTION: string =
  "Discover detailed information about npm packages. Your go-to source for npm package insights.";

export const TABS: any = {
  overview: { name: "Overview", value: "overview", visible: true },
  downloads: { name: "Downloads", value: "downloads", visible: false },
  dependencies: { name: "Dependencies", value: "dependencies", visible: true },
  scorecard: { name: "Security Scorecard", value: "scorecard", visible: true },
  versions: { name: "Versions", value: "versions", visible: false },
  readme: { name: "Readme", value: "readme", visible: true },
};

export const DEFAULT_TAB = TABS.overview.value;
