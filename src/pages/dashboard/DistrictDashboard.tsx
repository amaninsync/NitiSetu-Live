
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useReactToPrint } from 'react-to-print'; // Removed IReactToPrintProps
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

// Sample district data - unchanged from original file
const districtOverview = {
  name: "Bangalore Urban",
  population: "13.2M",
  area: "2,196 km²",
  literacy: "88.7%",
  budgetUtilization: 74,
  impactScore: 82
};

// Asifabad aspirational district data for NITI Aayog view
const asifabadOverview = {
  name: "Asifabad",
  population: "515,835",
  area: "4,378 km²",
  literacy: "61.5%",
  budgetUtilization: 68,
  impactScore: 59
};

// Aspirational district indicators for NITI Aayog view
const aspirationalIndicators = [
  { name: "Health & Nutrition", score: 62, rank: 32, improvement: 8 },
  { name: "Education", score: 58, rank: 45, improvement: 5 },
  { name: "Agriculture & Water", score: 65, rank: 27, improvement: 10 },
  { name: "Financial Inclusion", score: 54, rank: 51, improvement: 3 },
  { name: "Basic Infrastructure", score: 56, rank: 47, improvement: 7 },
];

const sectoralImprovements = [
  { name: 'Jan', health: 45, education: 40, agriculture: 42, infrastructure: 38 },
  { name: 'Feb', health: 48, education: 42, agriculture: 45, infrastructure: 40 },
  { name: 'Mar', health: 52, education: 45, agriculture: 47, infrastructure: 43 },
  { name: 'Apr', health: 55, education: 48, agriculture: 50, infrastructure: 46 },
  { name: 'May', health: 58, education: 50, agriculture: 53, infrastructure: 49 },
  { name: 'Jun', health: 60, education: 52, agriculture: 58, infrastructure: 52 },
  { name: 'Jul', health: 62, education: 55, agriculture: 61, infrastructure: 54 },
  { name: 'Aug', health: 62, education: 58, agriculture: 63, infrastructure: 55 },
  { name: 'Sep', health: 62, education: 58, agriculture: 65, infrastructure: 56 },
];

const keyIndicators = [
  { name: "Healthcare Centers", count: 248, progress: 85 },
  { name: "Schools", count: 356, progress: 92 },
  { name: "Roads (km)", count: 14563, progress: 78 },
  { name: "Water Projects", count: 87, progress: 62 },
  { name: "Electricity Coverage", count: "98%", progress: 98 },
];

const departmentPerformance = [
  { name: "Healthcare", budget: 325, spent: 287, progress: 88 },
  { name: "Education", budget: 420, spent: 398, progress: 95 },
  { name: "Infrastructure", budget: 580, spent: 392, progress: 68 },
  { name: "Agriculture", budget: 210, spent: 158, progress: 75 },
  { name: "Social Welfare", budget: 175, spent: 162, progress: 93 },
];

const monthlyData = [
  { name: 'Jan', budget: 400, actual: 380 },
  { name: 'Feb', budget: 300, actual: 290 },
  { name: 'Mar', budget: 350, actual: 320 },
  { name: 'Apr', budget: 280, actual: 290 },
  { name: 'May', budget: 290, actual: 270 },
  { name: 'Jun', budget: 330, actual: 320 },
  { name: 'Jul', budget: 360, actual: 310 },
  { name: 'Aug', budget: 400, actual: 370 },
  { name: 'Sep', budget: 420, actual: 380 },
  { name: 'Oct', budget: 450, actual: 400 },
  { name: 'Nov', budget: 480, actual: 430 },
  { name: 'Dec', budget: 520, actual: 490 },
];

