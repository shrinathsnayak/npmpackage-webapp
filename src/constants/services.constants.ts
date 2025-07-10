import { DEFAULT_CACHE_HOUR } from "./index";
import { isDevelopment } from "@/utils";

/* The line `export const API_CACHE_IN_HOURS: number = 60 * 60 * 3;` is defining a constant variable
`API_CACHE_IN_HOURS` with a value of `60 * 60 * 3`, which calculates to 10800. This constant is used
to set the caching duration in hours for API requests. In this case, the caching duration is set to
3 hours (10800 seconds). */
export const API_CACHE_IN_HOURS: number = 60 * 60 * DEFAULT_CACHE_HOUR;

/**
 * The function `genereatePackageName` takes an array of strings, decodes each string using
 * `decodeURIComponent`, and then joins the decoded strings with a forward slash ("/").
 * @param packageName - an array of strings as
 * input and decodes each string using `decodeURIComponent`, then joins them together with a forward
 * slash ("/").
 */
export const genereatePackageName = (packageName: []): string =>
  packageName && packageName?.map(decodeURIComponent).join("/");

/**
 * The function `generateAPIOptions` returns an object with caching options for an API request based on
 * a provided tag name.
 * @param {string} tagName - The `tagName` parameter in the `generateAPIOptions` function is a string
 * that represents the tag associated with the API options being generated.
 * @returns An object with a `next` property containing an object with `revalidate` and `tags`
 * properties.
 */
export const generateAPIOptions = (tagName: string): object => {
  if (isDevelopment) {
    return {};
  }
  return {
    next: {
      revalidate: API_CACHE_IN_HOURS,
      tags: [tagName],
    },
  };
};
