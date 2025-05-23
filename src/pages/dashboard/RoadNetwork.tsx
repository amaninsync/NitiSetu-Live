
import React from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import RoadMap from '@/components/dashboard/RoadMap';

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
