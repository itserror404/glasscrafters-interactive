
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import CustomizerDialog from './CustomizerDialog';
import PreOrderDialog from './PreOrderDialog';
import { WavyBackground } from './ui/wavy-background';

const HeroSection = () => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] pt-24 pb-16 px-6 sm:px-8 md:px-12 lg:px-24">
      <WavyBackground
        colors={["#2997ff", "#5e5ce6", "#2563eb", "#22d3ee", "#1e40af"]}
        waveWidth={40}
        backgroundFill="transparent"
        blur={5}
        speed="slow"
        waveOpacity={0.3}
        containerClassName="absolute inset-0 z-0"
      />
      
      <div className="relative z-10 container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-4"
          >
            <h1 className="text-2xl font-bold text-white/80">LuminX</h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-0" 
          >
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#2997ff] via-white/90 to-[#5e5ce6]">
              See Beyond Reality. 
              <br />
              Experience Tomorrow, Today.
            </p>
          </motion.div>
          
          <motion.div 
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="h-[500px] md:h-[600px] flex items-center justify-center -mt-16 mb-16"
          >
            <motion.img 
              src="/images/ar-glasses-vision-pro.png" 
              alt="LuminX AR Glasses" 
              className="object-contain w-[900px] md:w-[1500px] h-[700px] md:h-[900px] relative z-10"
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
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <CountdownTimer />
          </motion.div>

          <motion.div 
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
          >
            <Button 
              className="bg-gradient-to-r from-[#2997ff] to-[#2997ff]/80 hover:bg-[#2997ff]/90 text-white py-2 px-4 text-sm font-medium rounded-xl shadow-lg hover:shadow-[#2997ff]/20 hover:shadow-xl transition-all duration-300"
              onClick={() => setIsPreOrderOpen(true)}
            >
              Pre-order
            </Button>
            <Button 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white py-2 px-4 text-sm font-medium rounded-xl shadow-lg hover:shadow-white/10 hover:shadow-xl transition-all duration-300"
              onClick={() => setIsCustomizerOpen(true)}
            >
              Customize
            </Button>
          </motion.div>
          
          
        </div>
      </div>
      
      <CustomizerDialog 
        open={isCustomizerOpen} 
        onOpenChange={setIsCustomizerOpen} 
      />

      <PreOrderDialog
        open={isPreOrderOpen}
        onOpenChange={setIsPreOrderOpen}
      />
    </section>
  );
};

export default HeroSection;
