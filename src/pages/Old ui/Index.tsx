import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import UsersSection from '../components/UsersSection';
import TechnologySection from '../components/TechnologySection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import LoginPage from './auth/LoginPage';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
