
import React, { useRef } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import DataCollectionSection from './features/DataCollectionSection';
import AnalyticsSection from './features/AnalyticsSection';
import DashboardSection from './features/DashboardSection';

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useAnimateOnScroll();

  return (
    <section id="features" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 features-animate fade-in">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-gov-lightblue text-gov-blue rounded-full mb-4">
            Platform Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            A Complete Data Ecosystem for District Governance
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Simplify complex government data processes and empower data-driven decision-making with our modern technology.
          </p>
        </div>
        
        <DataCollectionSection />
        <AnalyticsSection />
        <DashboardSection />
      </div>
    </section>
  );
};

export default Features;
