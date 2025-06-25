import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Coffee } from 'lucide-react';
import { spotFeedingDailyAttendance, spotFeedingMonthlyAttendance } from '@/app/data/staticData';

const SpotFeedingReportTab: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-orange-600" />
          Spot Feeding Daily Attendance (16/06/2025)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-center p-3 font-semibold">Total PW</th>
                <th className="text-center p-3 font-semibold">PW Attended (%)</th>
                <th className="text-center p-3 font-semibold">Total LW</th>
                <th className="text-center p-3 font-semibold">LW Attended (%)</th>
                <th className="text-center p-3 font-semibold">Total Child</th>
                <th className="text-center p-3 font-semibold">Child Attended (%)</th>
              </tr>
            </thead>
            <tbody>
              {spotFeedingDailyAttendance.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3 text-center">{row.totalPW}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.pwAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.totalLW}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.lwAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.totalChild}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.childAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="h-5 w-5 text-brown-600" />
          Spot Feeding Monthly Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Month</th>
                <th className="text-center p-3 font-semibold">Total PW and LW</th>
                <th className="text-center p-3 font-semibold">Total Pre School Children</th>
                <th className="text-center p-3 font-semibold">Total Beneficiaries</th>
                <th className="text-center p-3 font-semibold">Attended less than 21 Days (%)</th>
              </tr>
            </thead>
            <tbody>
              {spotFeedingMonthlyAttendance.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{row.month}</td>
                  <td className="p-3 text-center">{row.totalPWLW}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.totalPreSchoolChildren}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.totalBeneficiaries}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.attendedLessThan21DaysPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SpotFeedingReportTab;