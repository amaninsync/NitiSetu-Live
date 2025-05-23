import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer, Users, Briefcase, Target, TrendingUp, DollarSign, Settings } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { useReactToPrint } from 'react-to-print';
// Note: ChartContainer and ChartConfig might be from "@/components/ui/chart" if you have them set up
// For simplicity, I'm defining a basic ChartConfig here.
import { ChartConfig } from '@/components/ui/chart'; // Assuming this path exists

// Sample departments data
const departmentData = {
  name: "Education Department",
  head: "Dr. Anjali Sharma",
  budget: "₹1.2 Cr",
  utilization: 78,
  projects: 15,
  impactScore: 85,
  description: "Oversees all educational initiatives, school infrastructure, and teacher training programs within the district. Focused on improving literacy rates and educational outcomes.",
};

const kpiData = [
  { name: 'Literacy Rate', value: 88, target: 95, color: "hsl(var(--chart-1))" },
  { name: 'Enrollment Ratio', value: 92, target: 98, color: "hsl(var(--chart-2))" },
  { name: 'Teacher Training', value: 75, target: 90, color: "hsl(var(--chart-3))" },
  { name: 'Digital Literacy', value: 60, target: 80, color: "hsl(var(--chart-4))" },
];

const projectStatusData = [
  { name: 'Completed', value: 8, color: "hsl(var(--chart-1))" },
  { name: 'In Progress', value: 5, color: "hsl(var(--chart-2))" },
  { name: 'Pending', value: 2, color: "hsl(var(--chart-4))" },
];

const financialSummaryData = [
  { month: 'Jan', allocated: 10, utilized: 8 },
  { month: 'Feb', allocated: 12, utilized: 10 },
  { month: 'Mar', allocated: 15, utilized: 13 },
  { month: 'Apr', allocated: 11, utilized: 9 },
  { month: 'May', allocated: 14, utilized: 12 },
  { month: 'Jun', allocated: 16, utilized: 15 },
];

const teamMembers = [
  { id: 1, name: "Ravi Kumar", position: "Project Lead", email: "ravi.k@example.gov", phone: "98XXXXXX01" },
  { id: 2, name: "Priya Singh", position: "Data Analyst", email: "priya.s@example.gov", phone: "98XXXXXX02" },
  { id: 3, name: "Amit Patel", position: "Field Coordinator", email: "amit.p@example.gov", phone: "98XXXXXX03" },
  { id: 4, name: "Sunita Devi", position: "Admin Officer", email: "sunita.d@example.gov", phone: "98XXXXXX04" },
];

const defaultChartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
  allocated: {
    label: "Allocated Budget (Lakhs)",
    color: "hsl(var(--chart-1))",
  },
  utilized: {
    label: "Utilized Budget (Lakhs)",
    color: "hsl(var(--chart-2))",
  },
};

const DepartmentView = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current, // Corrected
    documentTitle: `${departmentData.name}-Report`,
  });

  return (
    <div ref={printRef} className="container mx-auto p-4 space-y-6 bg-background text-foreground">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-primary">{departmentData.name}</h1>
          <p className="text-muted-foreground">Headed by: {departmentData.head}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentData.budget}</div>
            <p className="text-xs text-muted-foreground">Current fiscal year</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentData.utilization}%</div>
            <Progress value={departmentData.utilization} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentData.projects}</div>
            <p className="text-xs text-muted-foreground">Ongoing initiatives</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentData.impactScore}/100</div>
            <p className="text-xs text-muted-foreground">Based on KPIs</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Description */}
      <Card className="mb-6 shadow-sm">
        <CardHeader>
          <CardTitle>About the Department</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{departmentData.description}</p>
        </CardContent>
      </Card>

      {/* KPIs and Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Progress towards targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpiData.map((kpi) => (
                <div key={kpi.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{kpi.name}</span>
                    <span className="text-sm text-muted-foreground">{kpi.value}% (Target: {kpi.target}%)</span>
                  </div>
                  <Progress value={(kpi.value / kpi.target) * 100} indicatorColor={kpi.color} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Financial Summary (Monthly)</CardTitle>
            <CardDescription>Budget allocation vs. utilization (in Lakhs)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] p-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialSummaryData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}L`} />
                <RechartsTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="allocated" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Allocated" />
                <Bar dataKey="utilized" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Utilized" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Status and Team Members */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Overview of ongoing projects</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center p-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Key personnel in the department</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{member.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Settings/Actions Placeholder */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Department Settings & Actions</CardTitle>
          <CardDescription>Manage department-specific configurations and reports.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Configure KPIs</Button>
          <Button variant="outline"><Users className="mr-2 h-4 w-4" /> Manage Team</Button>
          <Button variant="secondary">Generate Annual Report</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentView;
