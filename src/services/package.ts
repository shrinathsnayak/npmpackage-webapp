"use server";

import { generateAPIOptions } from "@/constants/services.constants";
import { isDevelopment } from "@/utils";

/**
 * This TypeScript React function fetches package data from a specified URL and returns it as JSON.
 * @param {string} packageName - The `packageName` parameter is a string that represents the name of
 * the package for which you want to fetch data.
 * @returns The `getPackageData` function is returning the JSON data fetched from the specified URL
 * after making a request with the provided `packageName`. If the request is successful (status code
 * 200), the function returns the JSON data. If the request fails, an error with the message "Failed to
 * fetch data" is thrown.
 */
export async function getPackageData(packageName: string) {
  try {
    if (packageName) {
      const options = isDevelopment ? {} : generateAPIOptions(packageName);
      const res = await fetch(
        `${process.env.API_ENDPOINT}/package?q=${packageName}`,
        options,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
}

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
export async function getPackageSecurityScore(
  packageName: string,
  owner: string,
) {
  const options = isDevelopment ? {} : generateAPIOptions(packageName);
  const res = await fetch(
    `${process.env.API_ENDPOINT}/package?owner=${owner}&repo=${packageName}`,
    options,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

/**
 * The function `searchPackage` asynchronously fetches package data based on the provided package name.
 * @param {string} packageName - The `packageName` parameter is a string that represents the name of
 * the package being searched for.
 * @returns The `searchPackage` function returns a Promise that resolves to the JSON data fetched from
 * the API endpoint for the specified package name.
 */
export async function searchPackage(packageName: string) {
  try {
    if (packageName) {
      const options = isDevelopment ? {} : generateAPIOptions(packageName);
      const res = await fetch(
        `${process.env.API_ENDPOINT}/search?q=${packageName}`,
        options,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * The function `getPackageDownloads` fetches download data for a specified package name using an API
 * endpoint.
 * @param {string} packageName - The `packageName` parameter is a string that represents the name of
 * the package for which you want to retrieve download information.
 * @returns The function `getPackageDownloads` is returning the result of the `fetch` call in the form
 * of JSON data if the request is successful. If there is an error during the fetch operation or if the
 * package name is not provided, the function will log the error to the console.
 */
export async function getPackageDownloads(packageName: string) {
  try {
    if (packageName) {
      const options = isDevelopment ? {} : generateAPIOptions(packageName);
      const res = await fetch(
        `${process.env.API_ENDPOINT}/downloads?packageName=${packageName}`,
        options,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
}

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
export async function packageDownloadStats(
  packageName: string,
  startDate?: string,
  endDate?: string,
) {
  if (!packageName) return;

  try {
    const options = isDevelopment ? {} : generateAPIOptions(packageName);
    const requestObj: Record<string, string> = { packageName };

    if (startDate) requestObj.startDate = startDate;
    if (endDate) requestObj.endDate = endDate;
    const searchQuery = new URLSearchParams(requestObj);
    console.log(`${process.env.API_ENDPOINT}/downloads?${searchQuery}`);
    const response = await fetch(
      `${process.env.API_ENDPOINT}/downloads?${searchQuery}`,
      options,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching package download stats:", error);
  }
}
