import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun } from 'lucide-react';
import { operationSmileMuskanData } from '@/app/data/staticData';

const OperationSmileMuskanTab: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Sun className="h-5 w-5 text-yellow-600" />
        Operation Smile & Muskan Data
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {Object.entries(operationSmileMuskanData).map(([date, count]) => (
          <div key={date} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <div>
              <p className="font-semibold text-yellow-800">Operation {new Date(date).getMonth() === 0 ? 'Smile' : 'Muskan'} - {new Date(date).getFullYear()}</p>
              <p className="text-sm text-yellow-600">Date: {new Date(date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-800">{count}</p>
              <p className="text-sm text-yellow-600">Children Rescued/Identified</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">Data reflects the number of individuals identified or rescued during these operations.</p>
    </CardContent>
  </Card>
);

export default OperationSmileMuskanTab;