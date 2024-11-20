/* The line `export const API_CACHE_IN_HOURS: number = 60 * 60 * 4;` is defining a constant variable
named `API_CACHE_IN_HOURS` with a value of `60 * 60 * 4`, which calculates to 14400. This value
represents the number of seconds in 4 hours, which is used as the caching duration for API requests
in hours. */
export const API_CACHE_IN_HOURS: number = 60 * 60 * 4;

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
  return {
    next: {
      revalidate: API_CACHE_IN_HOURS,
      tags: [tagName],
    },
  };
};
