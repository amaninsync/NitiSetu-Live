import { 
  User, 
  Department, 
  Project, 
  Mandal, 
  SHGFinancing, 
  DashboardMetric 
} from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Sri Venkatesh Dhotre",
    email: "dm@asifabad.nitisetu.com",
    role: "district_collector",
    avatar: "/avatars/district-collector.jpg",
    active: true,
    lastLogin: "2023-05-10T08:30:00",
    permissions: ["all"]
  },
  {
    id: "u2",
    name: "Sri Deepak Tewari",
    email: "ac@asifabad.nitisetu.com",
    role: "additional_collector",
    avatar: "/avatars/additional-collector.jpg",
    active: true,
    lastLogin: "2023-05-09T17:45:00",
    permissions: ["view_all", "edit_department", "approve_projects"]
  },
  {
    id: "u3",
    name: "Dr Adepu Bhasker",
    email: "dwo@asifabad.nitisetu.com",
    role: "department_lead",
    departmentId: "d1",
    avatar: "/avatars/health-lead.jpg",
    active: true,
    lastLogin: "2023-05-10T09:15:00",
    permissions: ["view_department", "edit_department", "create_reports"]
  },
  {
    id: "u4",
    name: "Meena Gupta",
    email: "education@asifabad.nitisetu.com",
    role: "department_lead",
    departmentId: "d2",
    avatar: "/avatars/education-lead.jpg",
    active: true,
    lastLogin: "2023-05-09T16:30:00",
    permissions: ["view_department", "edit_department", "create_reports"]
  },
  {
    id: "u5",
    name: "Suresh Reddy",
    email: "agriculture@asifabad.nitisetu.com",
    role: "department_lead",
    departmentId: "d3",
    avatar: "/avatars/agriculture-lead.jpg",
    active: true,
    lastLogin: "2023-05-10T10:00:00",
    permissions: ["view_department", "edit_department", "create_reports"]
  },
  {
    id: "u6",
    name: "Admin User",
    email: "admin@asifabad.nitisetu.com",
    role: "admin",
    avatar: "/avatars/admin.jpg",
    active: true,
    lastLogin: "2023-05-10T11:00:00",
    permissions: ["all"]
  },
  {
    id: "u7",
    name: "Sanjay Verma",
    email: "employee@asifabad.nitisetu.com",
    role: "government_official",
    departmentId: "d1",
    avatar: "/avatars/employee.jpg",
    active: true,
    lastLogin: "2023-05-10T09:30:00",
    permissions: ["view_assigned", "edit_assigned", "upload_reports"]
  },
  {
    id: "u8",
    name: "Rahul Mishra",
    email: "contractor@asifabad.nitisetu.com",
    role: "external_worker",
    departmentId: "d2",
    avatar: "/avatars/contractor.jpg",
    active: true,
    lastLogin: "2023-05-09T14:15:00",
    permissions: ["view_limited", "upload_reports"]
  }
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: "d1",
    name: "Health",
    headId: "u3",
    budgetAllocation: 50000000,
    budgetUtilized: 32500000,
    employeeCount: 120,
    projectCount: 8,
    targetAchievement: 78,
    beneficiaryImpact: 45000,
    innovationIndex: 72,
    compliance: 95
  },
  {
    id: "d2",
    name: "Education",
    headId: "u4",
    budgetAllocation: 75000000,
    budgetUtilized: 60000000,
    employeeCount: 350,
    projectCount: 12,
    targetAchievement: 85,
    beneficiaryImpact: 72000,
    innovationIndex: 68,
    compliance: 92
  },
  {
    id: "d3",
    name: "Agriculture",
    headId: "u5",
    budgetAllocation: 45000000,
    budgetUtilized: 40500000,
    employeeCount: 95,
    projectCount: 6,
    targetAchievement: 90,
    beneficiaryImpact: 28000,
    innovationIndex: 75,
    compliance: 89
  },
  {
    id: "d4",
    name: "Infrastructure",
    headId: "u6",
    budgetAllocation: 120000000,
    budgetUtilized: 78000000,
    employeeCount: 85,
    projectCount: 10,
    targetAchievement: 65,
    beneficiaryImpact: 150000,
    innovationIndex: 80,
    compliance: 87
  },
  {
    id: "d5",
    name: "Rural Development",
    headId: "u6",
    budgetAllocation: 65000000,
    budgetUtilized: 45500000,
    employeeCount: 110,
    projectCount: 14,
    targetAchievement: 70,
    beneficiaryImpact: 95000,
    innovationIndex: 65,
    compliance: 90
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "District Hospital Expansion",
    description: "Expanding the district hospital to add 100 more beds and modernize facilities",
    startDate: "2023-01-15",
    endDate: "2023-12-31",
    budget: 25000000,
    departmentId: "d1",
    mandalId: "m1",
    status: "in_progress",
    progress: 65,
    timelineAdherence: 85,
    budgetCompliance: 90,
    qualityMetrics: 92,
    stakeholderSatisfaction: 88,
    documentationReporting: 85
  },
  {
    id: "p2",
    name: "School Digital Infrastructure",
    description: "Providing digital infrastructure to 50 schools in the district",
    startDate: "2023-02-10",
    endDate: "2023-11-30",
    budget: 35000000,
    departmentId: "d2",
    mandalId: "m2",
    status: "in_progress",
    progress: 78,
    timelineAdherence: 92,
    budgetCompliance: 95,
    qualityMetrics: 88,
    stakeholderSatisfaction: 90,
    documentationReporting: 82
  },
  {
    id: "p3",
    name: "Irrigation Canal Network",
    description: "Extending irrigation canals to cover additional 5000 hectares of farmland",
    startDate: "2023-03-05",
    endDate: "2024-02-28",
    budget: 40000000,
    departmentId: "d3",
    mandalId: "m3",
    status: "in_progress",
    progress: 45,
    timelineAdherence: 80,
    budgetCompliance: 85,
    qualityMetrics: 90,
    stakeholderSatisfaction: 75,
    documentationReporting: 78
  },
  {
    id: "p4",
    name: "Rural Road Connectivity",
    description: "Connecting 25 villages with all-weather roads",
    startDate: "2023-01-20",
    endDate: "2023-10-31",
    budget: 55000000,
    departmentId: "d4",
    mandalId: "m4",
    status: "in_progress",
    progress: 72,
    timelineAdherence: 75,
    budgetCompliance: 82,
    qualityMetrics: 85,
    stakeholderSatisfaction: 90,
    documentationReporting: 80
  },
  {
    id: "p5",
    name: "Women Empowerment Programs",
    description: "Training and skill development for 1000 women in rural areas",
    startDate: "2023-04-10",
    endDate: "2023-12-15",
    budget: 15000000,
    departmentId: "d5",
    mandalId: "m5",
    status: "in_progress",
    progress: 85,
    timelineAdherence: 95,
    budgetCompliance: 88,
    qualityMetrics: 92,
    stakeholderSatisfaction: 96,
    documentationReporting: 90
  },
  {
    id: "p6",
    name: "COVID Vaccination Drive",
    description: "Comprehensive vaccination campaign across the district",
    startDate: "2023-02-01",
    endDate: "2023-08-31",
    budget: 18000000,
    departmentId: "d1",
    mandalId: "m2",
    status: "completed",
    progress: 100,
    timelineAdherence: 98,
    budgetCompliance: 95,
    qualityMetrics: 96,
    stakeholderSatisfaction: 92,
    documentationReporting: 94
  }
];

