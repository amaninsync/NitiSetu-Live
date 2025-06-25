import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MetricCard from '../common/MetricCard';
import { dmhoMetrics } from '@/app/data/staticData';
import RecentActivitiesCard from '../common/RecentActivitiesCard'; // Assuming health department also has recent activities

const HealthDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Health Department Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dmhoMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} className="hover:scale-105 transition-transform" />
        ))}
      </div>

      {/* Placeholder for Health specific charts/visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Health Statistics Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Charts and detailed health statistics will be displayed here.
            </div>
          </CardContent>
        </Card>
        <RecentActivitiesCard departmentId="health" />
      </div>
      
      {/* You can add more health-specific components here */}
    </div>
  );
};

export default HealthDashboard;