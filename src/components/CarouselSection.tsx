
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import GlassesModelScene from './GlassesModel';

const backgrounds = [
  {
    name: "Night Sky",
    image: "url('/images/night-sky.jpg')",
    description: "Experience clarity in the darkest environments"
  },
  {
    name: "Urban City",
    image: "url('/images/urban-city.jpg')",
    description: "Navigate busy streets with augmented information"
  },
  {
    name: "Sunset",
    image: "url('/images/sunset.jpg')",
    description: "Adaptive brightness for any lighting condition"
  },
  {
    name: "Office",
    image: "url('/images/office.jpg')",
    description: "Enhance productivity in your workspace"
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

const CarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const background = backgrounds[currentIndex];
  
  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
  };
  
  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden py-20">
      {/* Background with fade transition */}
      <motion.div 
        key={currentIndex}
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        style={{
          backgroundImage: background.image,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </motion.div>
      
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-sf-pro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {background.name}
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/70 mb-8 font-sf-pro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              {background.description}
            </motion.p>
            
            <motion.div 
              className="flex justify-center md:justify-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            >
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          </div>
          
          <div className="h-[400px] md:h-[500px]">
            <GlassesModelScene scrollProgress={currentIndex / (backgrounds.length - 1)} />
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {backgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
