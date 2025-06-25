import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface UtilizationReportTabProps {
  mandals: any[];
  gramPanchayats: any[];
  municipalities: any[];
}

const UtilizationReportTab: React.FC<UtilizationReportTabProps> = ({ mandals, gramPanchayats, municipalities }) => (
  <Card className="col-span-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Resource Utilization Report
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        This section would show various resource utilization metrics, such as budget utilization,
        infrastructure utilization, or human resource allocation.
      </p>
      <div className="mt-4 p-4 border rounded-lg bg-orange-50 text-orange-800">
        <h4 className="font-semibold">Example Data Points to be shown here:</h4>
        <ul className="list-disc list-inside ml-4 mt-2 text-sm">
          <li>Budget Utilization Rate: X%</li>
          <li>Infrastructure Usage (e.g., AWC building occupancy): Y%</li>
          <li>Staff deployment efficiency: Z%</li>
        </ul>
        <p className="text-xs text-orange-600 mt-2">
          (Note: Concrete data for utilization was not provided, this is a placeholder structure.)
        </p>
      </div>
    </CardContent>
  </Card>
);

export default UtilizationReportTab;