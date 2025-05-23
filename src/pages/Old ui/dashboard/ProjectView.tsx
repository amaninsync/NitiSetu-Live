
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FileCheck, FileClock, AlertCircle, Clock, Calendar } from 'lucide-react';

// Sample project data
const projectSummary = {
  total: 142,
  completed: 78,
  inProgress: 46,
  delayed: 18,
  onTrack: 124,
  totalBudget: "₹1,250 Cr",
  utilizedBudget: "₹842 Cr"
};

const projectsByStatus = [
  { name: 'Completed', value: 78 },
  { name: 'In Progress', value: 46 },
  { name: 'Delayed', value: 18 }
];

const projectsByDepartment = [
  { name: "District Revenue Officer /RDO Asifabad", count: 12, completed: 9, delayed: 1 },
  { name: "Chief Planning Officer", count: 18, completed: 14, delayed: 2 },
  { name: "District Medical & Health Officer", count: 31, completed: 22, delayed: 3 },
  { name: "District Survey Officer (FAC)", count: 10, completed: 6, delayed: 1 },
  { name: "District Civil Supply Officer (FAC)", count: 14, completed: 10, delayed: 2 },
  { name: "District Public Relations Officer (FAC)", count: 9, completed: 5, delayed: 1 },
  { name: "District Rural Development Officer", count: 26, completed: 18, delayed: 4 },
];

const recentProjects = [
  { 
    id: 'PRJ-2024-201', 
    name: 'Revenue Office Digital Transformation', 
    department: 'District Revenue Officer (RDO)', 
    budget: '₹35 Cr', 
    progress: 70, 
    status: 'In Progress',
    timeline: 'Jan 2024 - Dec 2025'
  },
  { 
    id: 'PRJ-2024-189', 
    name: 'Integrated Rural Development Program', 
    department: 'District Rural Development Officer', 
    budget: '₹65 Cr', 
    progress: 50, 
    status: 'In Progress',
    timeline: 'Mar 2024 - Mar 2026'
  },
  { 
    id: 'PRJ-2024-177', 
    name: 'District School Infrastructure Upgrade', 
    department: 'District Education Officer', 
    budget: '₹40 Cr', 
    progress: 85, 
    status: 'In Progress',
    timeline: 'Feb 2024 - Dec 2024'
  },
  { 
    id: 'PRJ-2024-168', 
    name: 'District Healthcare Facility Expansion', 
    department: 'District Medical & Health Officer', 
    budget: '₹75 Cr', 
    progress: 60, 
    status: 'In Progress',
    timeline: 'Apr 2024 - Jun 2026'
  },
  { 
    id: 'PRJ-2024-155', 
    name: 'Employment Training & Skill Development', 
    department: 'District Welfare Officer', 
    budget: '₹20 Cr', 
    progress: 95, 
    status: 'Completed',
    timeline: 'Jul 2023 - Jul 2024'
  },
  { 
    id: 'PRJ-2024-142', 
    name: 'Urban Road Safety Enhancement', 
    department: 'Executive Engineer (R&B)', 
    budget: '₹110 Cr', 
    progress: 40, 
    status: 'In Progress',
    timeline: 'May 2024 - Dec 2026'
  },
  { 
    id: 'PRJ-2024-136', 
    name: 'Women Entrepreneurship Support Program', 
    department: 'District Minorities Welfare Officer (FAC)', 
    budget: '₹25 Cr', 
    progress: 100, 
    status: 'Completed',
    timeline: 'Aug 2023 - Jun 2024'
  },
  { 
    id: 'PRJ-2024-129', 
    name: 'E-Governance System for District Planning', 
    department: 'Chief Planning Officer', 
    budget: '₹50 Cr', 
    progress: 75, 
    status: 'In Progress',
    timeline: 'Jan 2024 - Jan 2025'
  },
  { 
    id: 'PRJ-2024-121', 
    name: 'Agricultural Water Conservation Project', 
    department: 'District Agriculture Officer (FAC)', 
    budget: '₹45 Cr', 
    progress: 55, 
    status: 'In Progress',
    timeline: 'Mar 2024 - Mar 2025'
  },
  { 
    id: 'PRJ-2024-113', 
    name: 'Smart Traffic Management System', 
    department: 'District Transport Officer', 
    budget: '₹90 Cr', 
    progress: 30, 
    status: 'Delayed',
    timeline: 'Feb 2024 - Apr 2026'
  }
];

