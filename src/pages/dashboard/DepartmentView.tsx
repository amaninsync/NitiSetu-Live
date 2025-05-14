
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip, Legend } from 'recharts';
import { Building2, Users, Landmark, ArrowUp, ArrowDown } from 'lucide-react';

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

const DepartmentView = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  const filteredDepartments = selectedDepartment === "All Departments" 
    ? departments 
    : departments.filter(dept => dept.name === selectedDepartment);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Departments Dashboard</h1>
        <select 
          className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option>All Departments</option>
          {departments.map(dept => (
            <option key={dept.name}>{dept.name}</option>
          ))}
        </select>
      </div>
      
      {/* Department Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <Building2 size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Departments</p>
                <p className="text-2xl font-bold">{departmentSummary.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Users size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{departmentSummary.employees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <Landmark size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">{departmentSummary.totalBudget}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                  <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget Utilized</p>
                <p className="text-2xl font-bold">{departmentSummary.utilized}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Department Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Performance Trend</CardTitle>
          <CardDescription>Department performance scores over the past quarters</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            config={{
              healthcare: {
                label: "Healthcare",
                theme: {
                  light: "#3b82f6",
                  dark: "#60a5fa",
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
                  light: "#f97316",
                  dark: "#fb923c",
                },
              },
              agriculture: {
                label: "Agriculture",
                theme: {
                  light: "#a855f7",
                  dark: "#c084fc",
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
              data={quarterlyPerformance}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="healthcare" stroke="#3b82f6" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="education" stroke="#10b981" />
              <Line type="monotone" dataKey="infrastructure" stroke="#f97316" />
              <Line type="monotone" dataKey="agriculture" stroke="#a855f7" />
              <Line type="monotone" dataKey="welfare" stroke="#ec4899" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Department List */}
      <Card>
        <CardHeader>
          <CardTitle>Department Details</CardTitle>
          <CardDescription>Performance metrics for each department</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Budget (₹ Cr)</TableHead>
                <TableHead>Spent (₹ Cr)</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((dept) => (
                <TableRow key={dept.name}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.projects}</TableCell>
                  <TableCell>{dept.employees}</TableCell>
                  <TableCell>{dept.budget}</TableCell>
                  <TableCell>{dept.spent}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(dept.spent/dept.budget)*100} className="h-2 w-20" />
                      <span className="text-sm">{Math.round((dept.spent/dept.budget)*100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-1 rounded text-xs ${
                        dept.performance >= 90 ? 'bg-green-100 text-green-800' : 
                        dept.performance >= 75 ? 'bg-blue-100 text-blue-800' : 
                        dept.performance >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {dept.performance}%
                      </span>
                      {dept.performance > 80 ? (
                        <ArrowUp size={14} className="text-green-600" />
                      ) : (
                        <ArrowDown size={14} className="text-red-600" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Key Personnel */}
      {selectedDepartment !== "All Departments" && (
        <Card>
          <CardHeader>
            <CardTitle>Key Personnel</CardTitle>
            <CardDescription>Leadership and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keyPersonnel
                  .filter(person => person.position.includes(selectedDepartment))
                  .map((person, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>{person.position}</TableCell>
                      <TableCell>{person.email}</TableCell>
                      <TableCell>{person.phone}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DepartmentView;
