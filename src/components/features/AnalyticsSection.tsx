
import React from 'react';
import { BarChart3, LineChart, Lightbulb } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

const AnalyticsSection = () => {
  const analyticsCapabilities = [
    { 
      icon: BarChart3, 
      title: 'Descriptive Analytics', 
      description: 'Understand what happened and why through comprehensive visualizations and reports.' 
    },
    { 
      icon: LineChart, 
      title: 'Predictive Insights', 
      description: 'Anticipate future trends and outcomes using historical patterns and machine learning.' 
    },
    { 
      icon: Lightbulb, 
      title: 'Prescriptive Recommendations', 
      description: 'Get actionable strategies and insights to optimize decision-making processes.' 
    }
  ];

  return (
    <div className="mb-20">
      <h3 className="text-2xl font-semibold text-center mb-12 features-animate fade-in">
        Advanced Analytics at Your Fingertips
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {analyticsCapabilities.map((capability, index) => (
          <AnalyticsCard 
            key={index}
            icon={capability.icon}
            title={capability.title}
            description={capability.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default AnalyticsSection;
