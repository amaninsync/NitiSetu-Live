
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import FileUpload from './file-upload';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface EmployeeUploadFormValues {
  department: string;
  reportType: string;
  reportingPeriod: Date | undefined;
  category: string;
  comments: string;
}

const EmployeeUpload: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<EmployeeUploadFormValues>({
    defaultValues: {
      department: user?.departmentId || '',
      reportType: '',
      reportingPeriod: undefined,
      category: '',
      comments: '',
    },
  });
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };
  
  const onSubmit = (values: EmployeeUploadFormValues) => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please select at least one file to upload.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Upload successful",
        description: `${files.length} file(s) have been uploaded successfully.`,
      });
      
      // Reset form
      form.reset();
      setFiles([]);
      setIsSubmitting(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={user?.role !== 'district_collector' && user?.role !== 'admin'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health & Family Welfare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="rural">Rural Development</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="water">Water Resources</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the department this report belongs to
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly Report</SelectItem>
                      <SelectItem value="quarterly">Quarterly Report</SelectItem>
                      <SelectItem value="project">Project Status Report</SelectItem>
                      <SelectItem value="financial">Financial Statement</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Type of report being submitted
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reportingPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reporting Period</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The period this report covers
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance Metrics</SelectItem>
                      <SelectItem value="budget">Budget & Expenditure</SelectItem>
                      <SelectItem value="beneficiary">Beneficiary Data</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="human_resources">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Category of data being submitted
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add any relevant comments or notes about this submission" 
                    className="min-h-[100px]" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional: provide additional context for this data submission
                </FormDescription>
              </FormItem>
            )}
          />
          
          <Card>
            <CardContent className="pt-6">
              <FormLabel className="block mb-2">Upload Files</FormLabel>
              <FileUpload 
                allowedTypes={['.xlsx', '.csv', '.pdf']}
                multiple={true}
                maxSizeMB={10}
                onFilesSelected={handleFilesSelected}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setFiles([]);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload Files"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeUpload;