const exportUtils = {
  // Export component as image (PNG or JPG)
  exportAsImage: async (elementRef: React.RefObject<HTMLElement>, fileName: string, format = 'png') => {
    if (!elementRef.current) return;
    
    try {
      const canvas = await html2canvas(elementRef.current, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const image = canvas.toDataURL(`image/${format.toLowerCase()}`);
      const link = document.createElement('a');
      link.href = image;
      link.download = `${fileName}.${format.toLowerCase()}`;
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  },
  
  // Export component as PDF
  exportAsPDF: async (elementRef: React.RefObject<HTMLElement>, fileName: string) => {
    if (!elementRef.current) return;
    
    try {
      const canvas = await html2canvas(elementRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 280; // mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  },
  
  // Export table data as Excel/CSV
  exportTableData: (data: any[], fileName: string, format = 'xlsx') => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
      if (format.toLowerCase() === 'xlsx') {
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
      } else {
        XLSX.writeFile(workbook, `${fileName}.csv`);
      }
    } catch (error) {
      console.error('Error exporting table data:', error);
    }
  },
};

/**
 * Exportable Card Component
 */
const ExportableCard = ({ children, title, className = "", exportOptions = true }: { children: React.ReactNode, title: string, className?: string, exportOptions?: boolean }) => {
  const cardRef = useRef(null);
  
  const handleExport = (format: 'png' | 'jpg' | 'pdf') => {
    const sanitizedTitle = title.replace(/\s+/g, '-').toLowerCase();
    
    switch (format) {
      case 'png':
      case 'jpg':
        exportUtils.exportAsImage(cardRef, sanitizedTitle, format);
        break;
      case 'pdf':
        exportUtils.exportAsPDF(cardRef, sanitizedTitle);
        break;
      default:
        console.error('Unsupported export format');
    }
  };
  
  return (
    <Card className={`relative ${className}`} ref={cardRef}>
      {exportOptions && (
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('png')}>
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('jpg')}>
                Export as JPG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {children}
    </Card>
  );
};

/**
 * Exportable Table Component
 */
const ExportableTable = ({ data, title, children }: { data: any[], title: string, children: React.ReactNode }) => {
  const tableRef = useRef(null);
  
  const handleExport = (format: 'png' | 'pdf' | 'xlsx' | 'csv') => {
    const sanitizedTitle = title.replace(/\s+/g, '-').toLowerCase();
    
    switch (format) {
      case 'png':
        exportUtils.exportAsImage(tableRef, sanitizedTitle, 'png');
        break;
      case 'pdf':
        exportUtils.exportAsPDF(tableRef, sanitizedTitle);
        break;
      case 'xlsx':
      case 'csv':
        exportUtils.exportTableData(data, sanitizedTitle, format);
        break;
      default:
        console.error('Unsupported export format');
    }
  };
  
  return (
    <div className="relative" ref={tableRef}>
      <div className="absolute top-0 right-0 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('png')}>
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('xlsx')}>
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </div>
  );
};

/**
 * Exportable Chart Component
 */
const ExportableChart = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const chartRef = useRef(null);
  
  const handleExport = (format: 'png' | 'jpg' | 'pdf') => {
    const sanitizedTitle = title.replace(/\s+/g, '-').toLowerCase();
    
    switch (format) {
      case 'png':
      case 'jpg':
        exportUtils.exportAsImage(chartRef, sanitizedTitle, format);
        break;
      case 'pdf':
        exportUtils.exportAsPDF(chartRef, sanitizedTitle);
        break;
      default:
        console.error('Unsupported export format');
    }
  };
  
  return (
    <div className="relative" ref={chartRef}>
      <div className="absolute top-0 right-0 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('png')}>
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('jpg')}>
              Export as JPG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </div>
  );
};

// Define deltaRankingChartConfig
const deltaRankingChartConfig: ChartConfig = {
  rank: {
    label: "Overall Rank",
    theme: {
      light: "#3b82f6", // Example blue color
      dark: "#60a5fa",  // Example light blue color
    },
  },
};

/**
 * NITI Aayog View Component
 */
export const NITIAayogView = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  const printOptions = { // Types will be inferred by useReactToPrint
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
              config={{ // This config is for the LineChart
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
            <ChartContainer config={deltaRankingChartConfig}> {/* Using the defined config */}
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

/**
 * District View Component
 */
export const DistrictView = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const printOptions = { // Types will be inferred
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

const DistrictDashboard = () => {
  const [activeView, setActiveView] = useState('district');
  const dashboardRef = useRef<HTMLDivElement>(null); 
  
  const printOptions = { // Types will be inferred
    content: () => dashboardRef.current, 
    documentTitle: `${activeView === 'district' ? districtOverview.name : asifabadOverview.name} Dashboard Report`,
    onBeforeGetContent: () => {
      console.log('Preparing to print dashboard');
      return Promise.resolve();
    },
    onAfterPrint: () => console.log('Dashboard printed successfully')
  };
  // const handlePrint = useReactToPrint(printOptions); // Main print button can use this if added

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen" ref={dashboardRef}> {/* Added padding and background */}
      {/* Header with view toggle and Print Button */}
      <div className="flex justify-between items-center mb-6"> {/* Added margin-bottom */}
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-800"> {/* Increased heading size */}
            {activeView === 'district' ? 'District Dashboard' : 'Aspirational District Dashboard'}
          </h1>
          <div className="inline-flex items-center rounded-md border border-gray-300 bg-white shadow-sm"> {/* Enhanced toggle style */}
            <button
              onClick={() => setActiveView('district')}
              className={`rounded-l-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${ // Enhanced button style
                activeView === 'district' 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'text-muted-foreground hover:bg-gray-100'
              }`}
            >
              District View
            </button>
            <button
              onClick={() => setActiveView('niti')}
              className={`rounded-r-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${ // Enhanced button style
                activeView === 'niti' 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'text-muted-foreground hover:bg-gray-100'
              }`}
            >
              NITI Aayog View
            </button>
          </div>
        </div>
        {/* 
          Example for a main print button:
          <Button onClick={useReactToPrint(printOptions)} variant="default" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
             <Printer className="h-5 w-5" />
             Print Dashboard
          </Button> 
        */}
      </div>
      
      {activeView === 'district' ? <DistrictView /> : <NITIAayogView />}
    </div>
  );
};

export default DistrictDashboard;
