
import React, { useEffect } from 'react';
import { 
  Server, 
  Shield, 
  Users, 
  Globe, 
  Key
} from 'lucide-react';

const TechnologySection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.tech-animate');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const techFeatures = [
    {
      icon: Server,
      title: 'Multi-Tenant Architecture',
      description: 'Secure isolation of data with shared infrastructure for cost-effectiveness.'
    },
    {
      icon: Key,
      title: 'Granular Access Controls',
      description: 'Role-based permissions ensuring data is accessed only by authorized personnel.'
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'End-to-end encryption and compliance with government security standards.'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Interface available in multiple regional languages for broader accessibility.'
    },
    {
      icon: Users,
      title: 'Collaboration Tools',
      description: 'Built-in features for cross-department coordination and information sharing.'
    }
  ];

  return (
    <section id="technology" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 tech-animate fade-in">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-gov-lightblue text-gov-blue rounded-full mb-4">
            Technology & Security
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Robust, Secure, Scalable
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Built with government-grade security and scalability to handle the complex requirements of district administration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {techFeatures.map((feature, index) => (
            <div 
              key={index}
              className="tech-animate fade-in bg-white rounded-xl shadow-md p-6 flex flex-col card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="icon-container mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/*<div className="tech-animate fade-in">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-8 text-center">Technical Architecture</h3>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center mb-8 md:mb-0">
                  <div className="w-24 h-24 rounded-full bg-gov-lightblue flex items-center justify-center mx-auto mb-4">
                    <span className="text-gov-blue font-semibold">Frontend</span>
                  </div>
                  <p className="text-gray-700">React.js / Next.js</p>
                  <p className="text-gray-500 text-sm">Modern & Responsive</p>
                </div>
                
                <div className="hidden md:block">
                  <svg width="100" height="20">
                    <line x1="0" y1="10" x2="100" y2="10" stroke="#1A5F7A" strokeWidth="2" strokeDasharray="5,5" />
                    <polygon points="95,5 100,10 95,15" fill="#1A5F7A" />
                  </svg>
                </div>
                
                <div className="text-center mb-8 md:mb-0">
                  <div className="w-24 h-24 rounded-full bg-gov-lightblue flex items-center justify-center mx-auto mb-4">
                    <span className="text-gov-blue font-semibold">API Layer</span>
                  </div>
                  <p className="text-gray-700">REST / GraphQL</p>
                  <p className="text-gray-500 text-sm">Secure & Efficient</p>
                </div>
                
                <div className="hidden md:block">
                  <svg width="100" height="20">
                    <line x1="0" y1="10" x2="100" y2="10" stroke="#1A5F7A" strokeWidth="2" strokeDasharray="5,5" />
                    <polygon points="95,5 100,10 95,15" fill="#1A5F7A" />
                  </svg>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gov-lightblue flex items-center justify-center mx-auto mb-4">
                    <span className="text-gov-blue font-semibold">Backend</span>
                  </div>
                  <p className="text-gray-700">Node.js / Python</p>
                  <p className="text-gray-500 text-sm">Scalable & Robust</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default TechnologySection;
