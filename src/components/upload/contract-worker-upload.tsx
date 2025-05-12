
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import FileUpload from './file-upload';
import { useForm } from 'react-hook-form';

interface ContractWorkerUploadFormValues {
  project: string;
  deliverableType: string;
  milestone: string;
  completionPercentage: number;
  blockers: string;
  hoursWorked: string;
}

const ContractWorkerUpload: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContractWorkerUploadFormValues>({
    defaultValues: {
      project: '',
      deliverableType: '',
      milestone: '',
      completionPercentage: 0,
      blockers: '',
      hoursWorked: '',
    },
  });
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };
  
  const onSubmit = (values: ContractWorkerUploadFormValues) => {
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
        title: "Deliverable submitted",
        description: `Your work for project ${values.project} has been submitted for review.`,
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
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rural-roads">Rural Road Connectivity</SelectItem>
                      <SelectItem value="healthcare">Primary Healthcare Enhancement</SelectItem>
                      <SelectItem value="education">Education Technology Implementation</SelectItem>
                      <SelectItem value="water">Water Conservation Project</SelectItem>
                      <SelectItem value="agritech">Agricultural Technology Outreach</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Project you are submitting work for
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deliverableType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deliverable Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deliverable type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="report">Progress Report</SelectItem>
                      <SelectItem value="documentation">Documentation</SelectItem>
                      <SelectItem value="code">Software/Code</SelectItem>
                      <SelectItem value="design">Design/Mockup</SelectItem>
                      <SelectItem value="data">Data Collection</SelectItem>
                      <SelectItem value="media">Media Files</SelectItem>
                      <SelectItem value="final">Final Deliverable</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Type of work being submitted
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="milestone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Milestone/Phase</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select milestone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="implementation">Implementation</SelectItem>
                      <SelectItem value="testing">Testing/QA</SelectItem>
                      <SelectItem value="deployment">Deployment</SelectItem>
                      <SelectItem value="monitoring">Monitoring</SelectItem>
                      <SelectItem value="completion">Project Completion</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Current project phase or milestone
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hoursWorked"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours Worked</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="e.g. 40" {...field} />
                  </FormControl>
                  <FormDescription>
                    Total hours spent on this deliverable
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="completionPercentage"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Completion Percentage: {value}%</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[value]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(vals) => onChange(vals[0])}
                  />
                </FormControl>
                <FormDescription>
                  Estimated completion percentage of this milestone
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="blockers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issues/Blockers</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe any challenges, blockers, or issues encountered" 
                    className="min-h-[100px]" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Note any problems that may impact project timeline or quality
                </FormDescription>
              </FormItem>
            )}
          />
          
          <Card>
            <CardContent className="pt-6">
              <FormLabel className="block mb-2">Upload Deliverables</FormLabel>
              <FileUpload 
                allowedTypes={['.pdf', '.docx', '.xlsx', '.zip', '.rar', '.jpg', '.png']}
                multiple={true}
                maxSizeMB={50}
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
              {isSubmitting ? "Submitting..." : "Submit Deliverables"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContractWorkerUpload;
