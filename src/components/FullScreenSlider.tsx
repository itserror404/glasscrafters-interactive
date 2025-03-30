
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const images = [
  "/images/22.jpg",
  "/images/55.jpg", 
  "/images/6.gif",
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
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    const preloadImages = async () => {
      const loadStatuses = Array(images.length).fill(false);
      
      const promises = images.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadStatuses[index] = true;
            setImagesLoaded([...loadStatuses]);
            resolve();
          };
          img.onerror = () => {
            resolve(); // Still resolve on error so the app doesn't hang
          };
        });
      });
      
      await Promise.all(promises);
    };
    
    preloadImages();
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
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

  const nextIndex = (currentIndex + 1) % images.length;
  const prevIndex = (currentIndex - 1 + images.length) % images.length;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="hidden">
        <img src={images[nextIndex]} alt="Preload next" />
        <img src={images[prevIndex]} alt="Preload previous" />
      </div>
      
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 100, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0 h-full w-full"
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div 
            className="absolute inset-0 z-5"
            onContextMenu={preventContextMenu}
          >
            <img
              src={images[currentIndex]}
              alt={`LuminX in ${imageLabels[currentIndex].split(' - ')[0]}`}
              className="h-full w-full object-cover brightness-125 contrast-110 pointer-events-none select-none"
              draggable="false"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-3xl font-bold text-white mb-4"
            >
              {imageLabels[currentIndex].split(' - ')[0]}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base md:text-xl text-white/90"
            >
              {imageLabels[currentIndex].split(' - ')[1]}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrow buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-50 pointer-events-none">
        <Button
          onClick={handlePrevious}
          variant="outline"
          size="icon"
          className="h-16 w-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 shadow-lg pointer-events-auto"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          onClick={handleNext}
          variant="outline" 
          size="icon"
          className="h-16 w-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 shadow-lg pointer-events-auto"
        >
          <ChevronRight className="h-8 w-8" />
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