const COLORS = ['#10b981', '#3b82f6', '#f97316'];

const ProjectView = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed': 
        return <FileCheck size={16} className="text-green-500" />;
      case 'In Progress': 
        return <FileClock size={16} className="text-blue-500" />;
      case 'Delayed': 
        return <AlertCircle size={16} className="text-orange-500" />;
      default: 
        return <Clock size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Projects Dashboard</h1>
      
      {/* Project Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <FileCheck size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Projects</p>
                <p className="text-2xl font-bold">{projectSummary.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <FileClock size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-2xl font-bold">{projectSummary.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                <AlertCircle size={24} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Delayed Projects</p>
                <p className="text-2xl font-bold">{projectSummary.delayed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <Calendar size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Projects</p>
                <p className="text-2xl font-bold">{projectSummary.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Project Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Projects by Status</CardTitle>
            <CardDescription>Distribution of projects based on completion status</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer 
              config={{
                Completed: {
                  label: "Completed",
                  theme: {
                    light: "#10b981",
                    dark: "#34d399",
                  },
                },
                "In Progress": {
                  label: "In Progress",
                  theme: {
                    light: "#3b82f6",
                    dark: "#60a5fa",
                  },
                },
                Delayed: {
                  label: "Delayed",
                  theme: {
                    light: "#f97316",
                    dark: "#fb923c",
                  },
                },
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={projectsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {projectsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Projects by Department</CardTitle>
            <CardDescription>Number of projects across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                count: {
                  label: "Total Projects",
                  theme: {
                    light: "#3b82f6",
                    dark: "#60a5fa",
                  },
                },
                completed: {
                  label: "Completed",
                  theme: {
                    light: "#10b981",
                    dark: "#34d399",
                  },
                },
                delayed: {
                  label: "Delayed",
                  theme: {
                    light: "#f97316",
                    dark: "#fb923c",
                  },
                },
              }}
              className="h-[300px]"
            >
              <BarChart
                data={projectsByDepartment}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Total" />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
                <Bar dataKey="delayed" fill="#f97316" name="Delayed" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Project List */}
      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
          <CardDescription>View and manage district projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All Projects</TabsTrigger>
              <TabsTrigger value="in-progress" onClick={() => setActiveTab('in-progress')}>In Progress</TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setActiveTab('completed')}>Completed</TabsTrigger>
              <TabsTrigger value="delayed" onClick={() => setActiveTab('delayed')}>Delayed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.id}</TableCell>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.department}</TableCell>
                      <TableCell>{project.timeline}</TableCell>
                      <TableCell>{project.budget}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="h-2 w-24" />
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(project.status)}
                          <span>{project.status}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="in-progress" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProjects
                    .filter(project => project.status === 'In Progress')
                    .map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.id}</TableCell>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.department}</TableCell>
                        <TableCell>{project.timeline}</TableCell>
                        <TableCell>{project.budget}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress} className="h-2 w-24" />
                            <span className="text-sm">{project.progress}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Budget</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProjects
                    .filter(project => project.status === 'Completed')
                    .map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.id}</TableCell>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.department}</TableCell>
                        <TableCell>{project.timeline}</TableCell>
                        <TableCell>{project.budget}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="delayed" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProjects
                    .filter(project => project.status === 'Delayed')
                    .map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.id}</TableCell>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.department}</TableCell>
                        <TableCell>{project.timeline}</TableCell>
                        <TableCell>{project.budget}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress} className="h-2 w-24" />
                            <span className="text-sm">{project.progress}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectView;