// Mock Mandals
export const mockMandals: Mandal[] = [
  {
    id: "m1",
    name: "Central Mandal",
    population: 125000,
    area: 450,
    keyOfficialId: "u2",
    developmentIndex: 85,
    economicActivity: 80,
    governanceEffectiveness: 82,
    socialWelfare: 78
  },
  {
    id: "m2",
    name: "Northern Mandal",
    population: 95000,
    area: 520,
    keyOfficialId: "u3",
    developmentIndex: 72,
    economicActivity: 65,
    governanceEffectiveness: 70,
    socialWelfare: 75
  },
  {
    id: "m3",
    name: "Eastern Mandal",
    population: 85000,
    area: 480,
    keyOfficialId: "u4",
    developmentIndex: 68,
    economicActivity: 70,
    governanceEffectiveness: 65,
    socialWelfare: 72
  },
  {
    id: "m4",
    name: "Southern Mandal",
    population: 110000,
    area: 510,
    keyOfficialId: "u5",
    developmentIndex: 75,
    economicActivity: 78,
    governanceEffectiveness: 72,
    socialWelfare: 68
  },
  {
    id: "m5",
    name: "Western Mandal",
    population: 105000,
    area: 490,
    keyOfficialId: "u6",
    developmentIndex: 70,
    economicActivity: 75,
    governanceEffectiveness: 68,
    socialWelfare: 72
  }
];

