import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartConfig } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useReactToPrint } from 'react-to-print';
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

// Define a default chart config for ChartContainer if needed, or pass specific configs
const defaultBudgetChartConfig: ChartConfig = {
  allocated: {
    label: "Allocated Budget",
    color: "hsl(var(--chart-1))",
  },
  utilized: {
    label: "Utilized Budget",
    color: "hsl(var(--chart-2))",
  },
};

const defaultPerformanceChartConfig: ChartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
};

const defaultSectoralChartConfig: ChartConfig = {
  health: { label: "Health & Nutrition", color: "hsl(var(--chart-1))" },
  education: { label: "Education", color: "hsl(var(--chart-2))" },
  agriculture: { label: "Agriculture & Water", color: "hsl(var(--chart-3))" },
  infrastructure: { label: "Infrastructure", color: "hsl(var(--chart-4))" },
};


/**
 * Utility functions for exporting components
 */
const exportUtils = {
  // Export component as image (PNG or JPG)
  exportAsImage: async (elementRef: React.RefObject<HTMLElement>, fileName: string, format = 'png') => {
    if (!elementRef.current) return;
    try {
      const canvas = await html2canvas(elementRef.current, {
        scale: 2,
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
        XLSX.writeFile(workbook, `${fileName}.csv`); // Note: This will still produce an xlsx file named .csv
      }
    } catch (error) {
      console.error('Error exporting table data:', error);
    }
  }
};

/**
 * Exportable Card Component
 */
const ExportableCard = ({ children, title, className = "", exportOptions = true }: { children: React.ReactNode, title: string, className?: string, exportOptions?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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
        <div className="absolute top-4 right-4 z-10 no-print">
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
 * District Overview Component
 */
const DistrictOverviewSection = () => {
  const districtRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => districtRef.current,
    documentTitle: "District-Overview",
    pageStyle: `
      @media print {
        body { padding: 20mm; }
        .no-print { display: none; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 2mm; text-align: left; border: 0.5pt solid #ddd; }
        h1, h2 { margin-bottom: 4mm; }
      }
    `,
    onPrintError: (error: any) => console.error('Error printing:', error),
  });

  const printDocument = () => {
    handlePrint();
  };

  // ... keep existing code (deltaRankingData)

  const deltaRankingChartConfig = {
    tooltip: {
      formatter: (value) => `${value} ranks`
    },
    grid: {
      top: 30,
      bottom: 30,
      left: 20,
      right: 20
    },
  };

  return (
    <div ref={districtRef}>
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-2xl font-bold">District Dashboard</h1>
        <Button variant="outline" size="sm" onClick={printDocument}>
          <Printer className="mr-2 h-4 w-4" /> Print Overview
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* ... keep existing code (District stat cards for Bangalore Urban from districtOverview) */}
        <Card>
          <CardHeader><CardTitle>Population</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{districtOverview.population}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Area</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{districtOverview.area}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Literacy</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{districtOverview.literacy}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Budget Utilization</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{districtOverview.budgetUtilization}%</p>
            <Progress value={districtOverview.budgetUtilization} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Impact Score</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{districtOverview.impactScore}/100</p>
            <Progress value={districtOverview.impactScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ExportableCard title="District Performance Index">
          <CardHeader>
            <CardTitle>District Performance Index</CardTitle>
            <CardDescription>Overall performance scores across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {/* ChartContainer's config is for its own theming/labeling, not direct Recharts config */}
                <ChartContainer config={defaultPerformanceChartConfig} className="min-h-[200px] w-full">
                  <BarChart
                    data={[
                      { name: 'Health', score: 78 },
                      { name: 'Education', score: 82 },
                      { name: 'Agriculture', score: 65 },
                      { name: 'Infrastructure', score: 71 },
                      { name: 'Social Welfare', score: 79 }
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: number) => `${value}/100`} />
                    <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </ExportableCard>
        
        <ExportableCard title="Budget Utilization">
          <CardHeader>
            <CardTitle>Budget Utilization</CardTitle>
            <CardDescription>Monthly allocated vs utilized budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                 {/* Removed problematic deltaRankingChartConfig from ChartContainer */}
                <ChartContainer config={defaultBudgetChartConfig} className="min-h-[200px] w-full">
                  <LineChart
                    data={[
                      { month: 'Jan', allocated: 450, utilized: 380 },
                      { month: 'Feb', allocated: 500, utilized: 420 },
                      { month: 'Mar', allocated: 580, utilized: 510 },
                      { month: 'Apr', allocated: 620, utilized: 540 },
                      { month: 'May', allocated: 700, utilized: 590 },
                      { month: 'Jun', allocated: 680, utilized: 620 }
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `₹${value}L`} />
                    <Legend />
                    <Line type="monotone" dataKey="allocated" stroke="hsl(var(--chart-1))" name="Allocated" />
                    <Line type="monotone" dataKey="utilized" stroke="hsl(var(--chart-2))" name="Utilized" />
                  </LineChart>
                </ChartContainer>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </ExportableCard>
      </div>
    </div>
  );
};

/**
 * NITI Aayog Aspirational District Component
 */
const NitiAayogSection = () => {
  const nitiRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => nitiRef.current,
    documentTitle: "Aspirational-District-Report",
    pageStyle: `
      @media print {
        body { padding: 20mm; }
        .no-print { display: none; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 2mm; text-align: left; border: 0.5pt solid #ddd; }
        h1, h2 { margin-bottom: 4mm; }
      }
    `,
    onPrintError: (error: any) => console.error('Error printing:', error),
  });

  const printDocument = () => {
    handlePrint();
  };

  // ... keep existing code (aspirationalIndicators)

  // ... keep existing code (sectoralImprovements)

  return (
    <div ref={nitiRef}>
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-2xl font-bold">Aspirational District View</h1>
        <Button variant="outline" size="sm" onClick={printDocument}>
          <Printer className="mr-2 h-4 w-4" /> Print Report
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* ... keep existing code (District cards for Asifabad from asifabadOverview) */}
        <Card>
            <CardHeader><CardTitle>District Name</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">{asifabadOverview.name}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Population</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">{asifabadOverview.population}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Area</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">{asifabadOverview.area}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Literacy</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">{asifabadOverview.literacy}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Budget Utilization</CardTitle></CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{asifabadOverview.budgetUtilization}%</p>
                <Progress value={asifabadOverview.budgetUtilization} className="mt-2"/>
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Impact Score</CardTitle></CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{asifabadOverview.impactScore}/100</p>
                <Progress value={asifabadOverview.impactScore} className="mt-2"/>
            </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ExportableCard title="Aspirational District KPIs">
          <CardHeader>
            <CardTitle>Aspirational District KPIs</CardTitle>
            <CardDescription>Key Performance Indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Indicator</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Improvement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aspirationalIndicators.map((indicator, index) => (
                  <TableRow key={index}>
                    <TableCell>{indicator.name}</TableCell>
                    <TableCell>{indicator.score}/100</TableCell>
                    <TableCell>{indicator.rank}</TableCell>
                    <TableCell className="text-green-600">+{indicator.improvement}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </ExportableCard>
        
        <ExportableCard title="Sectoral Improvements">
          <CardHeader>
            <CardTitle>Sectoral Improvements</CardTitle>
            <CardDescription>Monthly trends by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ChartContainer config={defaultSectoralChartConfig} className="min-h-[200px] w-full">
                  <LineChart
                    data={sectoralImprovements}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="health" stroke="hsl(var(--chart-1))" name="Health & Nutrition" />
                    <Line type="monotone" dataKey="education" stroke="hsl(var(--chart-2))" name="Education" />
                    <Line type="monotone" dataKey="agriculture" stroke="hsl(var(--chart-3))" name="Agriculture & Water" />
                    <Line type="monotone" dataKey="infrastructure" stroke="hsl(var(--chart-4))" name="Infrastructure" />
                  </LineChart>
                </ChartContainer>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </ExportableCard>
      </div>
    </div>
  );
};

/**
 * Department & Infrastructure Component
 */
const InfrastructureSection = () => {
  const infraRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => infraRef.current,
    documentTitle: "Infrastructure-Report",
    pageStyle: `
      @media print {
        body { padding: 20mm; }
        .no-print { display: none; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 2mm; text-align: left; border: 0.5pt solid #ddd; }
        h1, h2 { margin-bottom: 4mm; }
      }
    `,
    onPrintError: (error: any) => console.error('Error printing:', error),
  });

  const printDocument = () => {
    handlePrint();
  };

  return (
    <div ref={infraRef}>
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-2xl font-bold">District Infrastructure</h1>
        <Button variant="outline" size="sm" onClick={printDocument}>
          <Printer className="mr-2 h-4 w-4" /> Print Report
        </Button>
      </div>
      
      <ExportableCard title="Key Infrastructure Indicators" className="mb-6">
        <CardHeader>
          <CardTitle>Key Infrastructure Indicators</CardTitle>
          <CardDescription>Critical district infrastructure metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6"> {/* Adjusted grid for potentially 5 items */}
            {keyIndicators.map((indicator, index) => (
              <div key={index} className="space-y-2 text-center md:text-left">
                <h3 className="text-md font-medium">{indicator.name}</h3>
                <p className="text-xl font-bold">{indicator.count}</p>
                <Progress value={indicator.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{indicator.progress}% Complete</p>
              </div>
            ))}
          </div>
        </CardContent>
      </ExportableCard>
            
      <ExportableCard title="Department Performance">
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Budget allocation and utilization by department</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Budget (₹L)</TableHead>
                <TableHead className="text-right">Spent (₹L)</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentPerformance.map((dept, index) => (
                <TableRow key={index}>
                  <TableCell>{dept.name}</TableCell>
                  <TableCell className="text-right">{dept.budget}</TableCell>
                  <TableCell className="text-right">{dept.spent}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={dept.progress} className="w-24 md:w-40" />
                      <span className="text-sm">{dept.progress}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </ExportableCard>
    </div>
  );
};

/**
 * Main District Dashboard Component
 */
const DistrictDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex space-x-2 mb-6 no-print">
        <Button 
          variant={activeView === 'overview' ? 'default' : 'outline'} 
          onClick={() => setActiveView('overview')}
        >
          District Overview
        </Button>
        <Button 
          variant={activeView === 'niti-aayog' ? 'default' : 'outline'} 
          onClick={() => setActiveView('niti-aayog')}
        >
          Aspirational District View
        </Button>
        <Button 
          variant={activeView === 'infrastructure' ? 'default' : 'outline'} 
          onClick={() => setActiveView('infrastructure')}
        >
          Infrastructure & Departments
        </Button>
      </div>
      
      {activeView === 'overview' && <DistrictOverviewSection />}
      {activeView === 'niti-aayog' && <NitiAayogSection />}
      {activeView === 'infrastructure' && <InfrastructureSection />}
    </div>
  );
};

export default DistrictDashboard;
