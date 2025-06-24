
import React, { useEffect, useRef } from 'react';
import { Users, BarChart, UserCircle, Building } from 'lucide-react';

const UsersSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.users-animate');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const userCategories = [
    {
      icon: Users,
      title: 'District Collectors',
      description: 'Comprehensive oversight and strategic decision-making tools for effective governance.',
      features: ['Multi-department oversight', 'Strategic planning tools', 'Comprehensive dashboards']
    },
    {
      icon: BarChart,
      title: 'Department Heads',
      description: 'Granular insights and performance tracking to optimize departmental operations.',
      features: ['Department-specific metrics', 'Resource allocation insights', 'Performance analytics']
    },
    {
      icon: UserCircle,
      title: 'Government Employees',
      description: 'Streamlined data collection and reporting tools for enhanced productivity.',
      features: ['Simplified data entry', 'Automated report generation', 'Task management']
    },
    {
      icon: Building,
      title: 'State Administrators',
      description: 'Holistic view of district-level performance and potential for state-wide planning.',
      features: ['Cross-district comparisons', 'Policy impact analytics', 'Resource optimization']
    }
  ];

  return (
    <section id="users" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16 users-animate fade-in">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-gov-lightblue text-gov-blue rounded-full mb-4">
            Who We Serve
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Empowering Government Decision-Makers at Every Level
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our platform is designed to meet the unique needs of various stakeholders in the district governance ecosystem.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {userCategories.map((category, index) => (
            <div 
              key={index}
              className="users-animate fade-in bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="icon-container mb-6">
                  <category.icon size={24} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="space-y-3">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-gov-blue mr-3"></span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto p-4 bg-gov-lightblue">
                <a href="#contact" className="text-gov-blue font-medium hover:underline">Learn more</a>
              </div>
            </div>
          ))}
        </div>
        
        {/*<div className="mt-20 users-animate fade-in">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-gov-lightblue text-gov-blue rounded-full mb-4">
                  Testimonial
                </span>
                <blockquote className="text-xl italic text-gray-700 mb-6">
                  "This platform has revolutionized how we collect, analyze, and utilize district-level data. It's not just a tool, it's a governance transformation engine."
                </blockquote>
                <div>
                  <p className="font-semibold">District Collector</p>
                  <p className="text-gray-500">Rajasthan, India</p>
                </div>
              </div>
              <div className="bg-gov-blue p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-white mb-6">Impact Philosophy</h3>
                <p className="text-white/90 mb-6">Transforming raw data into meaningful governance</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                    <span>Reduce administrative complexity</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                    <span>Enhance decision-making speed</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                    <span>Promote data-driven governance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default UsersSection;
