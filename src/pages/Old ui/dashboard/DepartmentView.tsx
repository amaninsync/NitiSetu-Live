import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, Filter, Search, Users, Target, CheckCircle, Activity, FileText, Users2, Building, Briefcase } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

// Sample departments data
const departmentSummary = {
  total: 42,
  employees: "XX32",
  totalBudget: "₹2,XX0 Cr",
  utilized: "₹1,XX2 Cr",
};

const quarterlyPerformance = [
  { quarter: 'Q1 2023', healthcare: 76, education: 82, infrastructure: 64, agriculture: 72, welfare: 88 },
  { quarter: 'Q2 2023', healthcare: 82, education: 88, infrastructure: 70, agriculture: 68, welfare: 90 },
  { quarter: 'Q3 2023', healthcare: 88, education: 95, infrastructure: 68, agriculture: 75, welfare: 93 },
  { quarter: 'Q4 2023', healthcare: 84, education: 92, infrastructure: 73, agriculture: 78, welfare: 91 },
];

const departments = [
  { "name": "District Revenue Officer /RDO Asifabad", "projects": 14, "employees": 320, "budget": 150, "spent": 135, "performance": 80 },
  { "name": "Chief Planning Officer", "projects": 20, "employees": 450, "budget": 200, "spent": 180, "performance": 85 },
  { "name": "District Medical & Health Officer", "projects": 31, "employees": 1245, "budget": 325, "spent": 287, "performance": 88 },
  { "name": "District Survey Officer (FAC)", "projects": 10, "employees": 150, "budget": 100, "spent": 85, "performance": 75 },
  { "name": "District Civil Supply Officer (FAC)", "projects": 12, "employees": 210, "budget": 130, "spent": 115, "performance": 78 },
  { "name": "District Public Relations Officer (FAC)", "projects": 9, "employees": 95, "budget": 90, "spent": 78, "performance": 82 },
  { "name": "District Rural Development Officer", "projects": 26, "employees": 785, "budget": 245, "spent": 198, "performance": 81 },
  { "name": "District Minorities Welfare Officer (FAC)", "projects": 11, "employees": 130, "budget": 120, "spent": 110, "performance": 85 },
  { "name": "Assistant Director Mines & Geology", "projects": 15, "employees": 220, "budget": 160, "spent": 140, "performance": 77 },
  { "name": "District Cooperative Officer", "projects": 13, "employees": 180, "budget": 150, "spent": 125, "performance": 79 },
  { "name": "District Panchayat Officer", "projects": 19, "employees": 624, "budget": 175, "spent": 162, "performance": 93 },
  { "name": "General Manager, Industries (I/C)", "projects": 18, "employees": 500, "budget": 210, "spent": 190, "performance": 87 },
  { "name": "Labour Officer (FAC)", "projects": 10, "employees": 140, "budget": 90, "spent": 75, "performance": 72 },
  { "name": "District Employment Officer", "projects": 14, "employees": 350, "budget": 140, "spent": 130, "performance": 83 },
  { "name": "District Welfare Officer", "projects": 17, "employees": 400, "budget": 160, "spent": 145, "performance": 86 },
  { "name": "District Agriculture Officer (FAC)", "projects": 22, "employees": 1056, "budget": 210, "spent": 158, "performance": 75 },
  { "name": "District Treasury Officer", "projects": 12, "employees": 300, "budget": 140, "spent": 120, "performance": 79 },
  { "name": "District Manager(FAC)", "projects": 14, "employees": 280, "budget": 160, "spent": 150, "performance": 80 },
  { "name": "District Tribal Development Officer", "projects": 16, "employees": 500, "budget": 180, "spent": 160, "performance": 84 },
  { "name": "District BC Development Officer FAC", "projects": 13, "employees": 250, "budget": 140, "spent": 125, "performance": 78 },
  { "name": "District Veterinary & Animal Husbandry Officer(FAC)", "projects": 15, "employees": 600, "budget": 200, "spent": 175, "performance": 81 },
  { "name": "District Audit Officer", "projects": 11, "employees": 190, "budget": 130, "spent": 110, "performance": 76 },
  { "name": "District Fisheries Officer", "projects": 14, "employees": 275, "budget": 145, "spent": 135, "performance": 79 },
  { "name": "District Prohibition & Excise Officer", "projects": 18, "employees": 340, "budget": 180, "spent": 165, "performance": 82 },
  { "name": "District Horticulture Officer", "projects": 12, "employees": 300, "budget": 140, "spent": 120, "performance": 77 },
  { "name": "Executive Engineer (R&B)", "projects": 25, "employees": 450, "budget": 220, "spent": 200, "performance": 85 },
  { "name": "District Panchayat Raj Engineer, (EE) (PR)", "projects": 21, "employees": 375, "budget": 200, "spent": 180, "performance": 83 },
  { "name": "Lead District Manager", "projects": 14, "employees": 320, "budget": 150, "spent": 135, "performance": 80 },
  { "name": "District Intermediate Education Officer", "projects": 17, "employees": 500, "budget": 220, "spent": 205, "performance": 89 },
  { "name": "District Education Officer", "projects": 28, "employees": 2150, "budget": 420, "spent": 398, "performance": 95 },
  { "name": "District S.C Development Officer", "projects": 16, "employees": 450, "budget": 180, "spent": 160, "performance": 84 },
  { "name": "Revenue Divisional Officer", "projects": 14, "employees": 350, "budget": 150, "spent": 130, "performance": 79 },
  { "name": "Municipal Commissioner Kagaznagar", "projects": 18, "employees": 600, "budget": 300, "spent": 270, "performance": 87 },
  { "name": "Municipal Commissioner Asifabad", "projects": 18, "employees": 580, "budget": 290, "spent": 260, "performance": 86 },
  { "name": "District Transport Officer", "projects": 19, "employees": 700, "budget": 320, "spent": 290, "performance": 88 },
  { "name": "Zilla Parishad CEO", "projects": 22, "employees": 1050, "budget": 380, "spent": 340, "performance": 90 },
  { "name": "Irrigation EE", "projects": 20, "employees": 800, "budget": 350, "spent": 310, "performance": 88 },
  { "name": "Electricity SE", "projects": 19, "employees": 750, "budget": 340, "spent": 300, "performance": 86 },
  { "name": "RWS EE", "projects": 15, "employees": 500, "budget": 250, "spent": 210, "performance": 83 },
  { "name": "Dist Marketing Officer", "projects": 12, "employees": 400, "budget": 180, "spent": 150, "performance": 80 },
  { "name": "Principal Degree College Kagaznagar", "projects": 17, "employees": 120, "budget": 100, "spent": 90, "performance": 88 },
  { "name": "DCHS", "projects": 25, "employees": 1300, "budget": 400, "spent": 370, "performance": 91 }
];

