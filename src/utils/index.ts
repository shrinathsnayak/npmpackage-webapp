import { DEVELOPMENT } from "@/constants";
import { npmFacts } from "@/constants/npmfacts";

export const isDevelopment: boolean = !!process.env[DEVELOPMENT];

export const getScoreTextColor = (score: number): string => {
  if (score < 0 || score > 10) {
    throw new Error("Score must be between 0 and 10");
  }

  switch (true) {
    case score <= 2:
      return "red.8";
    case score <= 5:
      return "orange.8";
    case score <= 8:
      return "yellow.8";
    case score <= 10:
      return "green.8";
    default:
      throw new Error("Unexpected score value");
  }
};

/**
 * This TypeScript function generates a random fact about NPM by selecting a random index from an array
 * of NPM facts.
 * @returns A random fact about NPM from the `npmFacts` array.
 */
export const generateRandomNPMFact = () => {
  const allData = npmFacts;
  const randomIndex = Math.floor(Math.random() * allData.length);
  return allData[randomIndex];
};
