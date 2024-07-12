export const ONE_HOUR_API_CACHE: number = 60 * 60 * 1;

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
      revalidate: ONE_HOUR_API_CACHE,
      tags: [tagName],
    },
  };
};
