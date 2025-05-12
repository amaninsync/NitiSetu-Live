
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { departmentPerformanceData } from '@/lib/mock-data';

const PerformanceChart: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Department Performance Score</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={departmentPerformanceData}
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value) => [`${value}`, 'Performance Score']} />
              <Bar 
                dataKey="score" 
                name="Overall Score" 
                fill="#0062af"
                radius={[0, 4, 4, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
