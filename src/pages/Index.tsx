
import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import MetricCard from '@/components/dashboard/metric-card';
import BudgetChart from '@/components/dashboard/budget-chart';
import PerformanceChart from '@/components/dashboard/performance-chart';
import ProjectStatusChart from '@/components/dashboard/project-status-chart';
import { mockDistrictMetrics } from '@/lib/mock-data';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">District Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mockDistrictMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BudgetChart />
        <ProjectStatusChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <div className="nitisetu-card overflow-hidden">
          <div className="nitisetu-card-header">
            <h3 className="nitisetu-card-title">Recent Activity</h3>
          </div>
          <div className="nitisetu-card-content">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-1 rounded-full bg-primary/10 p-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Budget allocation for Q3 approved</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1 rounded-full bg-primary/10 p-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Rural Road Connectivity project updated</p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1 rounded-full bg-primary/10 p-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Monthly department reports submitted</p>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1 rounded-full bg-primary/10 p-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">New user accounts created for Health department</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
