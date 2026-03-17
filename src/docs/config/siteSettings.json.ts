/**
 * Global site settings
 */

import { type DocsSiteSettingsProps } from "./types/configDataTypes";

// The below locales need to match what you've put in your `astro.config.mjs` file
export const locales = ["en"] as const;
export const defaultLocale = "en" as const;

// localeMap is used to map languages to their respective locales - used for formatDate function
export const localeMap = {
  en: "en-US",
} as const;

// text to show in the language switcher for each locale
export const languageSwitcherMap = {
  en: "EN",
} as const;

// site settings that don't change between languages
export const siteSettings: DocsSiteSettingsProps = {
  useViewTransitions: false,
  copyLinkButtons: true,
  pagination: true,
  docsRoute: "materials",
};

export default siteSettings;
