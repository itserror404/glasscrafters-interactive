
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({ title, description, image, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  return (
    <motion.div 
      ref={ref}
      className="min-h-[70vh] flex items-center py-20"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
      }}
    >
      <div className={`container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            visible: { 
              opacity: 1, 
              x: 0, 
              transition: { 
                duration: 0.8, 
                ease: [0.4, 0, 0.2, 1]
              } 
            }
          }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-sf-pro">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-sf-pro">
            {description}
          </p>
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
            visible: { 
              opacity: 1, 
              x: 0, 
              transition: { 
                duration: 0.8, 
                ease: [0.4, 0, 0.2, 1],
                delay: 0.2
              } 
            }
          }}
          className="relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl"
        >
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const features = [
  {
    title: "Immersive Visual Experience",
    description: "4K micro-OLED displays with a 110° field of view provide an unparalleled augmented reality experience that seamlessly blends digital information with your environment.",
    image: "/images/feature-1.jpg"
  },
  {
    title: "Intuitive Gesture Control",
    description: "Navigate your digital world with natural hand movements. Our advanced sensors track your gestures with millimeter precision for effortless interaction.",
    image: "/images/feature-2.jpg"
  },
  {
    title: "Spatial Awareness",
    description: "LuminX maps your surroundings in real-time, allowing digital objects to interact with physical space. Experience content that adapts to your environment.",
    image: "/images/feature-3.jpg"
  },
  {
    title: "All-Day Battery Life",
    description: "Our revolutionary power management system delivers up to 36 hours of use on a single charge, so you can stay connected all day and night.",
    image: "/images/feature-4.jpg"
  }
];

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#1d1d1f] via-black to-[#1d1d1f]">
      <div className="py-20 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-sf-pro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Revolutionary Features
        </motion.h2>
        <motion.p 
          className="text-xl text-white/70 max-w-3xl mx-auto px-6 font-sf-pro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        >
          Experience the future of augmented reality with LuminX's cutting-edge technology
        </motion.p>
      </div>
      
      <div>
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
