
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Printer } from "lucide-react";
import { useReactToPrint } from 'react-to-print';
import { 
  districtOverview, 
  keyIndicators, 
  departmentPerformance, 
  monthlyData 
} from '@/data/district-dashboard-data';
import { ExportableCard, ExportableTable, ExportableChart } from '@/components/exportable/ExportableComponents';

export const DistrictView: React.FC = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const printOptions = {
    content: () => dashboardRef.current,
    documentTitle: `${districtOverview.name} District Dashboard Report`,
    onBeforeGetContent: () => {
      console.log('Preparing to print dashboard');
      return Promise.resolve();
    },
    onAfterPrint: () => console.log('Dashboard printed successfully')
  };
  const handlePrint = useReactToPrint(printOptions);
  
  return (
    <div className="space-y-6" ref={dashboardRef}>
      {/* Header with Print Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">District View</h1>
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="h-4 w-4 mr-2" /> Print Report
        </Button>
      </div>
      
      {/* District Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <ExportableCard title="District Profile">
          <CardHeader className="pb-2">
            <CardTitle>District Profile</CardTitle>
            <CardDescription>Key metrics for {districtOverview.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Population</span>
                <span className="font-medium">{districtOverview.population}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Area</span>
                <span className="font-medium">{districtOverview.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Literacy Rate</span>
                <span className="font-medium">{districtOverview.literacy}</span>
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
                <span className="text-3xl font-bold">{districtOverview.budgetUtilization}%</span>
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
                  strokeDasharray={`${districtOverview.budgetUtilization * 2.51} 251`}
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
                <span className="text-sm font-medium">{districtOverview.impactScore}/100</span>
              </div>
              <Progress value={districtOverview.impactScore} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Needs Improvement</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>
          </CardContent>
        </ExportableCard>
      </div>
      
      {/* Key Indicators */}
      <ExportableCard title="Key District Indicators">
        <CardHeader>
          <CardTitle>Key District Indicators</CardTitle>
          <CardDescription>Development metrics across sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            {keyIndicators.map((indicator) => (
              <div key={indicator.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{indicator.name}</span>
                  <span className="text-sm font-medium">{indicator.count}</span>
                </div>
                <Progress value={indicator.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </ExportableCard>
      
      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Budget allocation vs utilization by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <ExportableTable data={departmentPerformance} title="Department Performance Table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Budget (Cr)</TableHead>
                    <TableHead className="text-right">Spent (Cr)</TableHead>
                    <TableHead className="text-right">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentPerformance.map((dept) => (
                    <TableRow key={dept.name}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell className="text-right">₹{dept.budget}</TableCell>
                      <TableCell className="text-right">₹{dept.spent}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="mr-2 text-sm">{dept.progress}%</span>
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500" 
                              style={{ width: `${dept.progress}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ExportableTable>
            
            <ExportableChart title="Monthly Budget Performance">
              <ChartContainer 
                config={{
                  budget: {
                    label: "Budget",
                    theme: {
                      light: "#3b82f6", 
                      dark: "#60a5fa",  
                    },
                  },
                  actual: {
                    label: "Actual",
                    theme: {
                      light: "#10b981", 
                      dark: "#34d399",  
                    },
                  },
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="budget"
                      stroke="var(--color-budget)" 
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" /> 
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ExportableChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistrictView;
