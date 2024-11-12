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
  vulnerabilities: { name: "Vulnerabilities", value: "vulnerabilities", visible: true },
};

export const VULNERABILITY: any = {
  maintenance: {
    name: "Maintenance",
    label: "Maintenance",
    tooltip:
      "Packages marked as deprecated or not updated in over five years may be unmaintained and potentially harbor unresolved vulnerabilities.",
  },
  quality: {
    name: "Quality",
    label: "Quality",
    tooltip:
      "Packages with a floating version range may cause major version update issues, lack popularity, have low-quality dependencies, or contain discouraged minified code.",
  },
  supplyChainRisk: {
    name: "Supply Chain",
    label: "Supply Chain",
    tooltip: `Supply chain attacks target open-source software dependencies, compromising trusted components to spread vulnerabilities even to secure organizations.`,
  },
  vulnerability: {
    name: "Vulnerability",
    label: "Vulnerability",
    tooltip:
      "Vulnerabilities are weaknesses in software that attackers can exploit, making ongoing detection and management essential to reducing security risks by addressing critical issues promptly.",
  },
};

export const DEFAULT_TAB = TABS.overview.value;
export const FIRST_AVAILABLE_DATE = "2015-01-01";

export const CHART_DATE_TYPES: any = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
};
