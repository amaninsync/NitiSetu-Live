
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DownloadCloud, 
  ChevronLeft, 
  ChevronRight, 
  FileCheck, 
  FileText, 
  File,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Mock data for report cards
const reportCardData = [
  {
    id: '1',
    department: 'Health & Family Welfare',
    reportType: 'Quarterly Performance',
    submittedBy: 'Dr. Priya Singh',
    submittedDate: '2025-05-01',
    status: 'approved',
    score: 92,
    comments: 'Excellent progress on immunization targets',
  },
  {
    id: '2',
    department: 'Rural Development',
    reportType: 'Monthly Progress',
    submittedBy: 'User',
    submittedDate: '2025-05-05',
    status: 'pending',
    score: null,
    comments: 'Awaiting final verification',
  },
  {
    id: '3',
    department: 'Education',
    reportType: 'Quarterly Performance',
    submittedBy: 'Sanjay Mehta',
    submittedDate: '2025-05-03',
    status: 'rejected',
    score: 45,
    comments: 'Inconsistent data on enrollment figures',
  },
  {
    id: '4',
    department: 'Agriculture',
    reportType: 'Project Completion',
    submittedBy: 'Anita Desai',
    submittedDate: '2025-04-28',
    status: 'approved',
    score: 85,
    comments: 'Good implementation of irrigation project',
  },
  {
    id: '5',
    department: 'Water Resources',
    reportType: 'Monthly Progress',
    submittedBy: 'Vikram Singh',
    submittedDate: '2025-05-10',
    status: 'pending',
    score: null,
    comments: 'Under review by department head',
  },
];

const ReportViewTable: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-800">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Department Report Cards</CardTitle>
          <CardDescription>
            Review submitted reports and their evaluation scores
          </CardDescription>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <DownloadCloud className="h-4 w-4" />
          Export Reports
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Report Type</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportCardData.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.department}</TableCell>
                  <TableCell>{report.reportType}</TableCell>
                  <TableCell>{report.submittedBy}</TableCell>
                  <TableCell>{new Date(report.submittedDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell className="text-right">
                    {report.score !== null ? (
                      <span 
                        className={cn(
                          "font-medium",
                          report.score >= 80 ? "text-green-600" : 
                          report.score >= 60 ? "text-amber-600" : 
                          "text-red-600"
                        )}
                      >
                        {report.score}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" title="View Report">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Download Report">
                        <FileCheck className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportViewTable;
