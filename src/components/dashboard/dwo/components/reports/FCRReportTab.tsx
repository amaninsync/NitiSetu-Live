import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { fcrData } from '@/app/data/staticData'; // Import fcrData

interface FCRReportTabProps {
  mandals: any[]; // You can define a more specific type if needed
  gramPanchayats: any[];
  municipalities: any[];
}

const FCRReportTab: React.FC<FCRReportTabProps> = ({ mandals, gramPanchayats, municipalities }) => (
  <Card className="col-span-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Package className="h-5 w-5" />
        Food Consolidation Report (FCR) - January 2025
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-semibold">District</th>
              <th className="text-left p-3 font-semibold">Mandal</th>
              <th className="text-center p-3 font-semibold">Total AWCs</th>
              <th className="text-center p-3 font-semibold">Reported</th>
              <th className="text-right p-3 font-semibold">Rice Opening (Kg)</th>
              <th className="text-right p-3 font-semibold">Rice Received (Kg)</th>
              <th className="text-right p-3 font-semibold">Rice Utilized (Kg)</th>
              <th className="text-center p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {fcrData.map((row) => (
              <tr key={row.slNo} className="border-b hover:bg-muted/30">
                <td className="p-3">{row.district}</td>
                <td className="p-3 font-medium">{row.name}</td>
                <td className="p-3 text-center">{row.totalAWCs}</td>
                <td className="p-3 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {row.awcsReported}
                  </span>
                </td>
                <td className="p-3 text-right">{row.riceOpening.toLocaleString()}</td>
                <td className="p-3 text-right">{row.riceReceived.toLocaleString()}</td>
                <td className="p-3 text-right">{row.riceUtilized.toLocaleString()}</td>
                <td className="p-3 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Complete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 bg-muted/50 font-semibold">
              <td className="p-3" colSpan={2}>TOTAL</td>
              <td className="p-3 text-center">{fcrData.reduce((sum, row) => sum + row.totalAWCs, 0)}</td>
              <td className="p-3 text-center">{fcrData.reduce((sum, row) => sum + row.awcsReported, 0)}</td>
              <td className="p-3 text-right">{fcrData.reduce((sum, row) => sum + row.riceOpening, 0).toLocaleString()}</td>
              <td className="p-3 text-right">{fcrData.reduce((sum, row) => sum + row.riceReceived, 0).toLocaleString()}</td>
              <td className="p-3 text-right">{fcrData.reduce((sum, row) => sum + row.riceUtilized, 0).toLocaleString()}</td>
              <td className="p-3 text-center">-</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </CardContent>
  </Card>
);

export default FCRReportTab;