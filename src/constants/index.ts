export const NPMPACKAGE_TITLE: string = "npmpackage.info";
export const DEVELOPMENT = "development";
export const NPMPACKAGE_DESCRIPTION: string =
  "Discover detailed information about npm packages. Your go-to source for npm package insights.";

export const TABS: any = {
  overview: { name: "Overview", value: "overview", visible: true },
  readme: { name: "Readme", value: "readme", visible: true },
  downloads: { name: "Downloads", value: "downloads", visible: true },
  dependencies: { name: "Dependencies", value: "dependencies", visible: true },
  scorecard: { name: "OpenSSF Scorecard", value: "scorecard", visible: true },
  versions: { name: "Versions", value: "versions", visible: false },
};

export const VULNERABILITY: any = {
  maintenance: { name: "Maintenance", label: "Maintenance" },
  quality: { name: "Quality", label: "Quality" },
  supplyChainRisk: { name: "Supply Chain Risk", label: "Supply Chain Risk" },
  vulnerability: { name: "Vulnerability", label: "Vulnerability" },
};

export const DEFAULT_TAB = TABS.overview.value;
export const FIRST_AVAILABLE_DATE = "2015-01-01";

export const CHART_DATE_TYPES: any = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
}