
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-sf-pro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                LuminX
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl lg:text-4xl text-white/70 mb-10 font-sf-pro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
                See Beyond Reality. Experience Tomorrow, Today.
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
            
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            >
              <CountdownTimer />
            </motion.div>
          </div>
          
          <motion.div 
            className="h-[400px] md:h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          >
            <img 
              src="/images/ar-glasses.png" 
              alt="LuminX AR Glasses" 
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Customizer Dialog */}
      <CustomizerDialog open={isCustomizerOpen} onOpenChange={setIsCustomizerOpen} />
    </section>
  );
};

export default HeroSection;
