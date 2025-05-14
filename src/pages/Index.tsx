
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import MetricCard from '@/components/dashboard/metric-card';
import BudgetChart from '@/components/dashboard/budget-chart';
import PerformanceChart from '@/components/dashboard/performance-chart';
import ProjectStatusChart from '@/components/dashboard/project-status-chart';
import { mockDistrictMetrics } from '@/lib/mock-data';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">District Dashboard</h1>
        <div className="flex items-center text-sm text-muted-foreground gap-2 bg-muted px-3 py-1.5 rounded-md">
          <CalendarIcon className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      {/* Dashboard navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        <Link to="/department">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                Department Dashboard
                <ArrowRight className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View detailed department-wise performance, budgets, and projects
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/project">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                Project Dashboard
                <ArrowRight className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track progress, timelines, and resources for all district projects
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/table-view">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                Reports & Data
                <ArrowRight className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access and manage all district reports and data tables
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {mockDistrictMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} className="shadow-sm" />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BudgetChart />
        <ProjectStatusChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <div className="card bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-2">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="px-6 pb-6">
            <div className="space-y-6">
              <ActivityItem 
                title="Budget allocation for Q3 approved"
                time="2 hours ago"
              />
              <ActivityItem 
                title="Rural Road Connectivity project updated"
                time="5 hours ago"
              />
              <ActivityItem 
                title="Monthly department reports submitted"
                time="Yesterday"
              />
              <ActivityItem 
                title="New user accounts created for Health department"
                time="2 days ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  title: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, time }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1.5 rounded-full bg-primary/10 p-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
};

export default Dashboard;