const keyPersonnel = [
  { name: "V. Lokeshwara Rao", position: "District Revenue Officer /RDO Asifabad", email: "drokumrambheem@gmail.com", phone: "+91 9490140108" },
  { name: "P. Chinakotya Naik", position: "Chief Planning Officer", email: "cpoasifabad@gmail.com", phone: "+91 9494311689" },
  { name: "Dr. Tukaram Bhatt", position: "District Medical & Health Officer", email: "kumurambheemdmho@gmail.com", phone: "+91 9441868609" },
  { name: "D Someshwar", position: "District Survey Officer (FAC)", email: "slradkb@gmail.com", phone: "+91 9440736023" },
  { name: "Vinod", position: "District Civil Supply Officer (FAC)", email: "dcsoasifabad@gmail.com", phone: "+91 9989122716" },
  { name: "Y. Sampath Kumar", position: "District Public Relations Officer (FAC)", email: "dpro.komarambheem.ts@gmail.com", phone: "+91 9494736611" },
  { name: "Marri Surendar", position: "District Rural Development Officer", email: "drdo.kb@gmail.com", phone: "+91 9133319169" },
  { name: "Gorantla Sajeevan", position: "District Minorities Welfare Officer (FAC)", email: "dmwokbheem@gmail.com", phone: "+91 9391388833" },
  { name: "AD Mines", position: "Assistant Director Mines & Geology", email: "admgasf@gmail.com", phone: "+91 8106545842" },
  { name: "", position: "District Cooperative Officer", email: "dco.coop.asfbd@gmail.com", phone: "" },
  { name: "Bikshapathi", position: "District Panchayat Officer", email: "dpo.kbmasf@gmail.com", phone: "+91 9440237999" },
  { name: "Ashok", position: "General Manager, Industries (I/C)", email: "gmdic-kb-inds@telangana.gov.in", phone: "+91 9989017671" },
  { name: "Mazharunnisa Begum", position: "Labour Officer (FAC)", email: "asstlabourofficeskzr@gmail.com", phone: "+91 9492555243" },
  { name: "A. Ravi Krishna", position: "District Employment Officer", email: "de.kumrumbheem@gmail.com", phone: "+91 9533395280" },
  { name: "Dr. Bhasker", position: "District Welfare Officer", email: "dwoasifabad@gmail.com", phone: "+91 9441414314" },
  { name: "R. Sreenivas Rao", position: "District Agriculture Officer (FAC)", email: "daokumrambheem@gmail.com", phone: "+91 7288894022" },
  { name: "Jadi Rajeshwar", position: "District Treasury Officer", email: "dtokumrambheemasf@gmail.com", phone: "+91 9121108903" },
  { name: "", position: "District Manager (FAC)", email: "dmasfkb.tscsc@gmail.com", phone: "" },
  { name: "Ramadevi", position: "District Tribal Development Officer", email: "dtdo.kumrambheem@gmail.com", phone: "+91 7382148056" },
  { name: "Sajeevan", position: "District BC Development Officer FAC", email: "dbcdo-kb@telangana.gov.in", phone: "+91 9866853227" },
  { name: "M. Suresh Kumar", position: "District Veterinary & Animal Husbandry Officer (FAC)", email: "dvahoasifabad@gmail.com", phone: "+91 8008887900" },
  { name: "Rajeswar", position: "District Audit Officer", email: "daosakomarambheem.ts@gmail.com", phone: "+91 9849072028" },
  { name: "Y. Sambashiva Rao", position: "District Fisheries Officer", email: "dfokumrambheem@gmail.com", phone: "+91 9494319715" },
  { name: "B. Jyothi Kiran", position: "District Prohibition & Excise Officer", email: "dpeokumrambheem@gmail.com", phone: "+91 9440902717" },
  { name: "Marri Venkatesham", position: "District Horticulture Officer", email: "dlhsco.komarambheem@gmail.com", phone: "+91 7893318447" },
  { name: "G. Peddaiah", position: "Executive Engineer (R&B)", email: "eerbasifabad@gmail.com", phone: "+91 9394020233" },
  { name: "P Prabhkar", position: "District Panchayat Raj Engineer, (EE) (PR)", email: "dpreasf@gmail.com", phone: "+91 9121135540" },
  { name: "V R Joshi", position: "Lead District Manager", email: "ldm.kbasifabad@gmail.com", phone: "+91 9849424985" },
  { name: "", position: "District Intermediate Education Officer", email: "dieo.asifabad@gmail.com", phone: "" },
];

