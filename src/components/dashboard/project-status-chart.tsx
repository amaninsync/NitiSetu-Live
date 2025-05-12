
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { projectStatusData } from '@/lib/mock-data';

const COLORS = [
  'hsl(var(--muted))',           // Not Started
  'hsl(var(--primary))',         // In Progress
  'hsl(var(--success-500))',     // Completed
  'hsl(var(--warning-500))',     // Delayed
  'hsl(var(--danger-500))'       // Cancelled
];

const ProjectStatusChart: React.FC = () => {
  // Create a config object for the chart
  const chartConfig = projectStatusData.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: COLORS[index % COLORS.length]
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 px-6 pt-6">
        <CardTitle className="text-lg">Project Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-6">
        <div className="h-[350px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={110}
                  innerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                  paddingAngle={2}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="hsl(var(--background))" 
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      formatter={(value, name) => [`${value} Projects`, `${name}`]}
                    />
                  )}
                />
                <ChartLegend
                  content={({ payload }) => (
                    <ChartLegendContent payload={payload} />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatusChart;
