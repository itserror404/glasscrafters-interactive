
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import CustomizerDialog from './CustomizerDialog';
import { cn } from '@/lib/utils';

// Background Bean/Aviator Shape Component
function AviatorBeanShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-[60%_40%_60%_40%/50%_50%_50%_50%]", // Bean/aviator-like shape
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-[60%_40%_60%_40%/50%_50%_50%_50%]", // Match the same shape
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

const HeroSection = () => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to rotation values with limited range
  const rotateY = useTransform(mouseX, [-300, 300], [10, -10]);
  const rotateX = useTransform(mouseY, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        // Get container dimensions and position
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate mouse position relative to center of container
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] pt-12 pb-20 px-6 sm:px-8 md:px-12 lg:px-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1f] via-black to-[#1d1d1f] z-0"></div>
      
      {/* Background Shapes */}
      <div className="absolute inset-0 rounded-bean overflow-hidden">
        <AviatorBeanShape
          delay={0.3}
          width={600}
          height={160}
          rotate={12}
          gradient="from-[#2997ff]/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <AviatorBeanShape
          delay={0.5}
          width={500}
          height={140}
          rotate={-15}
          gradient="from-[#5e5ce6]/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <AviatorBeanShape
          delay={0.4}
          width={300}
          height={100}
          rotate={-8}
          gradient="from-[#2997ff]/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <AviatorBeanShape
          delay={0.6}
          width={200}
          height={80}
          rotate={20}
          gradient="from-[#5e5ce6]/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
      </div>
      
      <div className="relative z-10 container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-3 md:mb-4"
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
            className="mb-0" // Reduced spacing here
          >
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#2997ff] via-white/90 to-[#5e5ce6]">
              See Beyond Reality. 
              <br />
              Experience Tomorrow, Today.
            </p>
          </motion.div>
          
          {/* AR Glasses Image - Interactive with cursor and growing animation */}
          <motion.div 
            ref={containerRef}
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="h-[700px] md:h-[850px] flex items-center justify-center mb-0 perspective-1000 cursor-pointer"
          >
            <motion.img 
              src="/images/ar-glasses-vision-pro.png" 
              alt="LuminX AR Glasses" 
              className="object-contain  w-[600px] md:w-[800px] h-[500px] md:h-[700px] "
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              style={{
                rotateY,
                rotateX,
                transition: "all 0.1s ease-out"
              }}
              whileHover={{ scale: 1.05 }}
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
            />
          </motion.div>

          <motion.div 
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 -mt-16"
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
            className="mt-8"
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
