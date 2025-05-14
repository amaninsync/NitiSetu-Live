
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  CalendarIcon, 
  ClockIcon, 
  Users, 
  BarChart3, 
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample project data - in a real app, this would come from an API
const projects = [
  { 
    id: 'rural-roads', 
    name: 'Rural Road Connectivity', 
    department: 'Rural Development',
    status: 'in_progress',
    progress: 65,
    startDate: '2025-01-15',
    endDate: '2025-08-30',
    budget: 12.5,
    budgetUtilized: 7.8,
  },
  { 
    id: 'vaccination', 
    name: 'District Vaccination Drive', 
    department: 'Health',
    status: 'in_progress',
    progress: 78,
    startDate: '2025-02-10',
    endDate: '2025-06-30',
    budget: 8.2,
    budgetUtilized: 6.4,
  },
  { 
    id: 'digital-literacy', 
    name: 'Digital Literacy Campaign', 
    department: 'Education',
    status: 'in_progress',
    progress: 42,
    startDate: '2025-03-01',
    endDate: '2025-12-15',
    budget: 5.6,
    budgetUtilized: 2.3,
  },
  { 
    id: 'water-conservation', 
    name: 'Water Conservation Initiative', 
    department: 'Agriculture',
    status: 'in_progress',
    progress: 35,
    startDate: '2025-04-05',
    endDate: '2026-03-31',
    budget: 7.3,
    budgetUtilized: 2.1,
  }
];

// Status mapping for display
const statusDisplay: Record<string, { label: string, color: string }> = {
  'not_started': { label: 'Not Started', color: 'bg-muted text-muted-foreground' },
  'in_progress': { label: 'In Progress', color: 'bg-sequence-teal-500 text-white' },
  'completed': { label: 'Completed', color: 'bg-success-500 text-white' },
  'delayed': { label: 'Delayed', color: 'bg-warning-500 text-white' },
  'on_hold': { label: 'On Hold', color: 'bg-danger-500 text-white' }
};

// Sample milestone data
const getMilestones = (projectId: string) => [
  {
    id: `${projectId}-1`,
    title: 'Planning Phase',
    deadline: '2025-02-28',
    status: 'completed',
    progress: 100
  },
  {
    id: `${projectId}-2`,
    title: 'Procurement',
    deadline: '2025-04-15',
    status: 'completed',
    progress: 100
  },
  {
    id: `${projectId}-3`,
    title: 'Implementation',
    deadline: '2025-07-30',
    status: 'in_progress',
    progress: 60
  },
  {
    id: `${projectId}-4`,
    title: 'Testing & Quality Control',
    deadline: '2025-08-15',
    status: 'not_started',
    progress: 0
  },
  {
    id: `${projectId}-5`,
    title: 'Project Closure',
    deadline: '2025-08-30',
    status: 'not_started',
    progress: 0
  }
];

// Helper function to calculate days remaining
const getDaysRemaining = (endDate: string) => {
  const end = new Date(endDate);
  const today = new Date();
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper function to format budget values
const formatBudget = (value: number) => {
  return `₹ ${value.toFixed(1)} Cr`;
};

const ProjectDashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectId = searchParams.get('id') || 'rural-roads';
  
  const currentProject = projects.find(p => p.id === projectId) || projects[0];
  const milestones = getMilestones(projectId);
  const daysRemaining = getDaysRemaining(currentProject.endDate);
  
  // For switching projects
  const handleProjectChange = (id: string) => {
    setSearchParams({ id });
  };
  
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <span>Dashboards</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Project Dashboard</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mt-2">{currentProject.name}</h1>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-2 bg-muted px-3 py-1.5 rounded-md">
          <CalendarIcon className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      {/* Project selector */}
      <div className="flex flex-wrap gap-2">
        {projects.map(project => (
          <button
            key={project.id}
            onClick={() => handleProjectChange(project.id)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md transition-colors",
              projectId === project.id 
                ? "bg-sequence-teal-500 text-white" 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {project.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Project Overview Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">{currentProject.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={statusDisplay[currentProject.status].color}>
                  {statusDisplay[currentProject.status].label}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timeline:</span>
                <span className="font-medium">
                  {new Date(currentProject.startDate).toLocaleDateString()} - {new Date(currentProject.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Days Remaining:</span>
                <span className={cn(
                  "font-semibold",
                  daysRemaining < 30 ? "text-danger-500" : "text-success-500"
                )}>
                  {daysRemaining} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">{formatBudget(currentProject.budget)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Utilized:</span>
                <span className="font-medium">{formatBudget(currentProject.budgetUtilized)} 
                  <span className="text-muted-foreground text-sm"> ({Math.round((currentProject.budgetUtilized/currentProject.budget) * 100)}%)</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Progress Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Progress Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{currentProject.progress}%</span>
                </div>
                <Progress value={currentProject.progress} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium">Budget Utilization</span>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹ 0</span>
                  <span>{formatBudget(currentProject.budget)}</span>
                </div>
                <Progress 
                  value={(currentProject.budgetUtilized / currentProject.budget) * 100} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium">Timeline Progress</span>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{new Date(currentProject.startDate).toLocaleDateString()}</span>
                  <span>{new Date(currentProject.endDate).toLocaleDateString()}</span>
                </div>
                <Progress 
                  value={65} 
                  className="h-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="milestones" className="w-full">
        <TabsList>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="issues">Issues & Risks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Project Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-semibold">{milestone.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Deadline: {new Date(milestone.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge className={statusDisplay[milestone.status].color}>
                        {statusDisplay[milestone.status].label}
                      </Badge>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Completion</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Placeholder content for other tabs */}
        <TabsContent value="team">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Team member listing and management will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Project Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Document repository will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="issues">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Issues & Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Issue tracking and risk management will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDashboardPage;
