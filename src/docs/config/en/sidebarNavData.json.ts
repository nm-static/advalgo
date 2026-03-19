import type { DocsSidebarNavData } from "../types/configDataTypes";

/**
 * Combined sidebar navigation data for the English locale
 */
const sidebarNavData: DocsSidebarNavData = {
  tabs: [
    {
      id: "main",
      title: "Lecture Notes",
      description: "Lecture notes and course materials",
      icon: "tabler/file-text",
      sections: [
        {
          id: "00-preface",
          title: "Preface",
        },
        {
          id: "01-greedy",
          title: "1. Greedy",
        },
        {
          id: "02-dp",
          title: "2. Dynamic Programming",
        },
        {
          id: "03-maxflow",
          title: "3. Flows and Cuts",
        },
        {
          id: "04-hardness",
          title: "4. Hardness",
        },
        {
          id: "05-randomized",
          title: "5. Randomized Algorithms",
        },
        {
          id: "06-fpt",
          title: "6. Fixed-Parameter Tractability",
        },
        {
          id: "07-approx",
          title: "7. Approximation Algorithms",
        },
        {
          id: "08-hardness",
          title: "8. Hardness of Approximation",
        },
        {
          id: "09-approx-random",
          title: "9. Approximation and Randomization",
        },
        {
          id: "10-random-fpt",
          title: "10. Randomized FPT",
        },
        {
          id: "11-param-approx",
          title: "11. Parameterized Approximation",
        },
        {
          id: "12-heuristics",
          title: "12. Heuristics",
        },
      ],
    },
    {
      id: "editions",
      title: "Editions",
      description: "Past and current editions of the course",
      icon: "tabler/api-app",
      sections: [
        {
          id: "editions",
          title: "Editions",
        },
      ],
    },
    {
      id: "problems",
      title: "Problems",
      description: "Problem sets and exercises",
      icon: "tabler/school",
      sections: [
        {
          id: "problems",
          title: "Overview",
        },
        {
          id: "problems/approximation-algorithms",
          title: "Approximation Algorithms",
        },
        {
          id: "problems/greedy",
          title: "Greedy",
        },
        {
          id: "problems/np-hardness",
          title: "NP-Hardness",
        },
        {
          id: "problems/parameterized-algorithms",
          title: "Parameterized Algorithms",
        },
        {
          id: "problems/randomized-algorithms",
          title: "Randomized Algorithms",
        },
      ],
    },
  ],
};

export default sidebarNavData;
