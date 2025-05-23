import React from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HealthData = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gov-blue">HMIS Health Data</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Indicator Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ind1">Live Birth - Female</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Indicator Code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="code1">4.1.1.b</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Code and Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cs1">Section 1</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-4">Sub-District</th>
                <th className="p-4">Indicator Name</th>
                <th className="p-4">Indicator Code</th>
                <th className="p-4">Urban</th>
                <th className="p-4">Rural</th>
                <th className="p-4">Public Facility</th>
                <th className="p-4">Private Facility</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4">NA</td>
                <td className="p-4">Live Birth - Female</td>
                <td className="p-4">4.1.1.b</td>
                <td className="p-4">NA</td>
                <td className="p-4">71</td>
                <td className="p-4">NA</td>
                <td className="p-4">71</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default HealthData;