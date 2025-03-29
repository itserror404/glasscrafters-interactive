
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CustomizerDialog from './CustomizerDialog';

const CustomizeCallToAction = () => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

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

export default CustomizeCallToAction;
