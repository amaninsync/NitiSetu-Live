
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DownloadCloud, 
  FileText, 
  Filter, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import ReportViewTable from '@/components/table/report-view-table';

const TableViewPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dataTable');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if user can access report cards based on role
  const canAccessReportCards = user && 
    ['district_collector', 'additional_collector', 'department_lead', 'admin'].includes(user.role);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Table & Report View</h1>
        <p className="text-muted-foreground">
          View, filter, and export data in tabular format
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dataTable">Data Tables</TabsTrigger>
          {canAccessReportCards && (
            <TabsTrigger value="reportCards">Report Cards</TabsTrigger>
          )}
          <TabsTrigger value="dashboards">Generated Dashboards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dataTable" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Department Data</CardTitle>
                <CardDescription>
                  View and analyze department performance data
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <DownloadCloud className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">
                        <div className="flex items-center gap-1">
                          Department
                          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Head
                          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          Budget Allocation
                          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          Budget Utilized
                          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          Projects
                          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          Performance
                          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Rural Development</TableCell>
                      <TableCell>Sri Venkatesh Dhotre</TableCell>
                      <TableCell className="text-right">₹ 245.80 Cr</TableCell>
                      <TableCell className="text-right">₹ 142.30 Cr</TableCell>
                      <TableCell className="text-right">24</TableCell>
                      <TableCell className="text-right">86%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Health & Family Welfare</TableCell>
                      <TableCell>Dr. Priya Singh</TableCell>
                      <TableCell className="text-right">₹ 314.50 Cr</TableCell>
                      <TableCell className="text-right">₹ 287.45 Cr</TableCell>
                      <TableCell className="text-right">36</TableCell>
                      <TableCell className="text-right">92%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Education</TableCell>
                      <TableCell>Sanjay Mehta</TableCell>
                      <TableCell className="text-right">₹ 178.20 Cr</TableCell>
                      <TableCell className="text-right">₹ 145.75 Cr</TableCell>
                      <TableCell className="text-right">18</TableCell>
                      <TableCell className="text-right">78%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Agriculture</TableCell>
                      <TableCell>Anita Desai</TableCell>
                      <TableCell className="text-right">₹ 156.40 Cr</TableCell>
                      <TableCell className="text-right">₹ 98.35 Cr</TableCell>
                      <TableCell className="text-right">15</TableCell>
                      <TableCell className="text-right">81%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {canAccessReportCards && (
          <TabsContent value="reportCards" className="mt-6">
            <ReportViewTable />
          </TabsContent>
        )}
        
        <TabsContent value="dashboards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Dashboards</CardTitle>
              <CardDescription>
                View dashboards generated from uploaded data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Department Performance</CardTitle>
                    <CardDescription>Last updated: May 10, 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[120px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Dashboard Preview</span>
                    </div>
                    <Button className="w-full mt-4">View Dashboard</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Budget Analysis</CardTitle>
                    <CardDescription>Last updated: May 8, 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[120px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Dashboard Preview</span>
                    </div>
                    <Button className="w-full mt-4">View Dashboard</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Project Status</CardTitle>
                    <CardDescription>Last updated: May 12, 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[120px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Dashboard Preview</span>
                    </div>
                    <Button className="w-full mt-4">View Dashboard</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TableViewPage;
