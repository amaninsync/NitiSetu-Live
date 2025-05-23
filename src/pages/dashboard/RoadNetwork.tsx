
import React from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const RoadMap = () => {
  return (
    <div className="h-full flex items-center justify-center p-4 bg-muted/20 rounded-lg">
      <div className="text-center">
        <svg className="w-16 h-16 mx-auto text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <p className="mt-2 text-muted-foreground">Interactive map visualization</p>
      </div>
    </div>
  );
};

const RoadNetwork = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Road Network Expansion</h1>
        <div className="flex items-center gap-4">
          <Card className="p-4">
            <span className="text-sm font-medium text-primary">Audit Form</span>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Auditor Name</label>
              <Select defaultValue="arjun">
                <SelectTrigger>
                  <SelectValue placeholder="Select Auditor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arjun">Arjun Sharma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Department</label>
                <Select defaultValue="executive">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Gram Panchayat</label>
                <Select defaultValue="gp1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gp1">GP1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Project Start Date</label>
                <p className="mt-1 text-sm">May 1, 2024</p>
              </div>
              <div>
                <label className="text-sm font-medium">Project End Date</label>
                <p className="mt-1 text-sm">Aug 30, 2024</p>
              </div>
              <div>
                <label className="text-sm font-medium">Audit Date</label>
                <p className="mt-1 text-sm">Aug 29, 2024</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Progress Score</label>
              <Progress value={45} className="mt-2" />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>15</span>
                <span>400</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <RoadMap />
        </Card>
      </div>
    </div>
  );
};

export default RoadNetwork;
