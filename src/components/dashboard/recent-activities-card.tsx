
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentActivitiesCardProps {
  departmentId: string;
}

interface ActivityItem {
  id: string;
  title: string;
  time: string;
}

const RecentActivitiesCard: React.FC<RecentActivitiesCardProps> = ({ departmentId }) => {
  // Sample activity data based on department
  // In a real app, this would come from an API
  const getActivities = (depId: string): ActivityItem[] => {
    const commonActivities = [
      {
        id: '1',
        title: 'Monthly progress report submitted',
        time: '2 hours ago'
      },
      {
        id: '2',
        title: 'Q3 budget allocation approved',
        time: '5 hours ago'
      }
    ];
    
    const specificActivities = {
      'health': [
        {
          id: '3',
          title: 'New vaccination drive scheduled',
          time: 'Yesterday'
        },
        {
          id: '4',
          title: 'Medical camp reports uploaded',
          time: '2 days ago'
        }
      ],
      'education': [
        {
          id: '3',
          title: 'Teacher training program launched',
          time: 'Yesterday'
        },
        {
          id: '4',
          title: 'School inspection reports reviewed',
          time: '2 days ago'
        }
      ],
      'rural': [
        {
          id: '3',
          title: 'Rural road project milestone achieved',
          time: 'Yesterday'
        },
        {
          id: '4',
          title: 'SHG meeting minutes uploaded',
          time: '2 days ago'
        }
      ],
      'urban': [
        {
          id: '3',
          title: 'Urban planning committee meeting',
          time: 'Yesterday'
        },
        {
          id: '4',
          title: 'City infrastructure plan updated',
          time: '2 days ago'
        }
      ],
      'agriculture': [
        {
          id: '3',
          title: 'Crop monitoring data updated',
          time: 'Yesterday'
        },
        {
          id: '4',
          title: 'Farmer subsidy status reviewed',
          time: '2 days ago'
        }
      ]
    };
    
    return [...commonActivities, ...(specificActivities[depId as keyof typeof specificActivities] || [])];
  };
  
  const activities = getActivities(departmentId);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-lg">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-6">
          {activities.map((activity) => (
            <ActivityItem 
              key={activity.id}
              title={activity.title}
              time={activity.time}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityItemProps {
  title: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, time }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1.5 rounded-full bg-sequence-teal-500/20 p-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-sequence-teal-500"></div>
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
};

export default RecentActivitiesCard;
