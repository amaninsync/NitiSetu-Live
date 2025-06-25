import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Baby, Users, Scale, Home } from 'lucide-react';
import { icpsData, childProtectionStats, childProtectionCommittees } from '@/app/data/staticData';

const ICPSReportTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Integrated Child Protection Services (ICPS) - Case Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Case No</th>
                  <th className="text-left p-3 font-semibold">Date of Entry</th>
                  <th className="text-left p-3 font-semibold">Child Name</th>
                  <th className="text-center p-3 font-semibold">Age</th>
                  <th className="text-left p-3 font-semibold">Circumstances</th>
                  <th className="text-left p-3 font-semibold">Police Station</th>
                </tr>
              </thead>
              <tbody>
                {icpsData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="p-3">{row.caseNo}</td>
                    <td className="p-3">{row.dateOfEntry}</td>
                    <td className="p-3 font-medium">{row.childName}</td>
                    <td className="p-3 text-center">{row.age}</td>
                    <td className="p-3">{row.circumstances}</td>
                    <td className="p-3">{row.policeStation || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Child Protection Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex justify-between"><span>Orphans:</span> <span className="font-semibold">{childProtectionStats.orphans}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>Semi-orphans:</span> <span className="font-semibold">{childProtectionStats.semiOrphans}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>COVID-Orphans:</span> <span className="font-semibold">{childProtectionStats.covidOrphans}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>COVID-Semi Orphans:</span> <span className="font-semibold">{childProtectionStats.covidSemiOrphans}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>HIV Affected:</span> <span className="font-semibold">{childProtectionStats.hivAffected}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>Others:</span> <span className="font-semibold">{childProtectionStats.others}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between border-t mt-2 pt-2"><span>Total Sponsorships:</span> <span className="font-bold text-lg">{childProtectionStats.totalSponsorship}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="h-5 w-5 text-green-600" />
              POCSO Victim Compensation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex justify-between"><span>Required Budget (Upto 2024):</span> <span className="font-bold text-lg">₹{parseInt(childProtectionStats.pocsoVictimCompensationBudget).toLocaleString()}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>Total Victims (2014-2024):</span> <span className="font-semibold">{childProtectionStats.totalVictims2014_2024}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="h-5 w-5 text-purple-600" />
              Child Protection Committees
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex justify-between"><span>Village Level:</span> <span className="font-semibold">{childProtectionCommittees.villageChildProtectionCommittees}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>Mandal Level:</span> <span className="font-semibold">{childProtectionCommittees.mandalLevelChildProtectionCommittee}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>District Level:</span> <span className="font-semibold">{childProtectionCommittees.district}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>UCPC (Ward Level):</span> <span className="font-semibold">{childProtectionCommittees.ucpcWardLevel}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ICPSReportTab;