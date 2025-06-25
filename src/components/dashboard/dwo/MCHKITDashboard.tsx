// MCHKitDashboard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, FlaskConical, Stethoscope, Syringe, ClipboardCheck, CalendarIcon } from 'lucide-react'; // Added new icons

const mchKitData = [
  { id: 1, type: "Delivery Kits", issued: 120, pending: 15, status: "Good" },
  { id: 2, type: "Newborn Care Kits", issued: 100, pending: 20, status: "Good" },
  { id: 3, type: "ANC Checkup Kits", issued: 150, pending: 10, status: "Good" },
  { id: 4, type: "PNC Checkup Kits", issued: 90, pending: 5, status: "Good" },
  { id: 5, type: "Immunization Kits", issued: 110, pending: 8, status: "Good" },
];

const MCHKitDashboard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-red-500" />
          MCH Kit Management Dashboard
        </CardTitle>
        <p className="text-sm text-muted-foreground">Overview of Mother and Child Health Kit distribution and stock.</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3">
            <FlaskConical className="h-6 w-6 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-800">Total Kits Issued (Current Month)</p>
              <p className="text-2xl font-bold text-red-800">570</p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg flex items-center gap-3">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800">Pending Distributions</p>
              <p className="text-2xl font-bold text-blue-800">58</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg flex items-center gap-3">
            <ClipboardCheck className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Overall Compliance Rate</p>
              <p className="text-2xl font-bold text-green-800">92%</p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Syringe className="h-5 w-5 text-gray-600" />
          Kit Type Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kit Type</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issued</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mchKitData.map((kit) => (
                <tr key={kit.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{kit.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-muted-foreground">{kit.issued}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-muted-foreground">{kit.pending}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      kit.status === 'Good' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {kit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
          <CalendarIcon className="h-3 w-3" /> Data as of {new Date().toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default MCHKitDashboard;