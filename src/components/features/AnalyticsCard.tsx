
import React from 'react';
import { LucideIcon } from 'lucide-react';

type AnalyticsCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const AnalyticsCard = ({ icon: Icon, title, description, index }: AnalyticsCardProps) => {
  return (
    <div 
      className="features-animate fade-in glass-card rounded-xl p-6 flex flex-col card-hover"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="icon-container mb-4">
        <Icon size={24} />
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AnalyticsCard;
