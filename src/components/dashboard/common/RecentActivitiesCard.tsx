import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentActivitiesCardProps {
  departmentId: string;
}

const RecentActivitiesCard: React.FC<RecentActivitiesCardProps> = ({ departmentId }) => {
  const activities = departmentId === 'dwo' ? [
    { id: 1, title: "FCR Report Generated", time: "2 hours ago", type: "report" },
    { id: 2, title: "NHTS Survey Data Updated", time: "4 hours ago", type: "update" },
    { id: 3, title: "New AWC Registered - Mancherial", time: "1 day ago", type: "registration" },
    { id: 4, title: "Nutrition Distribution Completed", time: "2 days ago", type: "distribution" },
    { id: 5, title: "Monthly Review Meeting", time: "3 days ago", type: "meeting" }
  ] : [
    { id: 1, title: "Budget approval completed", time: "2 hours ago", type: "finance" },
    { id: 2, title: "New project milestone reached", time: "4 hours ago", type: "project" },
    { id: 3, title: "Staff training session completed", time: "1 day ago", type: "training" },
    { id: 4, title: "Monthly report submitted", time: "2 days ago", type: "report" },
    { id: 5, title: "Department meeting scheduled", time: "3 days ago", type: "meeting" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-start p-3 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activity.type === 'report' ? 'bg-blue-100 text-blue-800' :
                activity.type === 'update' ? 'bg-green-100 text-green-800' :
                activity.type === 'registration' ? 'bg-purple-100 text-purple-800' :
                activity.type === 'distribution' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesCard;