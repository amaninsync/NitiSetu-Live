
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer, Users, Briefcase, Target, TrendingUp, DollarSign, Settings, Building, Tractor, Cloud, Users2, Factory, Home, BarChart3, LayoutGrid, LineChart, Lightbulb, MapPin, FileText, BarChartBig, PieChart as PieChartIcon, ShieldCheck, UserCog, ChevronDown, ChevronRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { useReactToPrint } from 'react-to-print';
import { ChartConfig, ChartContainer } from '@/components/ui/chart'; // Assuming this path exists
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// Mock data (can be replaced with actual data fetching)
const districtOverviewData = {
  totalPopulation: "5.2 Lakhs",
  literacyRate: "78%",
  area: "2,780 sq km",
  mandals: 15,
  gramPanchayats: 300,
  revenueVillages: 450,
};

const departmentSummary = [
  { name: "Education", budget: "₹1.2Cr", utilization: 78, projects: 15, head: "Dr. Anjali Sharma" },
  { name: "Health", budget: "₹90L", utilization: 85, projects: 22, head: "Dr. Vikram Singh" },
  { name: "Agriculture", budget: "₹75L", utilization: 70, projects: 18, head: "Smt. Priya Patel" },
  { name: "Infrastructure", budget: "₹2.5Cr", utilization: 65, projects: 12, head: "Shri. Rajesh Kumar" },
  { name: "Social Welfare", budget: "₹60L", utilization: 90, projects: 25, head: "Smt. Meena Kumari" },
];

const keyProjects = [
  { id: 1, name: "Digital Literacy Program", department: "Education", status: "Ongoing", progress: 60, deadline: "Dec 2024" },
  { id: 2, name: "Rural Health Camps", department: "Health", status: "Completed", progress: 100, deadline: "Mar 2024" },
  { id: 3, name: "Irrigation Modernization", department: "Agriculture", status: "Planning", progress: 20, deadline: "Jun 2025" },
  { id: 4, name: "Smart Village Initiative", department: "Infrastructure", status: "Ongoing", progress: 45, deadline: "Sep 2025" },
];

const budgetAllocationData = [
  { name: 'Education', value: 120, color: "hsl(var(--chart-1))" },
  { name: 'Health', value: 90, color: "hsl(var(--chart-2))" },
  { name: 'Agriculture', value: 75, color: "hsl(var(--chart-3))" },
  { name: 'Infrastructure', value: 250, color: "hsl(var(--chart-4))" },
  { name: 'Social Welfare', value: 60, color: "hsl(var(--chart-5))" },
];

const defaultChartConfig: ChartConfig = {
  value: {
    label: "Value",
  },
  budget: {
    label: "Budget (Lakhs)",
    color: "hsl(var(--chart-1))",
  },
  utilization: {
    label: "Utilization (%)",
    color: "hsl(var(--chart-2))",
  },
  projects: {
    label: "No. of Projects",
    color: "hsl(var(--chart-3))",
  },
};
budgetAllocationData.forEach(item => {
  if (!defaultChartConfig[item.name.toLowerCase()]) {
    defaultChartConfig[item.name.toLowerCase()] = { label: item.name, color: item.color };
  }
});


