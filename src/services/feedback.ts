"use server";

import { createClient } from "@/utils/supbase";
import { FeedbackFormData } from "@/types/feedback";

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
