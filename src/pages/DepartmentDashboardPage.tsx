
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MetricCard from '@/components/dashboard/metric-card';
import BudgetChart from '@/components/dashboard/budget-chart';
import PerformanceChart from '@/components/dashboard/performance-chart';
import ProjectStatusChart from '@/components/dashboard/project-status-chart';
import { ChevronRight, Users, Briefcase, BarChart3, FileText, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample department data - in a real app, this would come from an API
const departments = [
  { id: 'health', name: 'Health Department', color: 'bg-sequence-teal-500' },
  { id: 'education', name: 'Education Department', color: 'bg-sequence-green-500' },
  { id: 'rural', name: 'Rural Development', color: 'bg-primary' },
  { id: 'urban', name: 'Urban Planning', color: 'bg-warning-500' },
  { id: 'agriculture', name: 'Agriculture', color: 'bg-success-500' },
];

// Sample department metrics
const departmentMetrics = (departmentId: string) => [
  {
    id: `${departmentId}-budget`,
    title: 'Budget Allocation',
    value: '₹ 45.2 Cr',
    change: 12.6,
    status: 'positive',
    icon: BarChart3
  },
  {
    id: `${departmentId}-projects`,
    title: 'Active Projects',
    value: '24',
    change: 8.4,
    status: 'positive',
    icon: Briefcase
  },
  {
    id: `${departmentId}-staff`,
    title: 'Staff Count',
    value: '132',
    change: 3.2,
    status: 'positive',
    icon: Users
  },
  {
    id: `${departmentId}-reports`,
    title: 'Pending Reports',
    value: '7',
    change: -2.1,
    status: 'negative',
    icon: FileText
  }
];

// Sample KPI data
const kpiData = [
  { name: 'Target Achievement', score: 78 },
  { name: 'Budget Utilization', score: 65 },
  { name: 'Project Timeline', score: 82 },
  { name: 'Quality Standards', score: 91 },
  { name: 'Citizen Satisfaction', score: 76 }
];

const DepartmentDashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const departmentId = searchParams.get('id') || 'health';
  
  const currentDepartment = departments.find(d => d.id === departmentId) || departments[0];
  
  // For switching departments
  const handleDepartmentChange = (id: string) => {
    setSearchParams({ id });
  };
  
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <span>Dashboards</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Department Dashboard</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mt-2">{currentDepartment.name}</h1>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-2 bg-muted px-3 py-1.5 rounded-md">
          <CalendarIcon className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="budget">Budget & Finance</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Department selector */}
          <div className="flex flex-wrap gap-2">
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => handleDepartmentChange(dept.id)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  departmentId === dept.id 
                    ? `${dept.color} text-white` 
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {dept.name}
              </button>
            ))}
          </div>
          
          {/* Department metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {departmentMetrics(departmentId).map((metric) => (
              <MetricCard key={metric.id} metric={metric} className="shadow-sm" />
            ))}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BudgetChart />
            <DepartmentKPIChart data={kpiData} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProjectStatusChart />
            <RecentActivitiesCard departmentId={departmentId} />
          </div>
        </TabsContent>
        
        {/* Placeholder content for other tabs */}
        <TabsContent value="projects">
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Department Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Project listing and details will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget">
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Budget & Finance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed budget analysis will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff">
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Staff Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Staff listing and management will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartmentDashboardPage;
