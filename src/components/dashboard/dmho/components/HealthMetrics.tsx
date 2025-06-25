import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Users, AlertTriangle } from 'lucide-react';

// This is a simplified version; in a real app, this data would likely come from staticData or an API.
const healthOverviewMetrics = [
  { id: 'beds', title: 'Available Beds', value: '150', icon: HeartPulse },
  { id: 'patients', title: 'Current Patients', value: '85', icon: Users },
  { id: 'emergencies', title: 'Daily Emergencies', value: '12', icon: AlertTriangle },
];

const HealthMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {healthOverviewMetrics.map(metric => (
        <Card key={metric.id}>
          <CardContent className="p-4 flex items-center space-x-3">
            <metric.icon className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              <p className="text-xl font-bold">{metric.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HealthMetrics;