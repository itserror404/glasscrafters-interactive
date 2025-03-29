
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CarouselSection from '@/components/CarouselSection';
import FeaturesSection from '@/components/FeaturesSection';
import TechnicalDetails from '@/components/TechnicalDetails';
import NewsletterAndFooter from '@/components/NewsletterAndFooter';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight - windowHeight;
      const progress = scrollPosition / fullHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Carousel Section */}
      <div id="gallery">
        <CarouselSection />
      </div>
      
      {/* Features Section */}
      <div id="features">
        <FeaturesSection />
      </div>
      
      {/* Technical Details Section */}
      <div id="specs">
        <TechnicalDetails />
      </div>
      
      {/* Newsletter and Footer */}
      <NewsletterAndFooter />
    </main>
  );
};

export default Index;
