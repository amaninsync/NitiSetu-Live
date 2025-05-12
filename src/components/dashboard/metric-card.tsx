
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { DashboardMetric } from '@/types';

interface MetricCardProps {
  metric: DashboardMetric;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, className }) => {
  const { title, value, change, status, icon: Icon } = metric;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center gap-1">
            <span 
              className={cn(
                "rounded-sm px-1.5 py-0.5 text-xs font-medium",
                status === "positive" && "bg-success-50 text-success-500",
                status === "negative" && "bg-danger-50 text-danger-500",
                status === "neutral" && "bg-secondary text-muted-foreground"
              )}
            >
              <span className="inline-flex items-center">
                {status === "positive" && <ArrowUp className="mr-1 h-3 w-3" />}
                {status === "negative" && <ArrowDown className="mr-1 h-3 w-3" />}
                {Math.abs(change)}%
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
