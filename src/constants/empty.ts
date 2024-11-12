import Empty from "@/assets/empty.png";

export const EMPTY_TYPE = {
  SECURITY: "SECURITY",
  DEPENDENCIES: "DEPENDENCIES",
  README: "README",
  DEFAULT: "DEFAULT",
  VULNERABILITIES: "VULNERABILITIES",
};

export const EMPTY_STATE: any = {
  [EMPTY_TYPE.SECURITY]: {
    text: "No security vulnerabilities found.",
    image: Empty.src,
  },
  [EMPTY_TYPE.DEPENDENCIES]: {
    text: "No dependencies detected.",
    image: Empty.src,
  },
  [EMPTY_TYPE.DEFAULT]: {
    text: "No data available.",
    image: Empty.src,
  },
  [EMPTY_TYPE.README]: {
    text: "No README found.",
    image: Empty.src,
  },
  [EMPTY_TYPE.VULNERABILITIES]: {
    text: "No vulnerabilities found.",
    image: Empty.src,
  },
};
