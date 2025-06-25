import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, UserCheck, Home } from 'lucide-react';
import { awcAttendanceSummary, awtAwhAttendanceReport } from '@/app/data/staticData';

const AWCAttendanceReportTab: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-blue-600" />
          AWC Opened & Attendance Submitted (16/06/2025)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-center p-3 font-semibold">Total AWCs</th>
                <th className="text-center p-3 font-semibold">AWCs Opened (%)</th>
                <th className="text-center p-3 font-semibold">AWTs Submitted Attendance (%)</th>
                <th className="text-center p-3 font-semibold">AWTs Not Submitted Attendance (%)</th>
              </tr>
            </thead>
            <tbody>
              {awcAttendanceSummary.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3 text-center">{row.totalAWCs}</td>
                  <td className="p-3 text-center">{row.openedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.awtSubmittedAttendance}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.attendanceNotSubmittedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
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
          <UserCheck className="h-5 w-5 text-green-600" />
          AWTs and AWHs Attendance Report (16/06/2025)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-center p-3 font-semibold">AWTs In-Position</th>
                <th className="text-center p-3 font-semibold">AWTs Attended (%)</th>
                <th className="text-center p-3 font-semibold">AWHs In-Position</th>
                <th className="text-center p-3 font-semibold">AWHs Attended (%)</th>
              </tr>
            </thead>
            <tbody>
              {awtAwhAttendanceReport.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3 text-center">{row.awtsInPosition}</td>
                  <td className="p-3 text-center">{row.awtsAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.awhsInPosition}</td>
                  <td className="p-3 text-center">{row.awhsAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AWCAttendanceReportTab;