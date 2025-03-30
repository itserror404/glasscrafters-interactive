
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const images = [
  "/images/night-sky.jpg",
  "/images/urban-city.jpg",
  "/images/sunset.jpg",
  "/images/5.gif"
];

const imageLabels = [
  "Night Mode - Enhanced clarity in low light environments",
  "Urban Navigation - Seamless city exploration with AR guidance",
  "Outdoor Experiences - Adaptive brightness for any lighting condition",
  "Workspace Integration - Transform any space into your digital office"
];

const FullScreenSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
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

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0 h-full w-full"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={images[currentIndex]}
            alt={`LuminX in ${imageLabels[currentIndex].split(' - ')[0]}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-3xl font-bold text-white mb-4"
            >
              {imageLabels[currentIndex].split(' - ')[0]}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-xl text-white/80"
            >
              {imageLabels[currentIndex].split(' - ')[1]}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 top-1/2 flex justify-between items-center px-4 md:px-10 z-30 transform -translate-y-1/2">
        <Button
          onClick={handlePrevious}
          variant="outline"
          size="icon"
          className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full h-12 w-12"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          onClick={handleNext}
          variant="outline" 
          size="icon"
          className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full h-12 w-12"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-4 md:bottom-8 inset-x-0 flex justify-center space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 w-10 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FullScreenSlider;
