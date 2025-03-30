import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Cpu, 
  Battery, 
  Weight, 
  Speaker, 
  Wifi, 
  Globe, 
  Watch,
  Image
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const SpecCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  className = "" 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  description: string;
  className?: string;
}) => {
  return (
    <motion.div 
      className={`glass-effect p-6 relative overflow-hidden ${className}`}
      variants={item}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-white font-sf-pro">{title}</h3>
        <div className="text-[#2997ff]">
          {icon}
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white mt-2 mb-2 font-sf-pro">{value}</div>
      <p className="text-sm text-white/70 font-sf-pro">{description}</p>
      
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#2997ff]/5 rounded-full blur-xl"></div>
    </motion.div>
  );
};

const ImageCard = ({ 
  src, 
  alt,
  className = "" 
}: { 
  src: string; 
  alt: string;
  className?: string;
}) => {
  return (
    <motion.div 
      className={`glass-effect relative overflow-hidden ${className}`}
      variants={item}
    >
      <div className="aspect-square w-full relative">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-2 text-white/90">
          <Image size={16} className="text-[#2997ff]" />
          <span className="text-sm font-medium">{alt}</span>
        </div>
      </div>
      
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#2997ff]/5 rounded-full blur-xl"></div>
    </motion.div>
  );
};

const TechnicalDetails = () => {
  return (
    <section className="py-20 px-6 sm:px-8 md:px-12 lg:px-24 bg-black">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-sf-pro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Technical Specifications
        </motion.h2>
        <motion.p 
          className="text-xl text-white/70 max-w-3xl mx-auto font-sf-pro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        >
          Engineered for excellence, designed for the future
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <SpecCard 
          title="Display" 
          value="4K Micro-OLED"
          icon={<Eye size={24} />}
          description="3840 x 2160 resolution per eye with 120Hz refresh rate and 1000 nits brightness"
          className="md:col-span-2"
        />
        
        <SpecCard 
          title="Processor" 
          value="LuminX XR1"
          icon={<Cpu size={24} />}
          description="Custom-designed neural engine with 12 TOPS of AI performance"
        />
        
        <SpecCard 
          title="Battery Life" 
          value="36 hours"
          icon={<Battery size={24} />}
          description="All-day use with quick charging: 2 hours of use from just 15 minutes of charge"
        />
        
        <SpecCard 
          title="Weight" 
          value="12g"
          icon={<Weight size={24} />}
          description="Ultra-lightweight design for comfortable all-day wear"
          className="md:col-span-2"
        />
        
        <SpecCard 
          title="Audio" 
          value="Spatial Audio"
          icon={<Speaker size={24} />}
          description="Dynamic head tracking with active noise cancellation and beam-forming microphones"
        />
        
        <SpecCard 
          title="Connectivity" 
          value="Wi-Fi 6E & BT 5.3"
          icon={<Wifi size={24} />}
          description="Ultra-fast, reliable connections to all your devices and cloud services"
        />
        
        <SpecCard 
          title="Field of View" 
          value="110°"
          icon={<Globe size={24} />}
          description="Expansive viewing area for an immersive augmented reality experience"
        />
        
        <SpecCard 
          title="Response Time" 
          value="&lt;5ms"
          icon={<Watch size={24} />}
          description="Near-zero latency for seamless real-time interactions"
        />
        
        <ImageCard 
          src="/images/21.jpg" 
          alt="Immersive Experience"
          className="aspect-square"
        />
        
        <ImageCard 
          src="/images/25.jpg" 
          alt="Spatial Mapping"
          className="aspect-square"
        />
      </motion.div>
    </section>
  );
};

export default TechnicalDetails;
