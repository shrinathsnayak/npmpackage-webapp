export const EIGHT_HOUR_API_CACHE: number = 60 * 60 * 8;

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
      revalidate: EIGHT_HOUR_API_CACHE,
      tags: [tagName],
    },
  };
};

/* The `NPMPACKAGE_SEARCH_DEFAULT_DATA` constant is an array of objects representing data related to
different npm packages. Each object in the array contains information such as the package name,
version, description, date, and a nested `score` object with details like search score, quality,
popularity, and maintenance metrics for the package. */
export const NPMPACKAGE_SEARCH_DEFAULT_DATA = [
  {
    name: "react",
    version: "18.3.1",
    description: "React is a JavaScript library for building user interfaces.",
    date: "2024-04-26T16:42:26.496Z",
    score: {
      searchScore: 100000.516,
      final: 0.49188317669226905,
      details: {
        quality: 0.5267199041534212,
        popularity: 0.6205729679416458,
        maintenance: 0.3333333333333333,
      },
    },
  },
  {
    name: "next",
    version: "14.2.4",
    description: "The React Framework",
    date: "2024-06-11T21:57:27.376Z",
    score: {
      searchScore: 100000.52,
      final: 0.5135986133786737,
      details: {
        quality: 0.6843280901194039,
        popularity: 0.5475243419319596,
        maintenance: 0.3333333333333333,
      },
    },
  },
  {
    name: "vue",
    version: "3.4.29",
    description:
      "The progressive JavaScript framework for building modern web UI.",
    date: "2024-06-14T16:03:05.133Z",
    score: {
      searchScore: 100000.46,
      final: 0.45273787332142024,
      details: {
        quality: 0.521758278571159,
        popularity: 0.5129820659525883,
        maintenance: 0.3333333333333333,
      },
    },
  },
  {
    name: "@angular-devkit/core",
    version: "18.0.5",
    description: "Angular DevKit - Core Utility Library",
    date: "2024-06-20T12:01:47.161Z",
    score: {
      searchScore: 0.0034939733,
      final: 0.44113582675085744,
      details: {
        quality: 0.617962134632155,
        popularity: 0.39737291341298364,
        maintenance: 0.3333333333333333,
      },
    },
  },
  {
    name: "svelte",
    version: "4.2.18",
    description: "Cybernetically enhanced web apps",
    date: "2024-06-06T11:44:36.397Z",
    score: {
      searchScore: 100000.36,
      final: 0.368298539413643,
      details: {
        quality: 0.5141812465026877,
        popularity: 0.2782214251319145,
        maintenance: 0.3333333333333333,
      },
    },
  },
  {
    name: "solid-js",
    version: "1.8.17",
    description:
      "A declarative JavaScript library for building user interfaces.",
    date: "2024-04-22T23:28:35.399Z",
    score: {
      searchScore: 100000.36,
      final: 0.3845959025916864,
      details: {
        quality: 0.6217415486721602,
        popularity: 0.23259077520963342,
        maintenance: 0.3333333333333333,
      },
    },
  },
  {
    name: "antd",
    version: "5.18.3",
    description:
      "An enterprise-class UI design language and React components implementation",
    date: "2024-06-19T05:54:18.121Z",
    score: {
      searchScore: 100000.41,
      final: 0.4115781419203341,
      details: {
        quality: 0.535491600796379,
        popularity: 0.38361141432786794,
        maintenance: 0.3333333333333333,
      },
    },
  },
];
