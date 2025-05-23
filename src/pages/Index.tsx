
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import UsersSection from '../components/UsersSection';
import TechnologySection from '../components/TechnologySection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  const { isAuthenticated } = useAuth(); // Added auth context

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAuthenticated) { // Added redirect logic
    return <Navigate to="/district-dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UsersSection />
        <TechnologySection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