const ExportableCard = ({ title, description, children, onPrint, onExport }: { title: string, description?: string, children: React.ReactNode, onPrint?: () => void, onExport?: () => void }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex space-x-2">
          {onPrint && <Button variant="ghost" size="icon" onClick={onPrint}><Printer className="h-4 w-4" /></Button>}
          {onExport && <Button variant="ghost" size="icon" onClick={onExport}><Download className="h-4 w-4" /></Button>}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const DistrictView = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const departmentsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `District-View-Report-${new Date().toISOString().split('T')[0]}`,
  });

  const createPrintHandler = (ref: React.RefObject<HTMLDivElement>, title: string) => {
    return useReactToPrint({
      content: () => ref.current,
      documentTitle: `${title}-Report-${new Date().toISOString().split('T')[0]}`,
    });
  };

  const handleGenericExport = (data: any, filename: string) => {
    console.log(`Exporting ${filename}:`, data);
    // Placeholder for actual export logic (e.g., CSV, Excel)
    alert(`Data for ${filename} logged to console. Implement actual export.`);
  };


  const printOverview = createPrintHandler(overviewRef, "DistrictOverview");
  const printDepartments = createPrintHandler(departmentsRef, "DepartmentSummary");
  const printProjects = createPrintHandler(projectsRef, "KeyProjects");
  const printBudget = createPrintHandler(budgetRef, "BudgetAllocation");


  // State for filters
  const [selectedMandal, setSelectedMandal] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const mandals = ["All", "Asifabad", "Jainoor", "Kerameri", "Rebbena", "Sirpur (T)", "Tiryani", "Wankidi"]; // Example mandals
  const departments = ["All", ...departmentSummary.map(d => d.name)];


  return (
    <div ref={printRef} className="container mx-auto p-4 md:p-6 space-y-6 bg-background text-foreground">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-primary">District Dashboard: Kumuram Bheem Asifabad</h1>
          <p className="text-muted-foreground">Comprehensive overview of district operations and performance.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print Full Report
          </Button>
          <Button onClick={() => handleGenericExport({ districtOverviewData, departmentSummary, keyProjects, budgetAllocationData }, "FullDistrictReport")}>
            <Download className="mr-2 h-4 w-4" /> Export All Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedMandal} onValueChange={setSelectedMandal}>
            <SelectTrigger>
              <SelectValue placeholder="Select Mandal" />
            </SelectTrigger>
            <SelectContent>
              {mandals.map(m => <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(d => <SelectItem key={d} value={d.toLowerCase()}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        </CardContent>
      </Card>


      {/* District Overview Stats */}
      <div ref={overviewRef}>
        <ExportableCard
          title="District at a Glance"
          description="Key demographic and administrative statistics."
          onPrint={printOverview}
          onExport={() => handleGenericExport(districtOverviewData, "DistrictOverview")}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <Users className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Total Population</p>
              <p className="text-xl font-semibold">{districtOverviewData.totalPopulation}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <ShieldCheck className="mx-auto h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm text-muted-foreground">Literacy Rate</p>
              <p className="text-xl font-semibold">{districtOverviewData.literacyRate}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <MapPin className="mx-auto h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm text-muted-foreground">Area</p>
              <p className="text-xl font-semibold">{districtOverviewData.area}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <LayoutGrid className="mx-auto h-8 w-8 text-purple-500 mb-2" />
              <p className="text-sm text-muted-foreground">Mandals</p>
              <p className="text-xl font-semibold">{districtOverviewData.mandals}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Home className="mx-auto h-8 w-8 text-orange-500 mb-2" />
              <p className="text-sm text-muted-foreground">Gram Panchayats</p>
              <p className="text-xl font-semibold">{districtOverviewData.gramPanchayats}</p>
            </div>
          </div>
        </ExportableCard>
      </div>


      {/* Department Summaries */}
      <div ref={departmentsRef}>
        <ExportableCard
          title="Department Performance Summary"
          description="Overview of key departments, their budget, utilization, and projects."
          onPrint={printDepartments}
          onExport={() => handleGenericExport(departmentSummary, "DepartmentSummary")}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Head</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Utilization</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentSummary
                  .filter(dept => selectedDepartment === "all" || dept.name.toLowerCase() === selectedDepartment)
                  .map((dept) => (
                  <TableRow key={dept.name}>
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell>{dept.head}</TableCell>
                    <TableCell>{dept.budget}</TableCell>
                    <TableCell>{dept.projects}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={dept.utilization} className="w-24 h-2" indicatorColor={dept.utilization > 75 ? "hsl(var(--chart-2))" : "hsl(var(--chart-4))"} />
                        <span>{dept.utilization}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ExportableCard>
      </div>

      {/* Key Projects Overview */}
      <div ref={projectsRef}>
        <ExportableCard
          title="Key District Projects"
          description="Status and progress of major ongoing and completed projects."
          onPrint={printProjects}
          onExport={() => handleGenericExport(keyProjects, "KeyProjects")}
        >
          <div className="space-y-4">
            {keyProjects
              .filter(proj => selectedDepartment === "all" || proj.department.toLowerCase() === selectedDepartment)
              .map((project) => (
              <Card key={project.id} className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h4 className="font-semibold">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">Department: {project.department} | Deadline: {project.deadline}</p>
                  </div>
                  <Badge variant={project.status === "Completed" ? "default" : "secondary"} className={project.status === "Completed" ? "bg-green-500 hover:bg-green-600" : ""}>{project.status}</Badge>
                </div>
                <div className="mt-2">
                  <Progress value={project.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1 text-right">{project.progress}% Complete</p>
                </div>
              </Card>
            ))}
          </div>
        </ExportableCard>
      </div>

      {/* Budget Allocation Chart */}
      <div ref={budgetRef}>
        <ExportableCard
          title="District Budget Allocation"
          description="Visual representation of budget distribution across departments."
          onPrint={printBudget}
          onExport={() => handleGenericExport(budgetAllocationData, "BudgetAllocation")}
        >
          <ChartContainer config={defaultChartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <RechartsTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                />
                <Pie
                  data={budgetAllocationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {budgetAllocationData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ExportableCard>
      </div>

      {/* Call to Action / Quick Links */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions & Reports</CardTitle>
          <CardDescription>Access specific functionalities or generate detailed reports.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button><FileText className="mr-2 h-4 w-4" /> Generate Financial Report</Button>
          <Button variant="outline"><BarChartBig className="mr-2 h-4 w-4" /> View KPI Dashboard</Button>
          <Button variant="outline"><UserCog className="mr-2 h-4 w-4" /> Manage User Access</Button>
          <Button variant="secondary"><Settings className="mr-2 h-4 w-4" /> District Configuration</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistrictView;
