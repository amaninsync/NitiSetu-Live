
// District overview data
export const districtOverview = {
  name: "Bangalore Urban",
  population: "13.2M",
  area: "2,196 km²",
  literacy: "88.7%",
  budgetUtilization: 74,
  impactScore: 82
};

// Asifabad aspirational district data for NITI Aayog view
export const asifabadOverview = {
  name: "Asifabad",
  population: "515,835",
  area: "4,378 km²",
  literacy: "61.5%",
  budgetUtilization: 68,
  impactScore: 59
};

// Aspirational district indicators for NITI Aayog view
export const aspirationalIndicators = [
  { name: "Health & Nutrition", score: 62, rank: 32, improvement: 8 },
  { name: "Education", score: 58, rank: 45, improvement: 5 },
  { name: "Agriculture & Water", score: 65, rank: 27, improvement: 10 },
  { name: "Financial Inclusion", score: 54, rank: 51, improvement: 3 },
  { name: "Basic Infrastructure", score: 56, rank: 47, improvement: 7 },
];

export const sectoralImprovements = [
  { name: 'Jan', health: 45, education: 40, agriculture: 42, infrastructure: 38 },
  { name: 'Feb', health: 48, education: 42, agriculture: 45, infrastructure: 40 },
  { name: 'Mar', health: 52, education: 45, agriculture: 47, infrastructure: 43 },
  { name: 'Apr', health: 55, education: 48, agriculture: 50, infrastructure: 46 },
  { name: 'May', health: 58, education: 50, agriculture: 53, infrastructure: 49 },
  { name: 'Jun', health: 60, education: 52, agriculture: 58, infrastructure: 52 },
  { name: 'Jul', health: 62, education: 55, agriculture: 61, infrastructure: 54 },
  { name: 'Aug', health: 62, education: 58, agriculture: 63, infrastructure: 55 },
  { name: 'Sep', health: 62, education: 58, agriculture: 65, infrastructure: 56 },
];

export const keyIndicators = [
  { name: "Healthcare Centers", count: 248, progress: 85 },
  { name: "Schools", count: 356, progress: 92 },
  { name: "Roads (km)", count: 14563, progress: 78 },
  { name: "Water Projects", count: 87, progress: 62 },
  { name: "Electricity Coverage", count: "98%", progress: 98 },
];

export const departmentPerformance = [
  { name: "Healthcare", budget: 325, spent: 287, progress: 88 },
  { name: "Education", budget: 420, spent: 398, progress: 95 },
  { name: "Infrastructure", budget: 580, spent: 392, progress: 68 },
  { name: "Agriculture", budget: 210, spent: 158, progress: 75 },
  { name: "Social Welfare", budget: 175, spent: 162, progress: 93 },
];

export const monthlyData = [
  { name: 'Jan', budget: 400, actual: 380 },
  { name: 'Feb', budget: 300, actual: 290 },
  { name: 'Mar', budget: 350, actual: 320 },
  { name: 'Apr', budget: 280, actual: 290 },
  { name: 'May', budget: 290, actual: 270 },
  { name: 'Jun', budget: 330, actual: 320 },
  { name: 'Jul', budget: 360, actual: 310 },
  { name: 'Aug', budget: 400, actual: 370 },
  { name: 'Sep', budget: 420, actual: 380 },
  { name: 'Oct', budget: 450, actual: 400 },
  { name: 'Nov', budget: 480, actual: 430 },
  { name: 'Dec', budget: 520, actual: 490 },
];

// Chart configurations
export const deltaRankingChartConfig = {
  rank: {
    label: "Overall Rank",
    theme: {
      light: "#3b82f6", // Example blue color
      dark: "#60a5fa",  // Example light blue color
    },
  },
};
