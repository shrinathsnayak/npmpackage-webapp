"use server";

import { createClient } from "@/utils/supbase";
import { FeedbackFormData } from "@/types/feedback";
import { isDevelopment } from "@/utils";

const supabase = createClient();

/**
 * The function `saveFeedback` saves feedback data to a Supabase database table.
 * @param {FeedbackFormData} formData - FeedbackFormData
 * @returns The `saveFeedback` function is returning the data object that is the result of inserting
 * the `formData` into the "feedback" table in the Supabase database.
 */
export async function saveFeedback(formData: FeedbackFormData) {
  if (isDevelopment) return true;

  const { error } = await supabase.from("feedback").insert(formData);

  if (error) {
    console.error("Error inserting feedback:", error.message);
    return false;
  }

  return true;
}

/**
 * The function `updatePopularPackageCount` asynchronously increments the popular count of a package
 * using a Supabase stored procedure.
 * @param {string} packageId - The `packageId` parameter is a string that represents the unique
 * identifier of a package for which you want to update the popular package count. This identifier is
 * used as input to the stored procedure `increment_popular_count` in the Supabase database to
 * increment the count of how popular that package is
 * @returns The `updatePopularPackageCount` function returns a boolean value. It returns `true` if the
 * package count was updated successfully, and `false` if there was an error updating the package
 * count.
 */
export async function updatePopularPackageCount(packageId: string) {
  if (isDevelopment) return true;

  const { error } = await supabase.rpc("increment_popular_count", {
    package_id_input: packageId,
  });

  if (error) {
    console.error("Error updating package count:", error.message);
    return false;
  }

  return true;
}

/**
 * The function `getPopularPackages` retrieves the top 5 popular package IDs from a Supabase table
 * named "popular".
 * @returns The `getPopularPackages` function returns an array of objects containing the `package_id`
 * of the popular packages. If there is an error fetching the popular packages, it will log an error
 * message and return `false`.
 */
export async function getPopularPackages() {
  if (isDevelopment) return true;

  const { data, error } = await supabase
    .from("popular")
    .select("package_id")
    .order("count", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Error fetching popular packages:", error.message);
    return false;
  }
  return data;
}

/**
 * The function `getAllPopularPackages` retrieves popular package IDs from a Supabase table in
 * descending order of count.
 * @returns The `getAllPopularPackages` function is returning the data fetched from the "popular" table
 * in the Supabase database. The data consists of the package IDs of popular packages, ordered by count
 * in descending order. If there is an error during the fetching process, the function will log an
 * error message and return `false`.
 */
export async function getAllPopularPackages() {
  const { data, error } = await supabase
    .from("popular")
    .select("package_id, updated_at")
    .order("count", { ascending: false });

  if (error) {
    console.error("Error fetching popular packages:", error.message);
    return false;
  }
  return data;
}

/**
 * The function `saveErrors` saves feedback form data to a Supabase table named "error" and returns
 * true if successful, false otherwise.
 * @param {FeedbackFormData} formData - The `formData` parameter in the `saveErrors` function is of
 * type `FeedbackFormData`. It is used to store feedback data related to errors in a database table
 * named "error".
 * @returns The `saveErrors` function is returning a boolean value. It returns `true` if the error data
 * was successfully inserted into the "error" table in the Supabase database, and it returns `false` if
 * there was an error during the insertion process.
 */
export async function saveErrors(formData: FeedbackFormData) {
  if (isDevelopment) return true;

  const { error } = await supabase.from("error").insert(formData);

  if (error) {
    console.error("Error inserting errors:", error.message);
    return false;
  }

  return true;
}
