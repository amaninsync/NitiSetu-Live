
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Target, TrendingUp, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';

// Sample KPI data
const kpiSummary = {
  totalIndicators: 48,
  onTrack: 32,
  needAttention: 11,
  offTrack: 5,
};

const sectorPerformance = [
  { name: "Healthcare", score: 84, change: 3 },
  { name: "Education", score: 92, change: 5 },
  { name: "Infrastructure", score: 76, change: -2 },
  { name: "Agriculture", score: 67, change: -3 },
  { name: "Social Welfare", score: 88, change: 4 },
  { name: "Water Supply", score: 78, change: 2 },
  { name: "Sanitation", score: 81, change: 3 },
  { name: "Electricity", score: 90, change: 1 },
];

const kpiData = [
  { id: "KPI-001", name: "Maternal Mortality Rate", category: "Healthcare", baseline: 112, current: 86, target: 70, status: "On Track" },
  { id: "KPI-002", name: "Infant Mortality Rate", category: "Healthcare", baseline: 28, current: 19, target: 15, status: "On Track" },
  { id: "KPI-003", name: "Primary School Enrollment Rate", category: "Education", baseline: "92%", current: "97%", target: "98%", status: "On Track" },
  { id: "KPI-004", name: "Secondary School Dropout Rate", category: "Education", baseline: "14%", current: "9%", target: "5%", status: "Needs Attention" },
  { id: "KPI-005", name: "Road Connectivity to Villages", category: "Infrastructure", baseline: "78%", current: "86%", target: "100%", status: "Needs Attention" },
  { id: "KPI-006", name: "Access to Clean Drinking Water", category: "Water Supply", baseline: "76%", current: "87%", target: "95%", status: "On Track" },
  { id: "KPI-007", name: "Households with Toilets", category: "Sanitation", baseline: "82%", current: "92%", target: "100%", status: "On Track" },
  { id: "KPI-008", name: "Agricultural Productivity (Ton/Hectare)", category: "Agriculture", baseline: 2.8, current: 3.1, target: 4.0, status: "Off Track" },
];

const yearlyProgress = [
  { year: '2020', healthcare: 72, education: 78, infrastructure: 65, agriculture: 60, welfare: 75 },
  { year: '2021', healthcare: 76, education: 82, infrastructure: 70, agriculture: 64, welfare: 80 },
  { year: '2022', healthcare: 80, education: 86, infrastructure: 73, agriculture: 67, welfare: 84 },
  { year: '2023', healthcare: 84, education: 92, infrastructure: 76, agriculture: 67, welfare: 88 },
  { year: '2024', healthcare: 87, education: 95, infrastructure: 78, agriculture: 70, welfare: 92 },
];

// Radar chart data
const radarData = [
  {
    "subject": "Healthcare",
    "current": 84,
    "target": 95,
    "fullMark": 100
  },
  {
    "subject": "Education",
    "current": 92,
    "target": 98,
    "fullMark": 100
  },
  {
    "subject": "Infrastructure",
    "current": 76,
    "target": 90,
    "fullMark": 100
  },
  {
    "subject": "Agriculture",
    "current": 67,
    "target": 85,
    "fullMark": 100
  },
  {
    "subject": "Social Welfare",
    "current": 88,
    "target": 95,
    "fullMark": 100
  },
  {
    "subject": "Water & Sanitation",
    "current": 79,
    "target": 92,
    "fullMark": 100
  }
];

