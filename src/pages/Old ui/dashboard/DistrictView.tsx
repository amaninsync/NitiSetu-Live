import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Printer, MapPin, Users, TrendingUp, BarChart2, PieChart as PieIcon, DollarSign, BookOpen, Droplets, Sprout, Building2, Factory, CloudRain, Users2 as DemographicsIcon, Info } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { ChartConfig, ChartContainer } from "@/components/ui/chart"; // Added ChartConfig

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

/**
 * Utility functions for exporting components
 */
const exportUtils = {
  // Export component as image (PNG or JPG)
  exportAsImage: async (elementRef, fileName, format = 'png') => {
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
  exportAsPDF: async (elementRef, fileName) => {
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
  exportTableData: (data, fileName, format = 'xlsx') => {
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
  
  // Print entire dashboard
  printDashboard: (elementRef) => {
    if (!elementRef.current) return;
    
    const printContent = useReactToPrint({
      content: () => elementRef.current,
      documentTitle: 'District Dashboard Report',
      onAfterPrint: () => console.log('Printing completed')
    });
    
    return printContent;
  }
};

/**
 * Exportable Card Component
 */
const ExportableCard = ({ children, title, className = "", exportOptions = true }) => {
  const cardRef = useRef(null);
  
  const handleExport = (format) => {
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
const ExportableTable = ({ data, title, children }) => {
  const tableRef = useRef(null);
  
  const handleExport = (format) => {
    const sanitizedTitle = title.replace(/\s+/g, '-').toLowerCase();
    
    switch (format) {
      case 'png':
      case 'jpg':
        exportUtils.exportAsImage(tableRef, sanitizedTitle, format);
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
const ExportableChart = ({ title, children }) => {
  const chartRef = useRef(null);
  
  const handleExport = (format) => {
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

/**
 * NITI Aayog View Component
 */
export const NITIAayogView = () => {
  const dashboardRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => dashboardRef.current,
    documentTitle: `${asifabadOverview.name} Aspirational District Report`,
    onBeforeGetContent: () => {
      console.log('Preparing to print NITI Aayog dashboard');
      return Promise.resolve();
    },
    onAfterPrint: () => console.log('NITI Aayog dashboard printed successfully')
  });
  
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
                    stroke="#ef4444"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="education" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="agriculture" stroke="#10b981" />
                  <Line type="monotone" dataKey="infrastructure" stroke="#f59e0b" />
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
            <ChartContainer>
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
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rank" name="Overall Rank" fill="#8884d8" />
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
  const dashboardRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMandal, setSelectedMandal] = useState('all');
  const [selectedPanchayat, setSelectedPanchayat] = useState('all');

  const overviewRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const financialsRef = useRef<HTMLDivElement>(null);
  const demographicsRef = useRef<HTMLDivElement>(null);
  const sectorsRef = useRef<HTMLDivElement>(null);

  const getCurrentRef = () => {
    switch (activeTab) {
      case 'overview': return overviewRef;
      case 'projects': return projectsRef;
      case 'financials': return financialsRef;
      case 'demographics': return demographicsRef;
      case 'sectors': return sectorsRef;
      default: return overviewRef;
    }
  };
  
  const handlePrint = useReactToPrint({
    content: () => getCurrentRef().current,
    documentTitle: `DistrictView-${districtData.name}-${activeTab}`,
    pageStyle: `
      @media print {
        body { padding: 20px; font-family: Arial, sans-serif; }
        .no-print { display: none; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1, h2, h3 { color: #333; }
        .print-container { padding: 10mm; }
      }
    `,
  });

  const exportToPDF = async () => {
    const currentRef = getCurrentRef();
    if (currentRef.current) {
      const canvas = await html2canvas(currentRef.current, { scale: 2, useCORS: true, allowTaint: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4'); // landscape
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`DistrictView-${districtData.name}-${activeTab}.pdf`);
    }
  };
  
  const exportToExcel = () => {
    // This is a simplified example. You'd likely want to export specific table data
    // based on the active tab or a more complex data structure.
    let dataToExport: any[][] = [];
    let sheetName = "Sheet1";

    if (activeTab === 'overview') {
        dataToExport = [
            ["District Overview"],
            ["Name", districtData.name],
            ["Population", districtData.population],
            ["Area", districtData.area],
            ["Literacy Rate", districtData.literacyRate],
            [],
            ["KPIs"],
            ["Indicator", "Value", "Target"],
            ...kpiData.map(kpi => [kpi.name, kpi.value, kpi.target])
        ];
        sheetName = "Overview";
    } else if (activeTab === 'projects') {
         dataToExport = [
            ["Project Status"],
            ["Status", "Count"],
            ...projectStatusData.map(p => [p.name, p.value])
         ];
         sheetName = "Projects";
    }
    // Add more conditions for other tabs if needed

    if(dataToExport.length === 0) {
        alert("No data to export for the current view or export not implemented for this tab.");
        return;
    }

    const ws = XLSX.utils.aoa_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `DistrictView-${districtData.name}-${activeTab}.xlsx`);
  };

  const renderOverview = () => (
    <div ref={overviewRef} className="print-container space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">District at a Glance: {districtData.name}</CardTitle>
          <CardDescription>Key statistics and overall performance summary.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* ... keep existing code (overview stat cards) ... */}
          <Card className="bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Population</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{districtData.population.toLocaleString()}</div>
              <p className="text-xs text-blue-700">Total inhabitants</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Area</CardTitle>
              <MapPin className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{districtData.area}</div>
              <p className="text-xs text-green-700">Geographical coverage</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Literacy Rate</CardTitle>
              <BookOpen className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-800">{districtData.literacyRate}%</div>
              <p className="text-xs text-yellow-700">Average literacy</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Impact Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{districtData.overallImpactScore}/10</div>
              <p className="text-xs text-purple-700">Overall development impact</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators (KPIs)</CardTitle>
          <CardDescription>Tracking progress towards district goals.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpiData.map((kpi) => (
            <Card key={kpi.name} className="flex flex-col items-center justify-center p-4 text-center">
              <div className="mb-2">{kpi.icon}</div>
              <p className="text-sm font-medium">{kpi.name}</p>
              <p className="text-2xl font-bold my-1">{kpi.value}%</p>
              <Progress value={kpi.value} className="w-full h-2 my-1" />
              <p className="text-xs text-muted-foreground">Target: {kpi.target}%</p>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
  
  const renderProjects = () => (
    <div ref={projectsRef} className="print-container space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Status Overview</CardTitle>
          <CardDescription>Distribution of projects by their current status.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={projectStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Detailed Project List (Sample)</CardTitle>
           <CardDescription>A table showing more project details would go here.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Detailed project table to be implemented.</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderFinancials = () => (
    <div ref={financialsRef} className="print-container space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Monthly budget allocation vs. expenditure (in Lakhs).</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ChartContainer config={defaultChartConfig} className="min-h-[200px] w-full">
              <LineChart data={financialSummaryData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="allocated" stroke={defaultChartConfig.allocated.color} />
                <Line type="monotone" dataKey="spent" stroke={defaultChartConfig.spent.color} />
              </LineChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Budget Utilization Rate</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary">{districtData.budgetUtilization}%</div>
            <Progress value={districtData.budgetUtilization} className="w-3/4 mt-4 h-3" />
            <p className="text-sm text-muted-foreground mt-2">Overall budget spent against allocation.</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderDemographics = () => (
    <div ref={demographicsRef} className="print-container space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Demographic Distribution</CardTitle>
          <CardDescription>Population breakdown by various groups.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
             <ChartContainer config={defaultChartConfig} className="min-h-[200px] w-full">
                <BarChart data={demographicData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="group" type="category" width={80} />
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                  <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderSectors = () => (
    <div ref={sectorsRef} className="print-container space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sectoral Performance Scores</CardTitle>
          <CardDescription>Performance scores for key development sectors (out of 10).</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ChartContainer config={defaultChartConfig} className="min-h-[200px] w-full">
                <BarChart data={sectoralPerformanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );


  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info size={18}/>, content: renderOverview },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={18}/>, content: renderProjects },
    { id: 'financials', label: 'Financials', icon: <DollarSign size={18}/>, content: renderFinancials },
    { id: 'demographics', label: 'Demographics', icon: <DemographicsIcon size={18}/>, content: renderDemographics },
    { id: 'sectors', label: 'Sectors', icon: <BarChart2 size={18}/>, content: renderSectors },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div>
          <h1 className="text-3xl font-bold text-primary">District Comprehensive View</h1>
          <p className="text-muted-foreground">Insights and performance metrics for {districtData.name}.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print View</Button>
            <Button variant="outline" onClick={exportToPDF}><Download className="mr-2 h-4 w-4" /> Export PDF</Button>
            <Button variant="outline" onClick={exportToExcel}><Download className="mr-2 h-4 w-4" /> Export Excel</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {tabs.map(tab => (
            <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 ${activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            >
                {tab.icon} <span className="ml-2">{tab.label}</span>
            </Button>
            ))}
        </div>
        <div className="flex items-center gap-2">
            <Select value={selectedMandal} onValueChange={setSelectedMandal}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Mandal" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Mandals</SelectItem>
                <SelectItem value="asifabad">Asifabad</SelectItem>
                {/* Add other mandals */}
            </SelectContent>
            </Select>
            <Select value={selectedPanchayat} onValueChange={setSelectedPanchayat}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Panchayat" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Panchayats</SelectItem>
                {/* Add panchayats based on selected mandal */}
            </SelectContent>
            </Select>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="mt-6">
        {tabs.find(tab => tab.id === activeTab)?.content()}
      </div>
    </div>
  );
};

const DistrictDashboard = () => {
  const [activeView, setActiveView] = useState('district');
  const dashboardRef = useRef(null);
  
  const handlePrint = useReactToPrint({
    content: () => dashboardRef.current,
    documentTitle: `${activeView === 'district' ? districtOverview.name : asifabadOverview.name} Dashboard Report`,
    onBeforeGetContent: () => {
      console.log('Preparing to print dashboard');
      return Promise.resolve();
    },
    onAfterPrint: () => console.log('Dashboard printed successfully')
  });
  
  return (
    <div className="space-y-6" ref={dashboardRef}>
      {/* Header with view toggle and Print Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeView === 'district' ? 'District Dashboard' : 'Aspirational District Dashboard'}
          </h1>
          <div className="inline-flex items-center rounded-md border border-gray-200 bg-white px-1">
            <button
              onClick={() => setActiveView('district')}
              className={`rounded-sm px-3 py-1.5 text-sm font-medium ${
                activeView === 'district' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              District View
            </button>
            <button
              onClick={() => setActiveView('niti')}
              className={`rounded-sm px-3 py-1.5 text-sm font-medium ${
                activeView === 'niti' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              NITI Aayog View
            </button>
          </div>
        </div>
      </div>
      
      {/* Render appropriate view based on state */}
      {activeView === 'district' ? <DistrictView /> : <NITIAayogView />}
    </div>
  );
};

export default DistrictDashboard;
