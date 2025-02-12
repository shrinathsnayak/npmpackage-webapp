export type Locale = (typeof locales)[number];

export const locales = ["en", "de", "ru", "ko"] as const;
export const defaultLocale: Locale = "en";
