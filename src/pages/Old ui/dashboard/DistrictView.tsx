import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Download, Printer, Users, Briefcase, Target, TrendingUp, DollarSign, Settings, MapPin, BookOpen, BarChart2, Building, PieChart as PieChartIcon, AlertTriangle, CheckCircle2, Clock
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useReactToPrint } from 'react-to-print';
import { ChartContainer, ChartConfig, ChartTooltipContent } from '@/components/ui/chart'; // Added ChartTooltipContent
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // Added DropdownMenu imports

// Mock Data (similar to DistrictDashboard.tsx for consistency)
const districtData = {
  name: "Kumuram Bheem Asifabad",
  population: "5.15 Lakhs",
  area: "4,878 sq km",
  literacyRate: "66.5%",
  collector: "Sri Rahul Raj P S, IAS",
  sp: "Sri K Suresh Kumar, IPS",
  budget: "₹250 Cr",
  utilization: 75,
  projects: 120,
  impactScore: 78,
  description: "Kumuram Bheem Asifabad is an aspirational district in Telangana, India. It is undergoing significant development initiatives across various sectors to improve socio-economic indicators."
};

const kpiData = [
  { id: "health", name: 'Health & Nutrition', value: 70, target: 85, icon: <Users className="h-4 w-4" />, color: "hsl(var(--chart-1))" },
  { id: "education", name: 'Education', value: 65, target: 80, icon: <BookOpen className="h-4 w-4" />, color: "hsl(var(--chart-2))" },
  { id: "agri", name: 'Agriculture & Water', value: 75, target: 90, icon: <Briefcase className="h-4 w-4" />, color: "hsl(var(--chart-3))" },
  { id: "infra", name: 'Basic Infrastructure', value: 60, target: 75, icon: <Building className="h-4 w-4" />, color: "hsl(var(--chart-4))" },
  { id: "finance", name: 'Financial Inclusion', value: 80, target: 90, icon: <DollarSign className="h-4 w-4" />, color: "hsl(var(--chart-5))" },
];

const projectStatusData = [
  { name: 'Completed', value: 70, fill: "hsl(var(--chart-1))", icon: <CheckCircle2 /> },
  { name: 'In Progress', value: 35, fill: "hsl(var(--chart-2))", icon: <Clock /> },
  { name: 'Delayed', value: 10, fill: "hsl(var(--chart-3))", icon: <AlertTriangle /> },
  { name: 'Upcoming', value: 5, fill: "hsl(var(--chart-4))", icon: <Target /> },
];

const financialSummaryData = [
  { month: 'Jan', allocated: 20, utilized: 18 },
  { month: 'Feb', allocated: 22, utilized: 20 },
  { month: 'Mar', allocated: 25, utilized: 23 },
  { month: 'Apr', allocated: 18, utilized: 15 },
  { month: 'May', allocated: 24, utilized: 22 },
  { month: 'Jun', allocated: 30, utilized: 28 },
];

const demographicData = [
    { name: 'Male', value: 260000, fill: "hsl(var(--chart-1))" },
    { name: 'Female', value: 255835, fill: "hsl(var(--chart-2))" },
];

const sectoralPerformanceData = [
  { sector: 'Health', score: 70, budget: 50, utilization: 80 },
  { sector: 'Education', score: 65, budget: 60, utilization: 75 },
  { sector: 'Agriculture', score: 75, budget: 40, utilization: 85 },
  { sector: 'Infrastructure', score: 60, budget: 70, utilization: 70 },
  { sector: 'Finance', score: 80, budget: 30, utilization: 90 },
];

