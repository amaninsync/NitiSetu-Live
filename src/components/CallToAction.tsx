
import React, { useEffect } from 'react';

const CallToAction = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.cta-animate');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="contact" className="py-20 px-6 bg-gov-blue text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 cta-animate fade-in">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full mb-4">
            Call to Collaboration
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Whether you're a government entity looking to transform your data processes, or a technology partner seeking to contribute to better governance, we welcome your collaboration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="cta-animate fade-in glass-card-dark rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Ready to Explore?</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white/90 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/90 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-white/90 mb-2">Organization</label>
                <input 
                  type="text" 
                  id="organization" 
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Your organization"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white/90 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-white text-gov-blue font-medium rounded-md hover:bg-white/90 transition-all duration-300 shadow-md"
              >
                Submit Request
              </button>
            </form>
          </div>
          
          <div className="cta-animate fade-in">
            <div className="glass-card-dark rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-6">Our Partners</h3>
              <p className="text-white/80 mb-6">
                We collaborate with government entities, technology firms, and social impact organizations to create lasting change.
              </p>
            </div>
            
            <div className="glass-card-dark rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-white/80">
                <p>Email: namaste@themetropolitaninstitute.com</p>
                <p>Offices: Nagpur | Pune | Bengaluru | Mumbai IN </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center cta-animate fade-in">
          <p className="text-xl font-medium mb-4">Simplifying Complexity, Empowering Governance</p>
          <div className="inline-flex space-x-4">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#users" className="text-white/80 hover:text-white transition-colors">Who We Serve</a>
            <a href="#technology" className="text-white/80 hover:text-white transition-colors">Technology</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