const MonitoringView = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredKPIs = selectedCategory === "All Categories" 
    ? kpiData 
    : kpiData.filter(kpi => kpi.category === selectedCategory);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Monitoring & Evaluation</h1>
      
      {/* KPI Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <Target size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Indicators</p>
                <p className="text-2xl font-bold">{kpiSummary.totalIndicators}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">On Track</p>
                <p className="text-2xl font-bold">{kpiSummary.onTrack}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-600">
                  <path d="M12 9V12M12 16V16.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Needs Attention</p>
                <p className="text-2xl font-bold">{kpiSummary.needAttention}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Off Track</p>
                <p className="text-2xl font-bold">{kpiSummary.offTrack}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Dashboard */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Trends</CardTitle>
            <CardDescription>Yearly progress across sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                healthcare: {
                  label: "Healthcare",
                  theme: {
                    light: "#8b5cf6",
                    dark: "#a78bfa",
                  },
                },
                education: {
                  label: "Education",
                  theme: {
                    light: "#10b981",
                    dark: "#34d399",
                  },
                },
                infrastructure: {
                  label: "Infrastructure",
                  theme: {
                    light: "#3b82f6",
                    dark: "#60a5fa",
                  },
                },
                agriculture: {
                  label: "Agriculture",
                  theme: {
                    light: "#f97316",
                    dark: "#fb923c",
                  },
                },
                welfare: {
                  label: "Social Welfare",
                  theme: {
                    light: "#ec4899",
                    dark: "#f472b6",
                  },
                },
              }}
              className="h-[300px]"
            >
              <LineChart
                data={yearlyProgress}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="healthcare" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="education" stroke="#10b981" />
                <Line type="monotone" dataKey="infrastructure" stroke="#3b82f6" />
                <Line type="monotone" dataKey="agriculture" stroke="#f97316" />
                <Line type="monotone" dataKey="welfare" stroke="#ec4899" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Radar</CardTitle>
            <CardDescription>Current vs Target achievement</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                current: {
                  label: "Current",
                  theme: {
                    light: "#3b82f6",
                    dark: "#60a5fa",
                  },
                },
                target: {
                  label: "Target",
                  theme: {
                    light: "#10b981",
                    dark: "#34d399",
                  },
                },
              }}
              className="h-[300px]"
            >
              <RadarChart outerRadius={100} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Sector Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Sector Performance</CardTitle>
          <CardDescription>Current status and trends by sector</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {sectorPerformance.map((sector) => (
              <div key={sector.name} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-md font-medium mb-2">{sector.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold">{sector.score}</span>
                  <div className={`flex items-center ${sector.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {sector.change >= 0 ? (
                      <ArrowUp size={16} />
                    ) : (
                      <ArrowDown size={16} />
                    )}
                    <span className="text-sm font-medium">{Math.abs(sector.change)}%</span>
                  </div>
                </div>
                <Progress value={sector.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* KPI List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Tracking progress against targets</CardDescription>
          </div>
          <select 
            className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Infrastructure</option>
            <option>Water Supply</option>
            <option>Sanitation</option>
            <option>Agriculture</option>
          </select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Indicator</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Baseline</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKPIs.map((kpi) => {
                // Calculate a mock progress percentage 
                let progress = 0;
                if (typeof kpi.baseline === 'number' && typeof kpi.current === 'number' && typeof kpi.target === 'number') {
                  progress = Math.min(100, Math.round(((kpi.current - kpi.baseline) / (kpi.target - kpi.baseline)) * 100));
                } else {
                  // Handle percentage strings
                  const baselineNum = parseInt(String(kpi.baseline).replace('%', ''));
                  const currentNum = parseInt(String(kpi.current).replace('%', ''));
                  const targetNum = parseInt(String(kpi.target).replace('%', ''));
                  
                  if (!isNaN(baselineNum) && !isNaN(currentNum) && !isNaN(targetNum)) {
                    progress = Math.min(100, Math.round(((currentNum - baselineNum) / (targetNum - baselineNum)) * 100));
                  }
                }
                
                return (
                  <TableRow key={kpi.id}>
                    <TableCell className="font-medium">{kpi.id}</TableCell>
                    <TableCell>{kpi.name}</TableCell>
                    <TableCell>{kpi.category}</TableCell>
                    <TableCell>{kpi.baseline}</TableCell>
                    <TableCell>{kpi.current}</TableCell>
                    <TableCell>{kpi.target}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={progress} className="h-2 w-16" />
                        <span className="text-sm">{progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        kpi.status === 'On Track' ? 'bg-green-100 text-green-800' : 
                        kpi.status === 'Needs Attention' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {kpi.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringView;
