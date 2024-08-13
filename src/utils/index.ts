import { DEVELOPMENT } from "@/constants";
import { npmFacts } from "@/constants/npmfacts";
import { DataItem } from "@/types/npm";

export const isDevelopment: boolean = !!process.env[DEVELOPMENT];

/**
 * This TypeScript function `getScoreTextColor` determines the color of text based on a score within a
 * specified range.
 * @param {number} score - The `score` parameter represents the numerical score for which you want to
 * determine the text color based on its value.
 * @param [multiplier=1] - The `multiplier` parameter in the `getScoreTextColor` function is used to
 * adjust the score range dynamically. It allows you to multiply the score range by a certain factor to
 * customize the color thresholds based on the multiplied score values. This can be useful when you
 * want to scale or adjust the color
 * @returns The function `getScoreTextColor` returns a string representing the color based on the score
 * and multiplier provided.
 */
export const getScoreTextColor = (score: number, multiplier = 1): string => {
  if (score < 0 * multiplier || score > 10 * multiplier) {
    throw new Error("Score must be between 0 and 10");
  }

  switch (true) {
    case score <= 2 * multiplier:
      return "red.8";
    case score <= 5 * multiplier:
      return "orange.8";
    case score <= 8 * multiplier:
      return "yellow.8";
    case score <= 10 * multiplier:
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
  data: Record<string, { totalCount?: number }>
) => {
  if (data) {
    return Object.values(data).reduce(
      (sum, item) => sum + (item?.totalCount ?? 0),
      0
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

/**
 * The `breakCamelCase` function takes a camelCase string as input and returns the same string with
 * spaces inserted before each capital letter.
 * @param {string} str - The `str` parameter in the `breakCamelCase` function is a string that
 * represents a camelCase string that you want to break into separate words.
 * @returns The `breakCamelCase` function returns a string where camel case is broken by inserting a
 * space before each uppercase letter. The first letter of the resulting string is then capitalized.
 */
export const breakCamelCase = (str: string): string => {
  if (typeof str !== "string") {
    console.error("Invalid input: Input must be a string.");
    return "";
  }

  const brokenStr = str?.replace(/([a-z])([A-Z])/g, "$1 $2");
  return brokenStr?.charAt(0).toUpperCase() + brokenStr.slice(1);
};

/**
 * The function `removeSimilarByName` removes items with a specific name from an array of objects and
 * returns a limited number of remaining items.
 * @param {DataItem[]} data - The `data` parameter is an array of `DataItem` objects that you want to
 * filter. Each `DataItem` object should have a `name` property that will be used for comparison in the
 * filtering process.
 * @param {string} nameToRemove - The `nameToRemove` parameter in the `removeSimilarByName` function is
 * a string that specifies the name of the data items that should be removed from the input array.
 * @param [resultCount=3] - The `resultCount` parameter in the `removeSimilarByName` function specifies
 * the maximum number of items to include in the final result after removing items with a name matching
 * the `nameToRemove` parameter. It defaults to 3 if not provided explicitly.
 * @returns The `removeSimilarByName` function returns an array of `DataItem` objects with the
 * specified `nameToRemove` removed, limited to a maximum of `resultCount` items.
 */
export const removeSimilarByName = (
  data: DataItem[],
  nameToRemove: string,
  resultCount = 4
): DataItem[] => {
  if (!Array.isArray(data)) {
    throw new TypeError("First argument must be an array.");
  }

  if (typeof nameToRemove !== "string") {
    throw new TypeError("Second argument must be a string.");
  }

  if (typeof resultCount !== "number" || resultCount < 0) {
    throw new TypeError("Third argument must be a non-negative number.");
  }

  let removedCount = 0;

  const filteredData = data.filter((item) => {
    if (!item || typeof item !== "object" || !item.name) {
      throw new Error(
        "Each item in the array must be an object with a 'name' property."
      );
    }

    if (item.name === nameToRemove) {
      removedCount++;
      return false;
    }

    return true;
  });

  const limitedData = filteredData.slice(0, resultCount);

  return limitedData;
};

/**
 * The function `downloadDivAsImage` downloads a specified HTML element as an image with customizable
 * options.
 * @param {any} cardRef - The `cardRef` parameter is a reference to the DOM element that you want to
 * convert into an image. It is used to capture the content of the specified element and download it as
 * an image.
 * @param {string} name - The `name` parameter in the `downloadDivAsImage` function is a string that
 * represents the name of the image file that will be downloaded. It is used to set the filename of the
 * downloaded image to `.png`.
 * @returns The `downloadDivAsImage` function is returning a Promise, which resolves to `any`.
 */
export const downloadDivAsImage = async (cardRef: any, name: string): any => {
  const cardElement = cardRef.current;
  const options = {
    allowTaint: true,
    useCORS: false,
    backgroundColor: "#242424",
    removeContainer: true,
  };

  if (!cardElement) return;

  try {
    const html2canvas = await import(
      /* webpackPrefetch: true */ "html2canvas-pro"
    );

    const result = await html2canvas.default(cardElement, options);

    const asURL = result.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = asURL;
    anchor.download = `${name}.png`;
    anchor.click();
    anchor.remove();
  } catch (reason) {
    console.log(reason);
  }
};
