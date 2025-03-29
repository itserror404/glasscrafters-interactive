
import React from 'react';
import { motion } from 'framer-motion';
import FullScreenSlider from './FullScreenSlider';

const CarouselSection = () => {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-sf-pro">
            Experience LuminX in Every Environment
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-sf-pro">
            Swipe through different environments and see how LuminX seamlessly adapts to any scenario
          </p>
        </motion.div>
      </div>
      
      <FullScreenSlider />
    </section>
  );
};

export default CarouselSection;
