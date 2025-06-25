import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  metric: {
    id: string;
    title: string;
    value: string;
    change?: number;
    status?: 'positive' | 'negative';
    icon: React.ElementType;
    description?: string;
  };
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, className = "" }) => (
  <Card className={`hover:shadow-lg transition-all duration-300 ${className}`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <metric.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        </div>
        {metric.change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${
            metric.status === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {metric.status === 'positive' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(metric.change)}%</span>
          </div>
        )}
      </div>
      {metric.description && (
        <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
      )}
    </CardContent>
  </Card>
);

export default MetricCard;