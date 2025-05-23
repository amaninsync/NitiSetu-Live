
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BarChart3, Download, Filter } from "lucide-react";

const projects = [
  {
    id: "PRJ001",
    name: "Rural Road Construction",
    department: "Infrastructure",
    budget: 2500000,
    spent: 1800000,
    progress: 72,
    status: "On Track",
    deadline: "2024-09-30"
  },
  {
    id: "PRJ002",
    name: "Primary School Renovation",
    department: "Education",
    budget: 1200000,
    spent: 750000,
    progress: 63,
    status: "Delayed",
    deadline: "2024-07-15"
  },
  {
    id: "PRJ003",
    name: "Community Health Center",
    department: "Health",
    budget: 3500000,
    spent: 1500000,
    progress: 43,
    status: "At Risk",
    deadline: "2024-10-31"
  },
  {
    id: "PRJ004",
    name: "Water Supply System",
    department: "Public Utilities",
    budget: 4000000,
    spent: 3200000,
    progress: 80,
    status: "On Track",
    deadline: "2024-08-15"
  },
  {
    id: "PRJ005",
    name: "Solar Power Installation",
    department: "Energy",
    budget: 5500000,
    spent: 4900000,
    progress: 89,
    status: "On Track",
    deadline: "2024-06-30"
  }
];

const MonitoringView = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Project Monitoring Dashboard</h1>
        <Button>
          <BarChart3 className="mr-2 h-4 w-4" /> Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.status === "On Track").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {projects.filter(p => p.status === "Delayed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {projects.filter(p => p.status === "At Risk").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Project Status Tracker</h2>
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Projects</DropdownMenuItem>
                  <DropdownMenuItem>On Track</DropdownMenuItem>
                  <DropdownMenuItem>Delayed</DropdownMenuItem>
                  <DropdownMenuItem>At Risk</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" /> Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Budget Utilization</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.department}</TableCell>
                    <TableCell>₹{(project.spent / 1000000).toFixed(1)}M / ₹{(project.budget / 1000000).toFixed(1)}M</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-[60px]" />
                        <span className="text-xs">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={
                        project.status === "On Track" 
                          ? "text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium" 
                          : project.status === "Delayed" 
                          ? "text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-medium"
                          : "text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-medium"
                      }>
                        {project.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(project.deadline).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MonitoringView;
