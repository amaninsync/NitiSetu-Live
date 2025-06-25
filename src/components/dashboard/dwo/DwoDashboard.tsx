import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PoshanTrackerDashboard from './components/PoshanTrackerSummary';
import MissionShaktiDashboard from './components/MissionShaktiDashboard'; // New
import { dwoMetrics } from '@/app/data/staticData';
import MetricCard from '../common/MetricCard';
import NHTSProjectStatus from '../common/NHTSProjectStatus';
import RecentActivitiesCard from '../common/RecentActivitiesCard';

const DwoDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* DWO Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dwoMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} className="hover:scale-105 transition-transform" />
        ))}
      </div>

      {/* Charts and visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NHTSProjectStatus />
        <RecentActivitiesCard departmentId="dwo" />
      </div>

      {/* Poshan Tracker and Mission Shakti Dashboards */}
      <PoshanTrackerDashboard />
      <MissionShaktiDashboard />
    </div>
  );
};

export default DwoDashboard;