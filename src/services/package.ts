"use server";

import { unstable_cache as cache } from "next/cache";
import { generateAPIOptions } from "@/constants/services.constants";

/**
 * The function `getPackageData` fetches package data from an API endpoint based on the provided
 * package name.
 * @param {string} packageName - The `getPackageData` function is an asynchronous function that fetches
 * package data from an API based on the provided `packageName`. Here's a breakdown of the parameters
 * used in the function:
 * @returns The `getPackageData` function returns the JSON data fetched from the API endpoint for the
 * specified package name. If the response is not valid JSON, it throws an error indicating that the
 * response is not valid JSON. If there is an error during the fetch process or if the package name is
 * not provided, it throws an error with the corresponding message.
 */
export const getPackageData = cache(
  async (packageName: string) => {
    try {
      if (packageName) {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3005"
          }/api/package?q=${packageName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Failed to fetch data: ${res.statusText}`
          );
        }

        return await res.json();
      } else {
        throw new Error("Package name is required");
      }
    } catch (err) {
      console.error("Error fetching package data:", err);
      throw err;
    }
  },
  ["package-data"],
  {
    revalidate: 300, // 5 minutes
    tags: ["package-data"],
  }
);

/**
 * The function `getPackageSecurityScore` fetches security score data for a specified package owned by
 * a given owner.
 * @param {string} packageName - The `packageName` parameter is a string that represents the name of
 * the package for which you want to retrieve the security score.
 * @param {string} owner - The `owner` parameter refers to the username or organization that owns the
 * package in the package registry. It is used to identify the specific owner of the package when
 * making API requests to fetch data related to the package's security score.
 * @returns The function `getPackageSecurityScore` is returning the JSON data fetched from the API
 * endpoint for the specified package name and owner.
 */
export const getPackageSecurityScore = cache(
  async (packageName: string, owner: string) => {
    const options = generateAPIOptions(packageName);
    const res = await fetch(
      `${process.env.API_ENDPOINT}/package?owner=${owner}&repo=${packageName}`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  },
  ["security-score"],
  {
    revalidate: 600, // 10 minutes
    tags: ["security-score"],
  }
);

/**
 * The function `searchPackage` asynchronously fetches package data based on the provided package name.
 * @param {string} packageName - The `packageName` parameter is a string that represents the name of
 * the package being searched for.
 * @returns The `searchPackage` function returns a Promise that resolves to the JSON data fetched from
 * the API endpoint for the specified package name.
 */
export const searchPackage = cache(
  async (packageName: string) => {
    try {
      if (packageName) {
        const options = generateAPIOptions(packageName);
        const res = await fetch(
          `${process.env.API_ENDPOINT}/search?q=${packageName}`,
          options
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        return res.json();
      }
    } catch (err) {
      console.error(err);
    }
  },
  ["search-package"],
  {
    revalidate: 180, // 3 minutes
    tags: ["search-package"],
  }
);

/**
 * The function `getPackageDownloads` fetches download data for a specified package name using an API
 * endpoint.
 * @param {string} packageName - The `packageName` parameter is a string that represents the name of
 * the package for which you want to retrieve download information.
 * @returns The function `getPackageDownloads` is returning the result of the `fetch` call in the form
 * of JSON data if the request is successful. If there is an error during the fetch operation or if the
 * package name is not provided, the function will log the error to the console.
 */
export const getPackageDownloads = cache(
  async (packageName: string) => {
    try {
      if (packageName) {
        const options = generateAPIOptions(packageName);
        const res = await fetch(
          `${process.env.API_ENDPOINT}/downloads?packageName=${packageName}&getDailyDownloads=false`,
          options
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        return res.json();
      }
    } catch (err) {
      console.error(err);
    }
  },
  ["package-downloads"],
  {
    revalidate: 300, // 5 minutes
    tags: ["package-downloads"],
  }
);

/**
 * This TypeScript function fetches download statistics for a specified package within a given date
 * range from an API endpoint.
 * @param {string} packageName - The `packageName` parameter is a string that represents the name of
 * the package for which you want to retrieve download statistics.
 * @param {string} [startDate] - The `startDate` parameter in the `packageDownloadStats` function is an
 * optional parameter that specifies the start date for the package download statistics query. If
 * provided, the function will include this start date in the API request to fetch download statistics
 * for the specified package. The format of the `startDate` parameter
 * @param {string} [endDate] - The `endDate` parameter in the `packageDownloadStats` function is an
 * optional parameter that specifies the end date for the package download statistics query. If
 * provided, the function will include download statistics up to this end date. If not provided, the
 * function will retrieve download statistics up to the current date or
 * @returns The `packageDownloadStats` function returns the JSON response from the API endpoint that
 * provides download statistics for a given package name within the specified date range. If there is
 * an error during the fetch operation, an error message is logged to the console.
 */
export const packageDownloadStats = cache(
  async (packageName: string, startDate?: string, endDate?: string) => {
    if (!packageName) return;

    try {
      const requestObj: Record<string, string> = { packageName };

      if (startDate) requestObj.startDate = startDate;
      if (endDate) requestObj.endDate = endDate;
      const searchQuery = new URLSearchParams(requestObj);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3005"
        }/api/downloads?${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching package download stats:", error);
    }
  },
  ["download-stats"],
  {
    revalidate: 300, // 5 minutes
    tags: ["download-stats"],
  }
);

/**
 * The function `getPackageVulnerabilities` fetches vulnerability data for a specified package from an
 * API endpoint.
 * @param {string} packageName - The `packageName` parameter is a string that represents the name of
 * the package for which you want to retrieve vulnerability information.
 * @returns The `getPackageVulnerabilities` function returns the JSON data fetched from the API endpoint
 * for the specified package name.
 */
export const getPackageVulnerabilities = cache(
  async (packageName: string, version: string) => {
    try {
      if (packageName) {
        const options = generateAPIOptions(packageName);
        const res = await fetch(
          `${process.env.API_ENDPOINT}/vulnerabilities?name=${packageName}&version=${version}`,
          options
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        return res.json();
      }
    } catch (err) {
      console.error(err);
    }
  },
  ["vulnerabilities"],
  {
    revalidate: 900, // 15 minutes
    tags: ["vulnerabilities"],
  }
);

/**
 * The function `getOGPackageInfo` fetches package information from an API based on the provided
 * package name.
 * @param {string} packageName - The `packageName` parameter is a string that represents the name of
 * the package for which you want to retrieve information.
 * @returns The function `getOGPackageInfo` is returning the JSON data fetched from the API endpoint
 * for the specified npm package name. If the fetch operation is successful (status code 200), the JSON
 * data is returned. If there is an error during the fetch operation, an error message is logged to the
 * console and the error is rethrown.
 */
export const getOGPackageInfo = cache(
  async (packageName: string) => {
    try {
      if (packageName) {
        const options = generateAPIOptions(packageName);
        const res = await fetch(
          `${process.env.API_ENDPOINT}/npm?project=${packageName}`,
          options
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }

        return await res.json();
      }
    } catch (err) {
      console.error("Error fetching package data:", err);
      throw err;
    }
  },
  ["og-package-info"],
  {
    revalidate: 600, // 10 minutes
    tags: ["og-package-info"],
  }
);
