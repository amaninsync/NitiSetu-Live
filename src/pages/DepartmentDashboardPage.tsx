import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Users, Briefcase, BarChart3, FileText, CalendarIcon, TrendingUp, TrendingDown, Activity, Heart, Baby, MapPin, Package } from 'lucide-react';

// Simulated FCR data based on the Excel structure
const fcrData = [
  { slNo: 1, district: "KB Asifabad", name: "ASIFABAD", totalAWCs: 260, awcsReported: 260, riceOpening: 20252.472, riceReceived: 12950, riceUtilized: 12260.963 },
  { slNo: 2, district: "KB Asifabad", name: "JAINOOR", totalAWCs: 175, awcsReported: 175, riceOpening: 14067.419, riceReceived: 9550, riceUtilized: 10550.834 },
  { slNo: 3, district: "KB Asifabad", name: "KAGAZNAGAR", totalAWCs: 180, awcsReported: 180, riceOpening: 15432.125, riceReceived: 8750, riceUtilized: 11250.450 },
  { slNo: 4, district: "KB Asifabad", name: "SIRPUR", totalAWCs: 195, awcsReported: 195, riceOpening: 18245.875, riceReceived: 10200, riceUtilized: 13150.225 },
  { slNo: 5, district: "KB Asifabad", name: "MANCHERIAL", totalAWCs: 163, awcsReported: 163, riceOpening: 12875.340, riceReceived: 8950, riceUtilized: 9875.680 }
];

// Enhanced departments with DWO
const departments = [
  { id: 'dwo', name: 'District Welfare Officer', color: 'bg-purple-600', description: 'Child & Women Welfare Services' },
  { id: 'health', name: 'Health Department', color: 'bg-teal-500', description: 'Public Health Services' },
  { id: 'education', name: 'Education Department', color: 'bg-green-500', description: 'Educational Services' },
  { id: 'rural', name: 'Rural Development', color: 'bg-blue-600', description: 'Rural Infrastructure' },
  { id: 'urban', name: 'Urban Planning', color: 'bg-orange-500', description: 'Urban Development' },
  { id: 'agriculture', name: 'Agriculture', color: 'bg-emerald-500', description: 'Agricultural Development' },
];

// DWO specific metrics
const dwoMetrics = [
  {
    id: 'dwo-awcs',
    title: 'Active AWCs',
    value: '973',
    change: 2.5,
    status: 'positive',
    icon: Heart,
    description: 'Anganwadi Centers Operational'
  },
  {
    id: 'dwo-reporting',
    title: 'Reporting Rate',
    value: '100%',
    change: 0,
    status: 'positive',
    icon: TrendingUp,
    description: 'AWCs Submitting Reports'
  },
  {
    id: 'dwo-beneficiaries',
    title: 'Beneficiaries',
    value: '45,280',
    change: 8.2,
    status: 'positive',
    icon: Users,
    description: 'Children & Pregnant Women'
  },
  {
    id: 'dwo-nutrition',
    title: 'Nutrition Distribution',
    value: '₹12.4 Cr',
    change: 15.6,
    status: 'positive',
    icon: Package,
    description: 'Monthly Food Distribution Value'
  }
];

// Generic department metrics function
const departmentMetrics = (departmentId) => {
  if (departmentId === 'dwo') return dwoMetrics;
  
  return [
    {
      id: `${departmentId}-budget`,
      title: 'Budget Allocation',
      value: '₹ 45.2 Cr',
      change: 12.6,
      status: 'positive',
      icon: BarChart3
    },
    {
      id: `${departmentId}-projects`,
      title: 'Active Projects',
      value: '24',
      change: 8.4,
      status: 'positive',
      icon: Briefcase
    },
    {
      id: `${departmentId}-staff`,
      title: 'Staff Count',
      value: '132',
      change: 3.2,
      status: 'positive',
      icon: Users
    },
    {
      id: `${departmentId}-reports`,
      title: 'Pending Reports',
      value: '7',
      change: -2.1,
      status: 'negative',
      icon: FileText
    }
  ];
};

