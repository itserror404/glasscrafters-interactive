
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FeatureSectionProps {
  title: string;
  description: string;
  image: string;
  isReversed?: boolean;
  bgColor?: string;
}

const FeatureSection = ({ title, description, image, isReversed = false, bgColor = "bg-black" }: FeatureSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  return (
    <section 
      ref={ref}
      className={`min-h-screen flex items-center py-20 ${bgColor}`}
    >
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className={`grid grid-cols-1 ${isReversed ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-[1.2fr_1fr]'} gap-16 items-center`}>
          <motion.div
            className={`text-center md:text-left ${isReversed ? 'md:order-last' : ''}`}
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 50 : -50 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-sf-pro">
              {title}
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-sf-pro">
              {description}
            </p>
          </motion.div>
          
          <motion.div
            className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? -50 : 50 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Immersive Visual Experience",
      description: "4K micro-OLED displays with a 110° field of view provide an unparalleled augmented reality experience that seamlessly blends digital information with your environment.",
      image: "/images/3.gif",
      bgColor: "bg-[#1d1d1f]"
    },
    {
      title: "Intuitive Gesture Control",
      description: "Navigate your digital world with natural hand movements. Our advanced sensors track your gestures with millimeter precision for effortless interaction.",
      image: "/images/2.gif",
      bgColor: "bg-black",
      isReversed: true
    },
    {
      title: "Spatial Awareness",
      description: "LuminX maps your surroundings in real-time, allowing digital objects to interact with physical space. Experience content that adapts to your environment.",
      image: "/images/lumnix2.png",
      bgColor: "bg-[#1d1d1f]"
    },
    {
      title: "All-Day Battery Life",
      description: "Our revolutionary power management system delivers up to 36 hours of use on a single charge, so you can stay connected all day and night.",
      image: "/images/23.jpg",
      bgColor: "bg-black",
      isReversed: true
    }
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-[#1d1d1f] to-black py-20">
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-sf-pro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Revolutionary Features
          </motion.h2>
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto font-sf-pro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            Experience the future of augmented reality with LuminX's cutting-edge technology
          </motion.p>
        </div>
      </section>
      
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          title={feature.title}
          description={feature.description}
          image={feature.image}
          isReversed={feature.isReversed}
          bgColor={feature.bgColor}
        />
      ))}
    </>
  );
};

export default FeaturesSection;
