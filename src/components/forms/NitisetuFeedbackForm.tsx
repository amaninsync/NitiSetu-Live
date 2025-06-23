import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast'; // Assuming you have a toast component

const NitisetuFeedbackForm: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    // For now, we'll just log it and show a toast.
    console.log({
      feedbackType,
      name,
      email,
      subject,
      message,
    });

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback! We will get back to you if required.",
      variant: "default",
    });

    // Reset form fields
    setFeedbackType('');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto py-8 px-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Nitisetu Queries & Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Have a question, suggestion, or encountered an issue with Nitisetu? Please let us know.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="feedbackType">Type of Feedback</Label>
              <Select value={feedbackType} onValueChange={setFeedbackType} required>
                <SelectTrigger id="feedbackType">
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="query">General Query/Question</SelectItem>
                  <SelectItem value="suggestion">Suggestion/Feature Request</SelectItem>
                  <SelectItem value="bug">Bug Report/Technical Issue</SelectItem>
                  <SelectItem value="praise">Praise/Positive Feedback</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">Your Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Your Email (Optional, for response)</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., janedoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                placeholder="e.g., Question about X feature, Bug in Y module"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your query, question, or feedback in detail."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                required
              />
            </div>
            <Button type="submit" className="w-full">Submit Feedback</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NitisetuFeedbackForm;