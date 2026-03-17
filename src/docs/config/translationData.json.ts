/**
 * * Configuration of the i18n system data files and text translations
 */

import navDataEn from "./en/navData.json";
import sidebarNavDataEn from "./en/sidebarNavData.json";
import siteDataEn from "./en/siteData.json";
import testimonialDataEn from "./en/testimonialData.json";

export const dataTranslations = {
  en: {
    siteData: siteDataEn,
    navData: navDataEn,
    sidebarNavData: sidebarNavDataEn,
    testimonialData: testimonialDataEn,
  },
} as const;

export const textTranslations = {
  en: {
    hero_description: `Course materials for Advanced Algorithms — lecture notes, problem sets, and references.`,
    back_to_all_posts: "Back to all posts",
  },
} as const;

export const routeTranslations = {
  en: {
    overviewKey: "overview",
    docsKey1: "materials",
    docsKey2: "materials/*",
    docsKey3: "materials",
  },
} as const;

export const localizedCollections = {
  docs: {
    en: "materials",
  },
} as const;
