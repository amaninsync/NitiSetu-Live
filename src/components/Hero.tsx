import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const textElement = textRef.current;
    const imageElement = imageRef.current;

    if (textElement && imageElement) {
      textElement.classList.add('animate-fade-in');
      setTimeout(() => {
        imageElement.classList.add('animate-fade-in-delayed');
      }, 300);
    }
  }, []);

  const scrollToNextSection = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pattern-bg overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/95"></div>
  
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
  
        {/* Left column: text */}
        <div ref={textRef} className="fade-in">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-gov-lightblue text-gov-blue rounded-full mb-4">
            Governance Data Platform
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transforming Asifabad's District Governance through <span className="text-gov-blue">Intelligent Data</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-lg">
            A unified platform empowering government decision-makers with real-time insights and comprehensive analytics.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/product')}
              className="button-primary"
            >
              Explore Platform
            </button>
            {/*
            <button 
              onClick={() => navigate('/auth/LoginPage')}
              className="button-secondary"
            >
              Log In
            </button>
            */}
          </div>
        </div>
  
        {/* Right column: image & dashboard card */}
        <div ref={imageRef} className="fade-in">
          <div className="relative">
            {/* Floating shapes */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gov-blue/10 rounded-lg animate-float"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gov-green/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            
            {/* Hero image with glass card styling */}
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/hero.png" 
                alt="District Dashboard" 
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
  
      {/* Scroll chevron */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToNextSection}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="text-gov-blue" />
        </button>
      </div>
    </div>
  </section>
  );
};

export default Hero;