const defaultChartConfig: ChartConfig = {
  value: { label: "Value", color: "hsl(var(--chart-1))" },
  allocated: { label: "Allocated (Cr)", color: "hsl(var(--chart-1))" },
  utilized: { label: "Utilized (Cr)", color: "hsl(var(--chart-2))" },
  score: { label: "Score", color: "hsl(var(--chart-1))"},
  budget: { label: "Budget (Cr)", color: "hsl(var(--chart-2))"},
  utilization: { label: "Utilization (%)", color: "hsl(var(--chart-3))"},
  default: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
  male: { label: "Male", color: "hsl(var(--chart-1))" },
  female: { label: "Female", color: "hsl(var(--chart-2))" },
  // Add other keys from kpiData with their respective colors for ChartContainer if needed
  health: { label: kpiData.find(k=>k.id==='health')?.name, color: kpiData.find(k=>k.id==='health')?.color },
  education: { label: kpiData.find(k=>k.id==='education')?.name, color: kpiData.find(k=>k.id==='education')?.color },
  agri: { label: kpiData.find(k=>k.id==='agri')?.name, color: kpiData.find(k=>k.id==='agri')?.color },
  infra: { label: kpiData.find(k=>k.id==='infra')?.name, color: kpiData.find(k=>k.id==='infra')?.color },
  finance: { label: kpiData.find(k=>k.id==='finance')?.name, color: kpiData.find(k=>k.id==='finance')?.color },
};


