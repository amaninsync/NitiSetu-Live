
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
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">{value}</div>
          {change !== 0 && (
            <div className={cn(
              "flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium",
              status === "positive" && "bg-success-500/20 text-success-500",
              status === "negative" && "bg-destructive/20 text-destructive",
              status === "neutral" && "bg-muted text-muted-foreground"
            )}>
              <span className="inline-flex items-center">
                {status === "positive" && <ArrowUp className="mr-0.5 h-3 w-3" />}
                {status === "negative" && <ArrowDown className="mr-0.5 h-3 w-3" />}
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
