
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CustomizerDialog from './CustomizerDialog';
import PreOrderDialog from './PreOrderDialog';

const CustomizeCallToAction = () => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#1d1d1f] to-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background bean shapes */}
        <div className="absolute top-1/4 -left-10 w-72 h-32 bg-gradient-to-r from-[#2997ff]/20 to-transparent opacity-40 rounded-[60%_40%_60%_40%/50%_50%_50%_50%] blur-md transform rotate-12"></div>
        <div className="absolute bottom-1/4 -right-10 w-72 h-32 bg-gradient-to-r from-[#5e5ce6]/20 to-transparent opacity-40 rounded-[60%_40%_60%_40%/50%_50%_50%_50%] blur-md transform -rotate-12"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#2997ff] to-[#2997ff]/80">
            Ready to customize your own LuminX experience?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Configure your perfect pair of AR glasses with our immersive customization tool. Choose colors, features, and accessories to match your unique style and needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white py-2 px-4 text-sm font-medium rounded-xl"
              onClick={() => setIsCustomizerOpen(true)}
            >
              Customize Now
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#2997ff] to-[#2997ff]/80 hover:bg-[#2997ff]/90 text-white py-2 px-4 text-sm font-medium rounded-xl"
              onClick={() => setIsPreOrderOpen(true)}
            >
              Pre-order
            </Button>
          </div>
        </motion.div>
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

export default CustomizeCallToAction;
