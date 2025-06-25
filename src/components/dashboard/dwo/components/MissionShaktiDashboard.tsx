import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, ClipboardList, Activity } from 'lucide-react';
import { missionShaktiActivityWise, missionShaktiBBBPData, weeklyActivityReportData } from '@/app/data/staticData';

const MissionShaktiDashboard: React.FC = () => (
  <div className="space-y-6">
    {Object.entries(missionShaktiActivityWise).map(([year, activities]) => (
      <Card key={year}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-purple-600" />
            Mission Shakti Activities - {year}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Activity Name</th>
                  <th className="text-center p-3 font-semibold">No. of Activities Conducted</th>
                  <th className="text-center p-3 font-semibold">Number of Participants</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="p-3">{row.activityName}</td>
                    <td className="p-3 text-center">{row.noOfActivitiesConducted}<small className="text-sm text-muted-foreground ml-1"></small></td>
                    <td className="p-3 text-center">{row.numberOfParticipants.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    ))}

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-blue-600" />
          BBBP Data - Sectoral Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(missionShaktiBBBPData).map(([category, data], index) => (
            <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold mb-3">{category}</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="text-left p-2 font-semibold">Quarter</th>
                                <th className="text-left p-2 font-semibold">Year</th>
                                <th className="text-left p-2 font-semibold">Month</th>
                                <th className="text-center p-2 font-semibold">Activity Count / Conducted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border-b hover:bg-muted/30">
                                    <td className="p-2">{row.quarter || row.financialYear}<small className="text-sm text-muted-foreground ml-1"></small></td>
                                    <td className="p-2">{row.year || row.financialYear}<small className="text-sm text-muted-foreground ml-1"></small></td>
                                    <td className="p-2">{row.month}<small className="text-sm text-muted-foreground ml-1"></small></td>
                                    <td className="p-2 text-center">{row.activity || row.isConducted}<small className="text-sm text-muted-foreground ml-1"></small></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Weekly Activity Report - Asifabad
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Week</th>
                <th className="text-left p-3 font-semibold">Activity</th>
                <th className="text-left p-3 font-semibold">Activity Type</th>
                <th className="text-center p-3 font-semibold">Participants</th>
                <th className="text-center p-3 font-semibold"> Panchayat Reps</th>
                <th className="text-center p-3 font-semibold"> Public Reps</th>
                <th className="text-center p-3 font-semibold"> Beneficiaries Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {weeklyActivityReportData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3">{row.week}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3">{row.activity}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3">{row.activityType}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.noOfParticipants}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.noOfRepresentativesPanchayatLocalBodies}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.noOfPublicRepresentatives}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.noOfBeneficiariesEnrolled}<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
                <tr className="border-t-2 bg-muted/50 font-semibold">
                    <td className="p-3" colSpan={3}>Total Participants</td>
                    <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfParticipants, 0).toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                    <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfRepresentativesPanchayatLocalBodies, 0).toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                    <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfPublicRepresentatives, 0).toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                    <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfBeneficiariesEnrolled, 0).toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default MissionShaktiDashboard;