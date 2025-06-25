import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, MapPin } from 'lucide-react';

const NHTSProjectStatus: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="h-5 w-5" />
        NHTS Project Status
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <div>
            <p className="font-semibold text-blue-800">Total Survey Coverage</p>
            <p className="text-sm text-blue-600">Households surveyed under NHTS</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-800">87,450</p>
            <p className="text-sm text-blue-600">92% Complete</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <div>
            <p className="font-semibold text-green-800">Data Processing</p>
            <p className="text-sm text-green-600">Records processed and verified</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-800">78,235</p>
            <p className="text-sm text-green-600">89% Complete</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
          <div>
            <p className="font-semibold text-orange-800">Pending Reviews</p>
            <p className="text-sm text-orange-600">Awaiting final approval</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-800">9,215</p>
            <p className="text-sm text-orange-600">11% Pending</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default NHTSProjectStatus;