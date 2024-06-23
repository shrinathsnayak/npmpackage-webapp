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
 * The `formatSize` function in TypeScript converts a given number of bytes into a human-readable
 * format with appropriate units (B, kB, MB, GB) based on the size.
 * @param {number} bytes - The `formatSize` function takes a number of bytes as input and converts it
 * into a human-readable string representation with the appropriate unit (B, kB, MB, GB).
 * @returns The `formatSize` function returns a formatted string representing the input `bytes` value
 * converted to a human-readable format with appropriate units (B, kB, MB, GB) based on the size of the
 * input.
 */
export const formatSize = (bytes: number): string => {
  let unit, size;

  if (Math.log10(bytes) < 3) {
    unit = "B";
    size = bytes.toFixed(2);
  } else if (Math.log10(bytes) < 6) {
    unit = "kB";
    size = (bytes / 1024).toFixed(2);
  } else if (Math.log10(bytes) < 9) {
    unit = "MB";
    size = (bytes / 1024 / 1024).toFixed(2);
  } else {
    unit = "GB";
    size = (bytes / 1024 / 1024 / 1024).toFixed(2);
  }

  return `${size} ${unit}`;
};

/**
 * The `formatLanguagesData` function takes an array of data objects, extracts specific properties, and
 * returns a new array with a modified structure.
 * @param {any[]} data - The `data` parameter is an array of objects containing information about
 * different languages. Each object has the following properties:
 * @returns The `formatLanguagesData` function takes an array of data as input and maps over each item
 * in the array to extract the `name`, `sizePercentage`, and `color` properties from each item. It then
 * returns a new array of objects with the extracted properties renamed as `name`, `value`, and `color`
 * respectively.
 */
export const formatLanguagesData = (data: any[]) => {
  return data?.map((item: any) => ({
    name: item.name,
    value: Number(item.sizePercentage),
    color: item.color,
  }));
};