const ExportableCard = ({ children, title }: { children: React.ReactNode, title: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // Dummy export functions for now
  const exportToPNG = () => console.log(`Exporting ${title} to PNG...`);
  const exportToPDF = () => console.log(`Exporting ${title} to PDF...`);

  return (
    <Card ref={cardRef} className="shadow-sm hover:shadow-md transition-shadow relative">
       <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={exportToPNG}>Export as PNG</DropdownMenuItem>
            <DropdownMenuItem onClick={exportToPDF}>Export as PDF</DropdownMenuItem>
            {/* Add more export options if needed */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </Card>
  );
};


const DistrictView = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const kpiChartRef = useRef<HTMLDivElement>(null);
  const projectStatusChartRef = useRef<HTMLDivElement>(null);
  const financialChartRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current, // Corrected
    documentTitle: `${districtData.name}-District-Report`,
  });
  

  return (
    <div ref={printRef} className="container mx-auto p-4 md:p-6 space-y-6 bg-background text-foreground">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center">
            <MapPin className="mr-3 h-8 w-8 text-primary/80" />
            {districtData.name}
          </h1>
          <p className="text-muted-foreground ml-11">Aspirational District Dashboard</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print Report
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => console.log("Exporting Full Report PDF")}>Full Report (PDF)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Exporting Data (Excel)")}>All Data (Excel)</DropdownMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Export Chart...</DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right">
                    <DropdownMenuItem onClick={() => console.log("Exporting KPI Chart")}>KPI Chart (PNG)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Exporting Project Status Chart")}>Project Status (PNG)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Exporting Financial Chart")}>Financial Chart (PNG)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Population</CardDescription>
            <CardTitle className="text-3xl">{districtData.population}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">As per census 2023</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Area</CardDescription>
            <CardTitle className="text-3xl">{districtData.area}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Geographical coverage</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Literacy Rate</CardDescription>
            <CardTitle className="text-3xl">{districtData.literacyRate}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={parseFloat(districtData.literacyRate)} className="h-2" />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Overall Impact</CardDescription>
            <CardTitle className="text-3xl">{districtData.impactScore}/100</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={districtData.impactScore} indicatorColor="hsl(var(--primary))" className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* District Overview & Collector/SP Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>District Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{districtData.description}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Key Officials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium">District Collector & Magistrate</p>
              <p className="text-muted-foreground">{districtData.collector}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Superintendent of Police</p>
              <p className="text-muted-foreground">{districtData.sp}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs Section */}
      <ExportableCard title="Key Performance Indicators">
        <CardHeader ref={kpiChartRef}>
          <CardTitle>Key Performance Indicators (KPIs)</CardTitle>
          <CardDescription>Tracking progress across vital sectors.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpiData.map((kpi) => (
              <Card key={kpi.name} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    {React.cloneElement(kpi.icon, { className: `mr-2 h-5 w-5 text-[${kpi.color}]`})}
                    {kpi.name}
                  </CardTitle>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white bg-[${kpi.color}]`}>
                    {((kpi.value / kpi.target) * 100).toFixed(0)}%
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{kpi.value}
                    <span className="text-sm text-muted-foreground"> / {kpi.target}</span>
                  </div>
                  <Progress value={(kpi.value / kpi.target) * 100} className="mt-2 h-2" indicatorColor={kpi.color} />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </ExportableCard>

      {/* Charts Section - Project Status & Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ExportableCard title="Project Status">
          <CardHeader ref={projectStatusChartRef}>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Overview of all developmental projects.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] p-0 flex items-center justify-center">
             <ChartContainer config={defaultChartConfig} className="w-full h-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <RechartsTooltip 
                    cursor={{ fill: "hsl(var(--muted))" }} 
                    content={<ChartTooltipContent hideLabel />} 
                  />
                  <Pie 
                    data={projectStatusData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    innerRadius={70}
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                   <Legend content={({ payload }) => (
                    <div className="flex items-center justify-center gap-4 mt-4">
                      {payload?.map((entry: any, index: number) => (
                        <div key={`item-${index}`} className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: entry.color }}/>
                          <span className="text-xs text-muted-foreground">{entry.value} ({projectStatusData.find(p=>p.name === entry.value)?.value})</span>
                        </div>
                      ))}
                    </div>
                  )}/>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </ExportableCard>

        <ExportableCard title="Financial Summary">
          <CardHeader ref={financialChartRef}>
            <CardTitle>Monthly Financial Summary</CardTitle>
            <CardDescription>Allocated vs. Utilized Budget (in Crores)</CardHeader>
          </CardHeader>
          <CardContent className="h-[350px] p-0">
            <ChartContainer config={defaultChartConfig} className="w-full h-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialSummaryData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}Cr`} />
                  <RechartsTooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent />}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Bar dataKey="allocated" fill={defaultChartConfig.allocated.color} radius={[4, 4, 0, 0]} name="Allocated" />
                  <Bar dataKey="utilized" fill={defaultChartConfig.utilized.color} radius={[4, 4, 0, 0]} name="Utilized" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </ExportableCard>
      </div>
      
      {/* Demographics and Sectoral Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ExportableCard title="Demographics">
          <CardHeader>
            <CardTitle>District Demographics</CardTitle>
            <CardDescription>Population distribution by gender (approx.)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center p-0">
            <ChartContainer config={defaultChartConfig} className="w-full h-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <RechartsTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={demographicData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {demographicData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </ExportableCard>

        <ExportableCard title="Sectoral Performance">
          <CardHeader>
            <CardTitle>Sectoral Performance Overview</CardTitle>
            <CardDescription>Scores, budget, and utilization across key sectors.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] p-0">
             <ChartContainer config={defaultChartConfig} className="w-full h-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectoralPerformanceData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="sector" type="category" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <RechartsTooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }} 
                    content={<ChartTooltipContent />} 
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }}/>
                  <Bar dataKey="score" fill={defaultChartConfig.score.color} name="Score" barSize={15} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="budget" fill={defaultChartConfig.budget.color} name="Budget (Cr)" barSize={15} radius={[0, 4, 4, 0]} />
                  {/* <Bar dataKey="utilization" fill={defaultChartConfig.utilization.color} name="Utilization (%)" barSize={15} radius={[0,4,4,0]}/> */}
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </ExportableCard>
      </div>


      {/* Action Buttons / Quick Links */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions & Reports</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="default"><Briefcase className="mr-2 h-4 w-4" /> View All Projects</Button>
          <Button variant="outline"><BarChart2 className="mr-2 h-4 w-4" /> Detailed Analytics</Button>
          <Button variant="outline"><Users className="mr-2 h-4 w-4" /> Department Views</Button>
          <Button variant="secondary"><Settings className="mr-2 h-4 w-4" /> Configure Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistrictView;
