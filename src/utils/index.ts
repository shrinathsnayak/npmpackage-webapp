import { DEVELOPMENT } from "@/constants";
import { npmFacts } from "@/constants/npmfacts";

export const isDevelopment: boolean = !!process.env[DEVELOPMENT];

/**
 * The function `getScoreTextColor` takes a score as input and returns a corresponding color code based
 * on the score range.
 * @param {number} score - The `score` parameter is a number representing a score value that should be
 * between 0 and 10.
 * @returns The `getScoreTextColor` function returns a string representing the color based on the input
 * `score` value. The color returned is determined by the following conditions:
 * - If the `score` is less than or equal to 2, it returns "red.8".
 * - If the `score` is less than or equal to 5, it returns "orange.8".
 * - If the `
 */
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
      return "white";
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

/**
 * The `formatDate` function in TypeScript formats a given date into a string with the year, month, and
 * day in a specific format.
 * @param {Date} date - The `date` parameter is a `Date` object representing the date that you want to
 * format.
 */
export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);

/**
 * This TypeScript function calculates the overall count by summing up the totalCount values from a
 * given data object.
 * @param data - The `calculateOverallCount` function takes in an object `data` where the keys are
 * strings and the values are objects with an optional property `totalCount` which is a number. The
 * function calculates the overall count by summing up all the `totalCount` values in the objects
 * within the `data`
 * @returns The `calculateOverallCount` function is returning the overall sum of the `totalCount`
 * values from the input `data` object. If a specific item in the `data` object does not have a
 * `totalCount` property defined, it defaults to 0.
 */
export const calculateOverallCount = (
  data: Record<string, { totalCount?: number }>,
) => {
  if (data) {
    return Object.values(data).reduce(
      (sum, item) => sum + (item?.totalCount ?? 0),
      0,
    );
  }
};

/**
 * The `formatBytes` function in TypeScript converts a given number of bytes into a human-readable
 * format with appropriate units (Bytes, KB, MB, GB).
 * @param {number} bytes - The `bytes` parameter in the `formatBytes` function represents the size of a
 * file or data in bytes that you want to format into a human-readable format (e.g., KB, MB, GB).
 * @returns The function `formatBytes` returns a formatted string representing the input `bytes` value
 * converted to the appropriate size unit (Bytes, KB, MB, GB).
 */
export const formatBytes = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export const getHighestSizePercentage = (data: any[]) =>
  data?.reduce(
    (max, lang) =>
      parseFloat(lang.sizePercentage) > parseFloat(max.sizePercentage)
        ? lang
        : max,
    data[0],
  );
