
import React from 'react';
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const data = [
  { month: 'Jan', planned: 65, actual: 40 },
  { month: 'Feb', planned: 70, actual: 52 },
  { month: 'Mar', planned: 72, actual: 61 },
  { month: 'Apr', planned: 78, actual: 65 },
  { month: 'May', planned: 82, actual: 70 },
  { month: 'Jun', planned: 88, actual: 73 },
];

const departmentData = [
  { name: 'Health', budget: 1200000, spent: 950000 },
  { name: 'Education', budget: 1500000, spent: 1350000 },
  { name: 'Agriculture', budget: 900000, spent: 750000 },
  { name: 'Infrastructure', budget: 2000000, spent: 1600000 },
  { name: 'Social Welfare', budget: 800000, spent: 760000 },
];

const indicators = [
  { name: 'Healthcare Access', value: 68 },
  { name: 'Education Quality', value: 72 },
  { name: 'Agricultural Output', value: 81 },
  { name: 'Road Connectivity', value: 64 },
  { name: 'Clean Water', value: 76 },
];

const InsightsView = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Monitoring Insights</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Project Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" name="Planned" fill="#8884d8" />
              <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Department Budget Utilization</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              layout="vertical" 
              data={departmentData}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="budget" name="Budget Allocated" fill="#8884d8" />
              <Bar dataKey="spent" name="Budget Utilized" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Key Performance Indicators Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={indicators.map(item => ({
              ...item,
              benchmark: 70
            }))}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Current Value" />
            <Line type="monotone" dataKey="benchmark" stroke="#ff7300" strokeDasharray="5 5" name="Benchmark" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      
    </div>
  );
};

export default InsightsView;