// Mock SHG Financing
export const mockSHGFinancing: SHGFinancing[] = [
  {
    id: "shg1",
    mandalId: "m1",
    projectManagerId: "u3",
    coordinatorId: "u4",
    loanAmount: 5000000,
    recoveryProgress: 78,
    target: 100,
    achieved: 78
  },
  {
    id: "shg2",
    mandalId: "m2",
    projectManagerId: "u3",
    coordinatorId: "u5",
    loanAmount: 3500000,
    recoveryProgress: 85,
    target: 100,
    achieved: 85
  },
  {
    id: "shg3",
    mandalId: "m3",
    projectManagerId: "u4",
    coordinatorId: "u5",
    loanAmount: 4200000,
    recoveryProgress: 65,
    target: 100,
    achieved: 65
  },
  {
    id: "shg4",
    mandalId: "m4",
    projectManagerId: "u4",
    coordinatorId: "u6",
    loanAmount: 3800000,
    recoveryProgress: 92,
    target: 100,
    achieved: 92
  },
  {
    id: "shg5",
    mandalId: "m5",
    projectManagerId: "u5",
    coordinatorId: "u6",
    loanAmount: 4500000,
    recoveryProgress: 72,
    target: 100,
    achieved: 72
  }
];

// Mock District Dashboard Metrics
export const mockDistrictMetrics: DashboardMetric[] = [
  {
    id: "dm1",
    title: "Total Population",
    value: "520,000",
    change: 2.5,
    status: "positive"
  },
  {
    id: "dm2",
    title: "Annual Budget",
    value: "₹355 Cr",
    change: 8.2,
    status: "positive"
  },
  {
    id: "dm3",
    title: "Budget Utilization",
    value: "72%",
    change: 5.3,
    status: "positive"
  },
  {
    id: "dm4",
    title: "Active Projects",
    value: "42",
    change: 12.5,
    status: "positive"
  },
  {
    id: "dm5",
    title: "Development Index",
    value: "76.5",
    change: 4.2,
    status: "positive"
  },
  {
    id: "dm6",
    title: "Grievances Resolved",
    value: "87%",
    change: -2.3,
    status: "negative"
  }
];

// Budget Utilization by Department
export const budgetUtilizationData = mockDepartments.map(dept => ({
  name: dept.name,
  allocated: dept.budgetAllocation / 1000000,
  utilized: dept.budgetUtilized / 1000000
}));

// Project Status Data
export const projectStatusData = [
  { name: "Not Started", value: 5 },
  { name: "In Progress", value: 32 },
  { name: "Completed", value: 18 },
  { name: "Delayed", value: 8 },
  { name: "On Hold", value: 3 }
];

// Department Performance Data
export const departmentPerformanceData = mockDepartments.map(dept => ({
  name: dept.name,
  score: (
    dept.targetAchievement * 0.3 +
    (dept.budgetUtilized / dept.budgetAllocation * 100) * 0.25 +
    dept.innovationIndex * 0.1 +
    dept.compliance * 0.15 +
    dept.beneficiaryImpact / 1000 * 0.2
  ).toFixed(1)
})).sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

// Mandal Ranking Data
export const mandalRankingData = mockMandals.map(mandal => ({
  name: mandal.name,
  developmentIndex: mandal.developmentIndex,
  economicActivity: mandal.economicActivity,
  governanceEffectiveness: mandal.governanceEffectiveness,
  socialWelfare: mandal.socialWelfare,
  overall: (
    mandal.developmentIndex * 0.3 +
    mandal.economicActivity * 0.25 +
    mandal.governanceEffectiveness * 0.25 +
    mandal.socialWelfare * 0.2
  ).toFixed(1)
})).sort((a, b) => parseFloat(b.overall) - parseFloat(a.overall));

// Permissions for different roles
export const rolePermissions = {
  district_collector: ["view_all", "edit_all", "approve_all", "create_all", "delete_all"],
  additional_collector: ["view_all", "edit_most", "approve_most", "create_most"],
  department_lead: ["view_department", "edit_department", "approve_department", "create_department"],
  government_official: ["view_assigned", "edit_assigned"],
  external_worker: ["view_limited"],
  admin: ["view_all", "edit_all", "approve_all", "create_all", "delete_all", "manage_users", "manage_roles"]
};
