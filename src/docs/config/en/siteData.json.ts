import type { DocsSiteData } from "../types/configDataTypes";

const docsSiteData: DocsSiteData = {
  title: "Advanced Algorithms",
  description:
    "Course materials for Advanced Algorithms — lecture notes, problem sets, and references.",
  navSocials: [
    {
      social: "GitHub",
      link: "https://github.com/neeldhara",
      icon: "mdi/github",
    },
  ],
  footerSocials: [
    {
      social: "Website",
      link: "https://www.neeldhara.com",
      icon: "tabler/world",
    },
    {
      social: "Twitter",
      link: "https://twitter.com/neaborat",
      icon: "tabler/brand-x",
    },
    {
      social: "LinkedIn",
      link: "https://www.linkedin.com/in/neeldhara-misra-a54b6920/",
      icon: "tabler/brand-linkedin",
    },
    {
      social: "BlueSky",
      link: "https://bsky.app/profile/neeldhara.com",
      icon: "tabler/brand-bluesky",
    },
    {
      social: "Mastodon",
      link: "https://mathstodon.xyz/@neeldhara",
      icon: "tabler/brand-mastodon",
    },
    {
      social: "GitHub",
      link: "https://github.com/neeldhara",
      icon: "tabler/brand-github",
    },
  ],
  // default image for meta tags if the page doesn't have an image already
  defaultImage: {
    src: "/images/cosmic-themes-logo.png",
    alt: "Advanced Algorithms",
  },
  // Your information for SEO purposes
  author: {
    name: "Neeldhara Misra",
    email: "",
    twitter: "",
  },
};

export default docsSiteData;
