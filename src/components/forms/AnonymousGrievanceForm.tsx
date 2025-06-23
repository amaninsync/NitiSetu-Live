import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast'; // Assuming you have a toast component

const AnonymousGrievanceForm: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [grievanceType, setGrievanceType] = useState('');
  const [departmentOrIndividual, setDepartmentOrIndividual] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    // For now, we'll just log it and show a toast.
    console.log({
      subject,
      grievanceType,
      departmentOrIndividual,
      description,
    });

    toast({
      title: "Grievance Submitted Anonymously",
      description: "Your grievance has been successfully submitted to the Collector/Additional Collector.",
      variant: "default",
    });

    // Reset form fields
    setSubject('');
    setGrievanceType('');
    setDepartmentOrIndividual('');
    setDescription('');
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto py-8 px-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Anonymous Grievance Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Use this form to submit anonymous grievances directly to the Collector or Additional Collector.
            Your identity will remain confidential.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="subject">Subject of Grievance</Label>
              <Input
                id="subject"
                type="text"
                placeholder="e.g., Unfair treatment, resource misuse"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="grievanceType">Nature of Grievance</Label>
              <Select value={grievanceType} onValueChange={setGrievanceType} required>
                <SelectTrigger id="grievanceType">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="harassment">Harassment/Misconduct</SelectItem>
                  <SelectItem value="corruption">Corruption/Fraud</SelectItem>
                  <SelectItem value="discrimination">Discrimination</SelectItem>
                  <SelectItem value="resource_misuse">Resource Misuse/Waste</SelectItem>
                  <SelectItem value="work_environment">Unsafe/Unfair Work Environment</SelectItem>
                  <SelectItem value="policy_violation">Policy Violation</SelectItem>
                  <SelectItem value="other">Other (Please describe below)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="departmentOrIndividual">Department/Individual Involved (Optional)</Label>
              <Input
                id="departmentOrIndividual"
                type="text"
                placeholder="e.g., XYZ Department, John Doe"
                value={departmentOrIndividual}
                onChange={(e) => setDepartmentOrIndividual(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide a detailed description of the grievance, including dates, times, and any relevant context. Do not include personal identifying information unless absolutely necessary for the grievance itself."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={7}
                required
              />
            </div>
            <Button type="submit" className="w-full">Submit Grievance</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnonymousGrievanceForm;