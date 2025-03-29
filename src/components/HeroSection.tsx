
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import GlassesModelScene from './GlassesModel';
import CustomizerDialog from './CustomizerDialog';

const HeroSection = () => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-24 pb-20 px-6 sm:px-8 md:px-12 lg:px-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1f] via-black to-[#1d1d1f] z-0"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('/images/grid.svg')] bg-repeat z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-sf-pro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                LuminX
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-white/70 mb-10 font-sf-pro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
                Augmented Reality, Perfected for Your Eyes.
              </span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            >
              <Button 
                className="bg-[#2997ff] hover:bg-[#2997ff]/90 text-white py-6 px-8 text-lg font-medium rounded-full"
                style={{ minWidth: "160px" }}
              >
                Pre-order
              </Button>
              <Button 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white py-6 px-8 text-lg font-medium rounded-full"
                style={{ minWidth: "160px" }}
                onClick={() => setIsCustomizerOpen(true)}
              >
                Customize
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="h-[400px] md:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          >
            <GlassesModelScene scrollProgress={0} />
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-white/60 text-sm mb-2 font-sf-pro">Scroll to explore</p>
          <motion.div 
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M12 20L6 14M12 20L18 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Customizer Dialog */}
      <CustomizerDialog open={isCustomizerOpen} onOpenChange={setIsCustomizerOpen} />
    </section>
  );
};

export default HeroSection;
