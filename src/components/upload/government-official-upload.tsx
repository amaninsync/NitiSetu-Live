
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface GovernmentOfficialUploadFormValues {
  documentType: string;
  governmentBody: string;
  policyCategory: string;
  orderNumber: string;
  effectiveDate: Date | undefined;
  priority: string;
  description: string;
}

const GovernmentOfficialUpload: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<GovernmentOfficialUploadFormValues>({
    defaultValues: {
      documentType: '',
      governmentBody: '',
      policyCategory: '',
      orderNumber: '',
      effectiveDate: undefined,
      priority: 'normal',
      description: '',
    },
  });
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };
  
  const onSubmit = (values: GovernmentOfficialUploadFormValues) => {
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
        title: "Official document uploaded",
        description: `Document number ${values.orderNumber} has been successfully uploaded.`,
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
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="go">Government Order</SelectItem>
                      <SelectItem value="circular">Circular</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="memo">Memorandum</SelectItem>
                      <SelectItem value="policy">Policy Document</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Type of official document being uploaded
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="governmentBody"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Government Body</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select government body" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="state">State Government</SelectItem>
                      <SelectItem value="center">Central Government</SelectItem>
                      <SelectItem value="district">District Administration</SelectItem>
                      <SelectItem value="local">Local Government</SelectItem>
                      <SelectItem value="other">Other Statutory Body</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Issuing government body
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="policyCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Policy Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="rural">Rural Development</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="admin">Administrative</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Category of the policy or order
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order/Notification Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. GO-MS-123/2025" {...field} />
                  </FormControl>
                  <FormDescription>
                    Unique reference number of the document
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effective Date</FormLabel>
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
                    Date from which this document takes effect
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Priority Level</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="normal" />
                        </FormControl>
                        <FormLabel className="font-normal">Normal</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="urgent" />
                        </FormControl>
                        <FormLabel className="font-normal">Urgent</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="critical" />
                        </FormControl>
                        <FormLabel className="font-normal">Critical</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Indicates the urgency of implementation
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide a brief description of this document and its purpose" 
                    className="min-h-[100px]" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Summary of the document's content and objectives
                </FormDescription>
              </FormItem>
            )}
          />
          
          <Card>
            <CardContent className="pt-6">
              <FormLabel className="block mb-2">Upload Official Document</FormLabel>
              <FileUpload 
                allowedTypes={['.pdf', '.docx', '.xlsx']}
                multiple={false}
                maxSizeMB={20}
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
              {isSubmitting ? "Uploading..." : "Submit Document"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GovernmentOfficialUpload;
