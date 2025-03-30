
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import CustomizerDialog from './CustomizerDialog';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] pt-6 pb-16 px-6 sm:px-8 md:px-12 lg:px-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1f] via-black to-[#1d1d1f] z-0"></div>
      
      <div className="relative z-10 container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6"
          >
            <Circle className="h-2 w-2 fill-[#2997ff]/80" />
            <span className="text-sm text-white/60 tracking-wide">
              LuminX
            </span>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8" 
          >
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#2997ff] via-white/90 to-[#5e5ce6]">
              See Beyond Reality. 
              <br />
              Experience Tomorrow, Today.
            </p>
          </motion.div>
          
          {/* AR Glasses Image - No cursor interaction */}
          <motion.div 
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="h-[500px] md:h-[600px] flex items-center justify-center -mt-2 mb-0 perspective-1000"
          >
            <motion.img 
              src="/images/ar-glasses-vision-pro.png" 
              alt="LuminX AR Glasses" 
              className="object-contain w-[700px] md:w-[900px] h-[500px] md:h-[600px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
              }}
            />
          </motion.div>

          <motion.div 
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 -mt-14"
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
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-4"
          >
            <CountdownTimer />
          </motion.div>
        </div>
      </div>
      
      <CustomizerDialog 
        open={isCustomizerOpen} 
        onOpenChange={setIsCustomizerOpen} 
      />
    </section>
  );
};

export default HeroSection;
