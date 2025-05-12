
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileCheck, X, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EmployeeUpload from '@/components/upload/employee-upload';
import GovernmentOfficialUpload from '@/components/upload/government-official-upload';
import ContractWorkerUpload from '@/components/upload/contract-worker-upload';

const UploadPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<string>('upload');

  // Determine which upload interface to show based on user role
  const renderRoleSpecificUpload = () => {
    if (!user) return null;

    switch (user.role) {
      case 'district_collector':
      case 'additional_collector':
      case 'admin':
        // Admins and collectors can see all upload interfaces
        return (
          <Tabs defaultValue="employee" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="employee">Employee Upload</TabsTrigger>
              <TabsTrigger value="government">Government Official Upload</TabsTrigger>
              <TabsTrigger value="contractor">Contract Worker Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="employee">
              <EmployeeUpload />
            </TabsContent>
            
            <TabsContent value="government">
              <GovernmentOfficialUpload />
            </TabsContent>
            
            <TabsContent value="contractor">
              <ContractWorkerUpload />
            </TabsContent>
          </Tabs>
        );
        
      case 'department_lead':
        // Department leads can use the employee upload interface
        return <EmployeeUpload />;
        
      case 'government_official':
        // Government officials use their specialized upload interface
        return <GovernmentOfficialUpload />;
        
      case 'external_worker':
        // Contract workers use their specialized upload interface
        return <ContractWorkerUpload />;
        
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-lg font-medium">Upload Access Restricted</h3>
            <p className="text-muted-foreground mt-2">
              You don't have permission to upload files. Please contact your administrator.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">File Upload</h1>
        <p className="text-muted-foreground">
          Upload files for processing, visualization, and reporting
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="history">Upload History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Upload files for processing and dashboard generation.
                Please ensure your data follows the required format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderRoleSpecificUpload()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload History</CardTitle>
              <CardDescription>
                View your previous uploads and their processing status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Info className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-medium">No Upload History</h3>
                <p className="text-muted-foreground mt-2">
                  Once you upload files, they will appear here for tracking.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Download Templates</CardTitle>
              <CardDescription>
                Download the correct templates for your data uploads.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <FileCheck className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Monthly Report Template</div>
                    <div className="text-xs text-muted-foreground">Excel format (.xlsx)</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <FileCheck className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Quarterly Report Template</div>
                    <div className="text-xs text-muted-foreground">Excel format (.xlsx)</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <FileCheck className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Project Status Template</div>
                    <div className="text-xs text-muted-foreground">Excel format (.xlsx)</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadPage;
