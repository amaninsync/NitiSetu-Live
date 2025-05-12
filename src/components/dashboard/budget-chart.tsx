
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { budgetUtilizationData } from '@/lib/mock-data';

const BudgetChart: React.FC = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Budget Allocation & Utilization (₹ Cr)</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budgetUtilizationData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹ ${value} Cr`, ``]} />
              <Legend />
              <Bar dataKey="allocated" name="Budget Allocated" fill="#3381bf" />
              <Bar dataKey="utilized" name="Budget Utilized" fill="#00c000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetChart;
