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
    .limit(5);

  if (error) {
    console.error("Error fetching popular packages:", error.message);
    return false;
  }
  return data;
}