const departmentData = {
  name: "Department of Rural Development",
  head: "Dr. Anya Sharma",
  totalProjects: 45,
  activeProjects: 32,
  completedProjects: 13,
  budgetAllocated: 50000000, // in currency units
  budgetSpent: 38500000,
  overallProgress: 77, // percentage
};

const kpiData = [
  { name: 'Project Completion Rate', value: 72, target: 80 },
  { name: 'Budget Utilization', value: departmentData.budgetSpent / departmentData.budgetAllocated * 100, target: 90 },
  { name: 'Stakeholder Satisfaction', value: 85, target: 90 },
  { name: 'Timeline Adherence', value: 65, target: 75 },
  { name: 'Resource Efficiency', value: 78, target: 85 },
];

const projectData = [
  { id: 'P001', name: 'Rural Road Construction', status: 'Active', progress: 60, budget: 500000, spent: 350000, startDate: '2023-01-15', endDate: '2024-01-15', manager: 'Rohan Singh' },
  { id: 'P002', name: 'Clean Water Initiative', status: 'Active', progress: 80, budget: 750000, spent: 600000, startDate: '2023-03-01', endDate: '2024-03-01', manager: 'Priya Kulkarni' },
  { id: 'P003', name: 'Skill Development Program', status: 'Completed', progress: 100, budget: 400000, spent: 380000, startDate: '2022-09-01', endDate: '2023-08-30', manager: 'Amit Patel' },
  { id: 'P004', name: 'Digital Literacy Campaign', status: 'Planned', progress: 10, budget: 300000, spent: 25000, startDate: '2024-02-01', endDate: '2024-12-31', manager: 'Sunita Reddy' },
  { id: 'P005', name: 'Affordable Housing Scheme', status: 'Active', progress: 45, budget: 1200000, spent: 500000, startDate: '2023-06-01', endDate: '2025-06-01', manager: 'Vikram Chauhan' },
];

