
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel';
import { Button } from '@/components/ui/button';
import CustomizerDialog from './CustomizerDialog';

const CarouselSection = () => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden py-20 bg-gradient-to-b from-[#1d1d1f] via-black to-[#1d1d1f]">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-sf-pro">
            Experience LuminX in Every Environment
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-sf-pro">
            Swipe through different environments and see how LuminX seamlessly adapts to any scenario
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <ThreeDPhotoCarousel />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl text-white/90 mb-6 font-medium font-sf-pro">
            Ready to customize your own LuminX experience?
          </h3>
          <Button 
            className="bg-[#2997ff] hover:bg-[#2997ff]/90 text-white py-6 px-10 text-lg font-medium rounded-full"
            onClick={() => setIsCustomizerOpen(true)}
          >
            Customize Now
          </Button>
        </motion.div>
      </div>

      <CustomizerDialog 
        open={isCustomizerOpen}
        onOpenChange={setIsCustomizerOpen}
      />
    </section>
  );
};

export default CarouselSection;
