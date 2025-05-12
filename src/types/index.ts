

export type UserRole = 
  | "district_collector" 
  | "additional_collector" 
  | "department_lead" 
  | "government_official" 
  | "external_worker" 
  | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  departmentIds?: string[]; // For users mapped to multiple departments
  mandalId?: string;
  avatar?: string;
  active: boolean;
  lastLogin?: string;
  permissions: string[];
}

export interface Department {
  id: string;
  name: string;
  headId: string;
  budgetAllocation: number;
  budgetUtilized: number;
  employeeCount: number;
  projectCount: number;
  targetAchievement: number;
  beneficiaryImpact: number;
  innovationIndex: number;
  compliance: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  departmentId: string;
  mandalId: string;
  status: "not_started" | "in_progress" | "completed" | "delayed" | "on_hold";
  progress: number;
  timelineAdherence: number;
  budgetCompliance: number;
  qualityMetrics: number;
  stakeholderSatisfaction: number;
  documentationReporting: number;
}

export interface Mandal {
  id: string;
  name: string;
  population: number;
  area: number;
  keyOfficialId: string;
  developmentIndex: number;
  economicActivity: number;
  governanceEffectiveness: number;
  socialWelfare: number;
}

export interface PerformanceMetric {
  id: string;
  entityType: "department" | "project" | "mandal";
  entityId: string;
  metricType: string;
  target: number;
  achieved: number;
  period: string;
}

export interface SHGFinancing {
  id: string;
  mandalId: string;
  projectManagerId: string;
  coordinatorId: string;
  loanAmount: number;
  recoveryProgress: number;
  target: number;
  achieved: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: "create" | "read" | "update" | "delete";
}

export interface RolePermission {
  roleId: UserRole;
  permissionId: string;
}

export interface Report {
  id: string;
  type: string;
  title: string;
  description: string;
  filePath: string;
  uploadedBy: string;
  entityType: "department" | "project" | "mandal";
  entityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: number | string;
  change: number;
  status: "positive" | "negative" | "neutral";
  icon?: React.ComponentType<any>;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface FileUpload {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadDate: string;
  status: "pending" | "processing" | "success" | "error";
  department: string;
  category: string;
  metadata: Record<string, any>;
}

export interface ReportCard {
  id: string;
  departmentId: string;
  period: string;
  submittedBy: string;
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  status: "draft" | "submitted" | "pending" | "approved" | "rejected";
  score?: number;
  comments?: string;
  metrics: Record<string, any>;
}