// Metric Card Component
const MetricCard = ({ metric, className = "" }) => (
  <Card className={`hover:shadow-lg transition-all duration-300 ${className}`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <metric.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          metric.status === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {metric.status === 'positive' ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{Math.abs(metric.change)}%</span>
        </div>
      </div>
      {metric.description && (
        <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
      )}
    </CardContent>
  </Card>
);

// FCR Data Table Component
const FCRTable = () => (
  <Card className="col-span-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Package className="h-5 w-5" />
        Food Consolidation Report (FCR) - January 2025
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-semibold">District</th>
              <th className="text-left p-3 font-semibold">Location</th>
              <th className="text-center p-3 font-semibold">Total AWCs</th>
              <th className="text-center p-3 font-semibold">Reported</th>
              <th className="text-right p-3 font-semibold">Rice Opening (Kg)</th>
              <th className="text-right p-3 font-semibold">Rice Received (Kg)</th>
              <th className="text-right p-3 font-semibold">Rice Utilized (Kg)</th>
              <th className="text-center p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {fcrData.map((row) => (
              <tr key={row.slNo} className="border-b hover:bg-muted/30">
                <td className="p-3">{row.district}</td>
                <td className="p-3 font-medium">{row.name}</td>
                <td className="p-3 text-center">{row.totalAWCs}</td>
                <td className="p-3 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {row.awcsReported}
                  </span>
                </td>
                <td className="p-3 text-right">{row.riceOpening.toLocaleString()}</td>
                <td className="p-3 text-right">{row.riceReceived.toLocaleString()}</td>
                <td className="p-3 text-right">{row.riceUtilized.toLocaleString()}</td>
                <td className="p-3 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Complete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 bg-muted/50 font-semibold">
              <td className="p-3" col-Span="2">TOTAL</td>
              <td className="p-3 text-center">{fcrData.reduce((sum, row) => sum + row.totalAWCs, 0)}</td>
              <td className="p-3 text-center">{fcrData.reduce((sum, row) => sum + row.awcsReported, 0)}</td>
              <td className="p-3 text-right">{fcrData.reduce((sum, row) => sum + row.riceOpening, 0).toLocaleString()}</td>
              <td className="p-3 text-right">{fcrData.reduce((sum, row) => sum + row.riceReceived, 0).toLocaleString()}</td>
              <td className="p-3 text-right">{fcrData.reduce((sum, row) => sum + row.riceUtilized, 0).toLocaleString()}</td>
              <td className="p-3 text-center">-</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </CardContent>
  </Card>
);

// NHTS Project Status Component
const NHTSProjectStatus = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="h-5 w-5" />
        NHTS Project Status
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <div>
            <p className="font-semibold text-blue-800">Total Survey Coverage</p>
            <p className="text-sm text-blue-600">Households surveyed under NHTS</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-800">87,450</p>
            <p className="text-sm text-blue-600">92% Complete</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <div>
            <p className="font-semibold text-green-800">Data Processing</p>
            <p className="text-sm text-green-600">Records processed and verified</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-800">78,235</p>
            <p className="text-sm text-green-600">89% Complete</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
          <div>
            <p className="font-semibold text-orange-800">Pending Reviews</p>
            <p className="text-sm text-orange-600">Awaiting final approval</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-800">9,215</p>
            <p className="text-sm text-orange-600">11% Pending</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Recent Activities Component
const RecentActivitiesCard = ({ departmentId }) => {
  const activities = departmentId === 'dwo' ? [
    { id: 1, title: "FCR Report Generated", time: "2 hours ago", type: "report" },
    { id: 2, title: "NHTS Survey Data Updated", time: "4 hours ago", type: "update" },
    { id: 3, title: "New AWC Registered - Mancherial", time: "1 day ago", type: "registration" },
    { id: 4, title: "Nutrition Distribution Completed", time: "2 days ago", type: "distribution" },
    { id: 5, title: "Monthly Review Meeting", time: "3 days ago", type: "meeting" }
  ] : [
    { id: 1, title: "Budget approval completed", time: "2 hours ago", type: "finance" },
    { id: 2, title: "New project milestone reached", time: "4 hours ago", type: "project" },
    { id: 3, title: "Staff training session completed", time: "1 day ago", type: "training" },
    { id: 4, title: "Monthly report submitted", time: "2 days ago", type: "report" },
    { id: 5, title: "Department meeting scheduled", time: "3 days ago", type: "meeting" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-start p-3 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activity.type === 'report' ? 'bg-blue-100 text-blue-800' :
                activity.type === 'update' ? 'bg-green-100 text-green-800' :
                activity.type === 'registration' ? 'bg-purple-100 text-purple-800' :
                activity.type === 'distribution' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const DepartmentDashboardPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('dwo');
  
  const currentDepartment = departments.find(d => d.id === selectedDepartment) || departments[0];
  
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <span>Dashboards</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Department Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-2">{currentDepartment.name}</h1>
          <p className="text-muted-foreground mt-1">{currentDepartment.description}</p>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-2 bg-muted px-3 py-1.5 rounded-md">
          <CalendarIcon className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nhts">NHTS Project</TabsTrigger>
          <TabsTrigger value="reports">Data Reports</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Department selector */}
          <div className="flex flex-wrap gap-2">
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:shadow-md ${
                  selectedDepartment === dept.id 
                    ? `${dept.color} text-white shadow-lg` 
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <div className="font-medium">{dept.name}</div>
                <div className="text-xs opacity-75">{dept.description}</div>
              </button>
            ))}
          </div>
          
          {/* Department metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentMetrics(selectedDepartment).map((metric) => (
              <MetricCard key={metric.id} metric={metric} className="hover:scale-105 transition-transform" />
            ))}
          </div>
          
          {/* Charts and visualizations */}
          {selectedDepartment === 'dwo' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NHTSProjectStatus />
              <RecentActivitiesCard departmentId={selectedDepartment} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Budget charts will be implemented here
                  </div>
                </CardContent>
              </Card>
              <RecentActivitiesCard departmentId={selectedDepartment} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="nhts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  NHTS Survey Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Survey Completion</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Data Processing</span>
                      <span className="text-sm text-muted-foreground">89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{width: '89%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Quality Verification</span>
                      <span className="text-sm text-muted-foreground">76%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{width: '76%'}}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">87,450</div>
                      <div className="text-sm text-blue-700">Total Households</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">78,235</div>
                      <div className="text-sm text-green-700">Completed Surveys</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Survey Teams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Teams</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Surveyors</span>
                      <span className="font-semibold">48</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Daily Surveys</span>
                      <span className="font-semibold">285</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Accuracy Rate</span>
                      <span className="font-semibold text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Validation Errors</span>
                      <span className="font-semibold text-orange-600">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Re-surveys Required</span>
                      <span className="font-semibold text-red-600">325</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">FCR Reports</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">PHC Mapping</p>
                    <p className="text-2xl font-bold">Updated</p>
                  </div>
                  <MapPin className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">THR Reports</p>
                    <p className="text-2xl font-bold">Current</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Utilization</p>
                    <p className="text-2xl font-bold">89%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <FCRTable />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>PHC Mapping Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Primary Health Centers</span>
                    <span className="text-lg font-bold text-blue-600">24</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Sub-Centers Mapped</span>
                    <span className="text-lg font-bold text-green-600">156</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Coverage Area</span>
                    <span className="text-lg font-bold text-orange-600">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>THR Distribution Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Beneficiaries Covered</span>
                    <span className="text-lg font-bold text-purple-600">42,185</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium">Distribution Rate</span>
                    <span className="text-lg font-bold text-pink-600">96.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="font-medium">Monthly Target</span>
                    <span className="text-lg font-bold text-indigo-600">43,560</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Department Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDepartment === 'dwo' ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">NHTS (National Health & Nutrition Survey)</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Active</span>
                    </div>
                    <p className="text-muted-foreground mb-3">Comprehensive household survey for health and nutrition data collection</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="ml-1 font-medium">92%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="ml-1 font-medium">On Track</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="ml-1 font-medium">₹2.4 Cr</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">Anganwadi Modernization</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Ongoing</span>
                    </div>
                    <p className="text-muted-foreground mb-3">Infrastructure development and technology upgrades for AWCs</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="ml-1 font-medium">78%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="ml-1 font-medium">On Track</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="ml-1 font-medium">₹5.8 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Project listing and details will be implemented for {currentDepartment.name}.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Directory</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDepartment === 'dwo' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Anganwadi Workers</h4>
                    <p className="text-2xl font-bold text-blue-600">973</p>
                    <p className="text-sm text-muted-foreground">Active across all centers</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Supervisors</h4>
                    <p className="text-2xl font-bold text-green-600">89</p>
                    <p className="text-sm text-muted-foreground">Field supervisors</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Helpers</h4>
                    <p className="text-2xl font-bold text-orange-600">845</p>
                    <p className="text-sm text-muted-foreground">Assistant workers</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Staff listing and management will be implemented for {currentDepartment.name}.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartmentDashboardPage;