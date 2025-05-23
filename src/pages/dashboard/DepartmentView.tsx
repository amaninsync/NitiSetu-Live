
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const departmentPerformance = [
  {
    name: 'Health',
    budget: 450,
    spent: 392,
    projects: 12,
    completed: 8,
    inProgress: 4
  },
  {
    name: 'Education',
    budget: 380,
    spent: 342,
    projects: 15,
    completed: 10,
    inProgress: 5
  },
  {
    name: 'Agriculture',
    budget: 300,
    spent: 235,
    projects: 9,
    completed: 5,
    inProgress: 4
  },
  {
    name: 'Public Works',
    budget: 520,
    spent: 470,
    projects: 18,
    completed: 12,
    inProgress: 6
  },
  {
    name: 'Social Welfare',
    budget: 290,
    spent: 265,
    projects: 11,
    completed: 9,
    inProgress: 2
  }
];

const staff = [
  { name: "Dr. Anand Kumar", position: "Health Director", email: "anand.kumar@example.gov", phone: "+91 98765 43210" },
  { name: "Priya Singh", position: "Education Secretary", email: "priya.singh@example.gov", phone: "+91 87654 32109" },
  { name: "Vikram Mehta", position: "Agriculture Director", email: "vikram.mehta@example.gov", phone: "+91 76543 21098" },
  { name: "Ravi Verma", position: "PWD Engineer", email: "ravi.verma@example.gov", phone: "+91 65432 10987" },
  { name: "Meera Patel", position: "Social Welfare Officer", email: "meera.patel@example.gov", phone: "+91 54321 09876" }
];

const DepartmentView = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Department Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1940L</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1704L (88%)</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Budget Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={departmentPerformance}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}L`} />
                <Legend />
                <Bar dataKey="budget" name="Budget Allocated" fill="#8884d8" />
                <Bar dataKey="spent" name="Budget Spent" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentPerformance.map((dept, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.projects} (Completed: {dept.completed})</TableCell>
                  <TableCell>₹{dept.budget}L</TableCell>
                  <TableCell>₹{dept.spent}L</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.round((dept.spent / dept.budget) * 100)} className="w-[80px]" />
                      <span>{Math.round((dept.spent / dept.budget) * 100)}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Department Officials</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((person, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>{person.position}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentView;
