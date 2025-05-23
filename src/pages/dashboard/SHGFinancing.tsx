
import React from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const data = [
  {
    mandal: "Asifabad",
    apm: "G. Sadanandam",
    cc: "K. Shanker",
    targetPHY: 157,
    targetFIN: 531.27,
    achievementPHY: 49,
    achievementFIN: 293.43,
    achievementPercent: 59.62
  },
  {
    mandal: "Asifabad",
    apm: "G. Sadanandam",
    cc: "Sakrubai",
    targetPHY: 130,
    targetFIN: 436.87,
    achievementPHY: 61,
    achievementFIN: 286.38,
    achievementPercent: 71.99
  },
  {
    mandal: "Dahegaon",
    apm: "G Chandra Shekar",
    cc: "K. Mallesh",
    targetPHY: 91,
    targetFIN: 245.5,
    achievementPHY: 25,
    achievementFIN: 203,
    achievementPercent: 96.56
  },
  {
    mandal: "Wankidi",
    apm: "Mahesh",
    cc: "Bheem Rao",
    targetPHY: 78,
    targetFIN: 299.41,
    achievementPHY: 51,
    achievementFIN: 330.5,
    achievementPercent: 146.8
  },
  {
    mandal: "Wankidi",
    apm: "Mahesh",
    cc: "Shyam Rao",
    targetPHY: 62,
    targetFIN: 197.76,
    achievementPHY: 40,
    achievementFIN: 239.9,
    achievementPercent: 140.2
  },
];

const SHGFinancing = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Project SHG Financing and Collection</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Name of the Mandal" />
            </SelectTrigger>
            <SelectContent>
              {[...new Set(data.map(d => d.mandal))].map(mandal => (
                <SelectItem key={mandal} value={mandal}>{mandal}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">No. of Mandals</p>
            <p className="text-2xl font-bold">{[...new Set(data.map(d => d.mandal))].length}</p>
          </Card>
        </div>

        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Name of the APM" />
            </SelectTrigger>
            <SelectContent>
              {[...new Set(data.map(d => d.apm))].map(apm => (
                <SelectItem key={apm} value={apm}>{apm}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">No. of Assoc Project Managers</p>
            <p className="text-2xl font-bold">{[...new Set(data.map(d => d.apm))].length}</p>
          </Card>
        </div>

        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Name of the CC" />
            </SelectTrigger>
            <SelectContent>
              {[...new Set(data.map(d => d.cc))].map(cc => (
                <SelectItem key={cc} value={cc}>{cc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">No. of Community Coordinators</p>
            <p className="text-2xl font-bold">{[...new Set(data.map(d => d.cc))].length}</p>
          </Card>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Loan Recovery Progress</h2>
          <div className="text-center">
            <Progress value={74.9} className="w-40" />
            <p className="text-sm text-muted-foreground mt-2">74.9%</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="text-left bg-muted">
                <th className="p-4">Mandal</th>
                <th className="p-4">APM</th>
                <th className="p-4">CC</th>
                <th className="p-4">Target PHY</th>
                <th className="p-4">Target FIN</th>
                <th className="p-4">Achievement PHY</th>
                <th className="p-4">Achievement FIN</th>
                <th className="p-4">Progress</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4">{row.mandal}</td>
                  <td className="p-4">{row.apm}</td>
                  <td className="p-4">{row.cc}</td>
                  <td className="p-4">{row.targetPHY}</td>
                  <td className="p-4">{row.targetFIN}</td>
                  <td className="p-4">{row.achievementPHY}</td>
                  <td className="p-4">{row.achievementFIN}</td>
                  <td className="p-4 w-40">
                    <Progress value={row.achievementPercent} />
                    <p className="text-xs text-muted-foreground mt-1">{row.achievementPercent}%</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SHGFinancing;
