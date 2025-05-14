
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface KPIData {
  name: string;
  score: number;
}

interface DepartmentKPIChartProps {
  data: KPIData[];
}

const DepartmentKPIChart: React.FC<DepartmentKPIChartProps> = ({ data }) => {
  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--sequence-teal-500))"
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 px-6 pt-6">
        <CardTitle className="text-lg">Key Performance Indicators</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-6">
        <div className="h-[350px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 20, right: 20, left: 100, bottom: 20 }}
                barGap={8}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  horizontal={false} 
                />
                <XAxis 
                  type="number" 
                  domain={[0, 100]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  dy={10}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  dx={-10}
                  width={100}
                />
                <ChartTooltip 
                  content={({ active, payload }) => (
                    <ChartTooltipContent 
                      active={active} 
                      payload={payload}
                      formatter={(value) => [`${value}/100`, 'Score']}
                    />
                  )}
                />
                <Bar 
                  dataKey="score" 
                  name="Score" 
                  fill="hsl(var(--sequence-teal-500))"
                  radius={[0, 4, 4, 0]} 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentKPIChart;
