
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip, Legend } from 'recharts';
import { Printer } from "lucide-react";
import { useReactToPrint } from 'react-to-print';
import { 
  asifabadOverview, 
  aspirationalIndicators, 
  sectoralImprovements,
  deltaRankingChartConfig 
} from '@/data/district-dashboard-data';
import { ExportableCard, ExportableTable, ExportableChart } from '@/components/exportable/ExportableComponents';

export const NITIAayogView: React.FC = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  const printOptions = {
    content: () => dashboardRef.current,
    documentTitle: `${asifabadOverview.name} Aspirational District Report`,
    onBeforeGetContent: () => {
      console.log('Preparing to print NITI Aayog dashboard');
      return Promise.resolve();
    },
    onAfterPrint: () => console.log('NITI Aayog dashboard printed successfully')
  };
  const handlePrint = useReactToPrint(printOptions);
  
  return (
    <div className="space-y-6" ref={dashboardRef}>
      {/* Header with Print Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Aspirational District Dashboard</h1>
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="h-4 w-4 mr-2" /> Print Report
        </Button>
      </div>
      
      {/* District Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <ExportableCard title="District Profile">
          <CardHeader className="pb-2">
            <CardTitle>District Profile</CardTitle>
            <CardDescription>Key metrics for {asifabadOverview.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Population</span>
                <span className="font-medium">{asifabadOverview.population}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Area</span>
                <span className="font-medium">{asifabadOverview.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Literacy Rate</span>
                <span className="font-medium">{asifabadOverview.literacy}</span>
              </div>
            </div>
          </CardContent>
        </ExportableCard>
        
        <ExportableCard title="Budget Utilization">
          <CardHeader className="pb-2">
            <CardTitle>Budget Utilization</CardTitle>
            <CardDescription>Current fiscal year</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[calc(100%-80px)]">
            <div className="relative h-36 w-36">
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold">{asifabadOverview.budgetUtilization}%</span>
                <span className="text-sm text-gray-500">Utilized</span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray={`${asifabadOverview.budgetUtilization * 2.51} 251`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </CardContent>
        </ExportableCard>
        
        <ExportableCard title="Impact Score">
          <CardHeader className="pb-2">
            <CardTitle>Impact Score</CardTitle>
            <CardDescription>Overall development impact</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[calc(100%-80px)]">
            <div className="w-full mt-2">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Score</span>
                <span className="text-sm font-medium">{asifabadOverview.impactScore}/100</span>
              </div>
              <Progress value={asifabadOverview.impactScore} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Needs Improvement</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>
          </CardContent>
        </ExportableCard>
      </div>
      
      {/* Aspirational District Indicators */}
      <ExportableCard title="Aspirational District Indicators">
        <CardHeader>
          <CardTitle>Aspirational District Indicators</CardTitle>
          <CardDescription>NITI Aayog metrics across sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <ExportableTable data={aspirationalIndicators} title="Aspirational Indicators Table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sector</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Rank</TableHead>
                  <TableHead className="text-right">Improvement (YoY)</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aspirationalIndicators.map((indicator) => (
                  <TableRow key={indicator.name}>
                    <TableCell className="font-medium">{indicator.name}</TableCell>
                    <TableCell className="text-right">{indicator.score}/100</TableCell>
                    <TableCell className="text-right">#{indicator.rank}</TableCell>
                    <TableCell className="text-right">+{indicator.improvement}%</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${indicator.score}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ExportableTable>
        </CardContent>
      </ExportableCard>
      
      {/* Sectoral Performance Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Sectoral Performance Trends</CardTitle>
          <CardDescription>Progress over time across key sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <ExportableChart title="Sectoral Progress">
            <ChartContainer 
              config={{ 
                health: {
                  label: "Health & Nutrition",
                  theme: {
                    light: "#ef4444",
                    dark: "#f87171",
                  },
                },
                education: {
                  label: "Education",
                  theme: {
                    light: "#3b82f6",
                    dark: "#60a5fa",
                  },
                },
                agriculture: {
                  label: "Agriculture & Water",
                  theme: {
                    light: "#10b981",
                    dark: "#34d399",
                  },
                },
                infrastructure: {
                  label: "Basic Infrastructure",
                  theme: {
                    light: "#f59e0b",
                    dark: "#fbbf24",
                  },
                },
              }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={sectoralImprovements}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="health"
                    stroke="var(--color-health)"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="education" stroke="var(--color-education)" />
                  <Line type="monotone" dataKey="agriculture" stroke="var(--color-agriculture)" />
                  <Line type="monotone" dataKey="infrastructure" stroke="var(--color-infrastructure)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ExportableChart>
        </CardContent>
      </Card>
      
      {/* Delta Ranking */}
      <ExportableCard title="Delta Ranking">
        <CardHeader>
          <CardTitle>Delta Ranking Improvement</CardTitle>
          <CardDescription>Changes in ranking over last 3 evaluation periods</CardDescription>
        </CardHeader>
        <CardContent>
          <ExportableChart title="Delta Ranking Chart">
            <ChartContainer config={deltaRankingChartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Q1 2024", rank: 87 },
                    { name: "Q2 2024", rank: 72 },
                    { name: "Q3 2024", rank: 58 },
                    { name: "Q4 2024", rank: 47 },
                    { name: "Q1 2025", rank: 32 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} reversed />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="rank" name="Overall Rank" fill="var(--color-rank)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ExportableChart>
        </CardContent>
      </ExportableCard>
    </div>
  );
};

export default NITIAayogView;
