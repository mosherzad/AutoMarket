export const locales = ["en", "ar", "ku"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en";
