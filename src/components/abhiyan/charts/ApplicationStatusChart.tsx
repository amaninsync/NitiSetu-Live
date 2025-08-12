// src/components/abhiyan/charts/ApplicationStatusChart.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { smartCitiesMissionData } from '../data/abhiyan-data'; // Example data source

interface ApplicationStatusChartProps {
  // You might pass filtered data or an Abhiyan ID if this chart is dynamic
  // For simplicity, we'll use a direct import for now.
}

const ApplicationStatusChart: React.FC<ApplicationStatusChartProps> = () => {
  const projectData = smartCitiesMissionData.projectProgress; // Using Smart Cities as an example

  const completed = projectData.filter(p => p.status === 'Completed').length;
  const inProgress = projectData.filter(p => p.status === 'In Progress').length;
  const pending = projectData.filter(p => p.status === 'Pending').length;
  const total = projectData.length;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-blue-500" />
          Application/Project Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-70px)] flex flex-col justify-center items-center">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Total Projects: {total}</h3>
          <p className="text-sm text-muted-foreground">
            Completed: <span className="font-semibold text-green-600">{completed}</span> |
            In Progress: <span className="font-semibold text-yellow-600">{inProgress}</span> |
            Pending: <span className="font-semibold text-red-600">{pending}</span>
          </p>
        </div>
        <div className="mt-4 w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          {/* Placeholder for an actual chart (e.g., Pie Chart or Bar Chart) */}
          <p>Chart rendering for Application/Project Status</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatusChart;