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
}
