
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { budgetUtilizationData } from '@/lib/mock-data';

const BudgetChart: React.FC = () => {
  const chartConfig = {
    allocated: {
      label: "Budget Allocated",
      color: "hsl(var(--primary))"
    },
    utilized: {
      label: "Budget Utilized", 
      color: "hsl(var(--success-500))"
    }
  };

  return (
    <Card className="col-span-2 overflow-hidden">
      <CardHeader className="pb-2 px-6 pt-6">
        <CardTitle className="text-lg">Budget Allocation & Utilization (₹ Cr)</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-6">
        <div className="h-[350px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={budgetUtilizationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  dx={-10}
                />
                <ChartTooltip 
                  content={({ active, payload }) => (
                    <ChartTooltipContent 
                      active={active} 
                      payload={payload}
                      formatter={(value) => [`₹ ${value} Cr`, null]}
                    />
                  )}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingTop: 8 }}
                />
                <Bar 
                  dataKey="allocated" 
                  name="Budget Allocated" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
                <Bar 
                  dataKey="utilized" 
                  name="Budget Utilized" 
                  fill="hsl(var(--success-500))" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetChart;