const financialData = [
  { month: 'Jan', allocated: 400000, spent: 350000 },
  { month: 'Feb', allocated: 420000, spent: 380000 },
  { month: 'Mar', allocated: 450000, spent: 410000 },
  { month: 'Apr', allocated: 430000, spent: 390000 },
  { month: 'May', allocated: 460000, spent: 420000 },
  { month: 'Jun', allocated: 480000, spent: 450000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const activityLog = [
  { id: 'A001', timestamp: '2024-05-22 10:00 AM', user: 'Rohan Singh', action: 'Updated progress for Rural Road Construction to 60%.' },
  { id: 'A002', timestamp: '2024-05-21 03:30 PM', user: 'Priya Kulkarni', action: 'Submitted Q2 report for Clean Water Initiative.' },
  { id: 'A003', timestamp: '2024-05-21 09:15 AM', user: 'Admin', action: 'New project "Sanitation Drive" added.' },
  { id: 'A004', timestamp: '2024-05-20 05:00 PM', user: 'Sunita Reddy', action: 'Allocated resources for Digital Literacy Campaign.' },
];

const teamMembers = [
  { id: 'T001', name: 'Rohan Singh', position: 'Project Manager', email: 'rohan.singh@example.gov', phone: '+91-9876543210' },
  { id: 'T002', name: 'Priya Kulkarni', position: 'Project Manager', email: 'priya.kulkarni@example.gov', phone: '+91-9876543211' },
  { id: 'T003', name: 'Amit Patel', position: 'Senior Analyst', email: 'amit.patel@example.gov', phone: '+91-9876543212' },
  { id: 'T004', name: 'Sunita Reddy', position: 'Coordinator', email: 'sunita.reddy@example.gov', phone: '+91-9876543213' },
  { id: 'T005', name: 'Vikram Chauhan', position: 'Field Officer', email: 'vikram.chauhan@example.gov', phone: '+91-9876543214' },
];

const DepartmentView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof projectData[0] | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Department-Report-${departmentData.name}`,
    pageStyle: `
      @media print {
        body { padding: 20px; font-family: Arial, sans-serif; }
        .no-print { display: none; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1, h2, h3 { color: #333; }
      }
    `,
  });

  const exportToPDF = async () => {
    if (componentRef.current) {
      const canvas = await html2canvas(componentRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10; 
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`Department-Report-${departmentData.name}.pdf`);
    }
  };

  const exportToExcel = () => {
    const ws_data = [
      ["Department Overview"],
      ["Name", departmentData.name],
      ["Head", departmentData.head],
      ["Total Projects", departmentData.totalProjects],
      ["Active Projects", departmentData.activeProjects],
      ["Completed Projects", departmentData.completedProjects],
      ["Budget Allocated", departmentData.budgetAllocated],
      ["Budget Spent", departmentData.budgetSpent],
      ["Overall Progress", `${departmentData.overallProgress}%`],
      [],
      ["Key Performance Indicators"],
      ["Indicator", "Value", "Target"],
      ...kpiData.map(kpi => [kpi.name, kpi.value, kpi.target]),
      [],
      ["Projects"],
      ["ID", "Name", "Status", "Progress", "Budget", "Spent", "Start Date", "End Date", "Manager"],
      ...sortedFilteredData.map(p => [p.id, p.name, p.status, p.progress, p.budget, p.spent, p.startDate, p.endDate, p.manager]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Department Report");
    XLSX.writeFile(wb, `Department-Report-${departmentData.name}.xlsx`);
  };

  const filteredProjects = useMemo(() => {
    return projectData.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.manager.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const sortedFilteredData = useMemo(() => {
    let sortableItems = [...filteredProjects];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // Ensure a[sortConfig.key] and b[sortConfig.key] are not undefined
        const valA = a[sortConfig.key!]; // Add non-null assertion
        const valB = b[sortConfig.key!]; // Add non-null assertion

        if (valA === undefined || valB === undefined) return 0;


        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortConfig.direction === 'ascending' ? valA - valB : valB - valA;
        }
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortConfig.direction === 'ascending' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredProjects, sortConfig]);
  
  const requestSort = (key: keyof typeof projectData[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto p-4 space-y-6" ref={componentRef}>
      <div className="flex justify-between items-center no-print">
        <h1 className="text-3xl font-bold text-primary">Department Dashboard: {departmentData.name}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrint}><FileText className="mr-2 h-4 w-4" /> Print</Button>
          <Button variant="outline" onClick={exportToPDF}><Download className="mr-2 h-4 w-4" /> Export PDF</Button>
          <Button variant="outline" onClick={exportToExcel}><Download className="mr-2 h-4 w-4" /> Export Excel</Button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ... keep existing code (overview cards: Total Projects, Active Projects, Budget Utilization, Overall Progress) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentData.totalProjects}</div>
            <p className="text-xs text-muted-foreground">Managed by the department</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentData.activeProjects}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(departmentData.budgetSpent / departmentData.budgetAllocated * 100).toFixed(1)}%</div>
            <Progress value={departmentData.budgetSpent / departmentData.budgetAllocated * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentData.overallProgress}%</div>
             <Progress value={departmentData.overallProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* KPIs and Financials Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators (KPIs)</CardTitle>
            <CardDescription>Department performance against targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {kpiData.map((kpi, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{kpi.name}</span>
                  <span className={`text-sm font-semibold ${kpi.value >= kpi.target ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.value.toFixed(1)}% (Target: {kpi.target}%)
                  </span>
                </div>
                <Progress value={kpi.value} max={100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Overview</CardTitle>
            <CardDescription>Allocated vs. Spent budget over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${value/100000}L`} />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="allocated" fill="#8884d8" name="Allocated Budget" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" fill="#82ca9d" name="Spent Budget" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Projects Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Projects Overview</CardTitle>
          <CardDescription>Detailed list of all projects managed by the department.</CardDescription>
          <div className="flex items-center gap-4 pt-4 no-print">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects or managers..."
                className="pl-8 sm:w-[300px] md:w-[400px] lg:w-[500px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => requestSort('id')} className="cursor-pointer">ID</TableHead>
                <TableHead onClick={() => requestSort('name')} className="cursor-pointer">Project Name</TableHead>
                <TableHead onClick={() => requestSort('status')} className="cursor-pointer">Status</TableHead>
                <TableHead onClick={() => requestSort('progress')} className="cursor-pointer">Progress</TableHead>
                <TableHead onClick={() => requestSort('budget')} className="cursor-pointer">Budget</TableHead>
                <TableHead onClick={() => requestSort('spent')} className="cursor-pointer">Spent</TableHead>
                <TableHead onClick={() => requestSort('startDate')} className="cursor-pointer">Start Date</TableHead>
                <TableHead onClick={() => requestSort('endDate')} className="cursor-pointer">End Date</TableHead>
                <TableHead onClick={() => requestSort('manager')} className="cursor-pointer">Manager</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedFilteredData.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'Planned' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="w-20 h-2" />
                      <span>{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>₹{project.budget.toLocaleString()}</TableCell>
                  <TableCell>₹{project.spent.toLocaleString()}</TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell>{project.manager}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Team and Activity Log Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Key personnel in the department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                    <p className="text-xs text-muted-foreground">{member.email} | {member.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity Log</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {activityLog.slice(0, 5).map((log) => ( // Show top 5 recent activities
                <li key={log.id} className="text-sm">
                  <span className="font-semibold">{log.user}</span>: {log.action}
                  <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentView;
