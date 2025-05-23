import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Building, Tractor, Cloud, Users2, Factory } from 'lucide-react';

const populationData = [
  { name: 'Malangondi', population: 2000 },
  { name: 'Venkatapur', population: 1800 },
  { name: 'Appapally', population: 1700 },
  { name: 'Tumpalli', population: 1600 },
  { name: 'Kosara', population: 1500 },
];

const genderData = [
  { name: 'Malangondi', value: 23.3 },
  { name: 'Venkatapur', value: 20.9 },
  { name: 'Appapally', value: 19.9 },
  { name: 'Tumpalli', value: 18.6 },
  { name: 'Kosara', value: 17.4 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

type StatView = 'population' | 'revenue' | 'land' | 'agriculture' | 'farming' | 'rainfall' | 'demographic' | 'industry';

const DistrictStats = () => {
  const [currentView, setCurrentView] = useState<StatView>('population');

  const StatButton = ({ icon: Icon, label, view }: { icon: any; label: string; view: StatView }) => (
    <Button
      variant={currentView === view ? "default" : "outline"}
      className="flex items-center gap-2 w-full md:w-auto"
      onClick={() => setCurrentView(view)}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Button>
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gov-blue">District Stats</h1>
        <div className="flex gap-4">
          <Select defaultValue="asifabad">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Mandal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asifabad">Asifabad</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Panchayat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatButton icon={Users} label="Population" view="population" />
        <StatButton icon={Building} label="Revenue Village" view="revenue" />
        <StatButton icon={Building} label="Land Records" view="land" />
        <StatButton icon={Tractor} label="Agriculture" view="agriculture" />
        <StatButton icon={Tractor} label="Farming" view="farming" />
        <StatButton icon={Cloud} label="Rainfall" view="rainfall" />
        <StatButton icon={Users2} label="Demographic" view="demographic" />
        <StatButton icon={Factory} label="Industry" view="industry" />
      </div>

      {currentView === 'population' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Population Statistics</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="population" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Female Distribution</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <div className="text-4xl font-bold text-blue-600">10</div>
                <div className="text-sm text-gray-500">Average Growth Rate</div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Male Distribution</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#82ca9d"
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <div className="text-4xl font-bold text-blue-600">67%</div>
                <div className="text-sm text-gray-500">Average Literacy Rate</div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictStats;
