
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        controls.start({
          backgroundColor: "rgba(29, 29, 31, 0.8)",
          backdropFilter: "blur(12px)",
          height: "70px",
        });
      } else {
        setIsScrolled(false);
        controls.start({
          backgroundColor: "rgba(29, 29, 31, 0)",
          backdropFilter: "blur(0px)",
          height: "90px",
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex items-center"
      initial={{ 
        backgroundColor: "rgba(29, 29, 31, 0)", 
        backdropFilter: "blur(0px)",
        height: "90px"
      }}
      animate={controls}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="text-xl font-bold text-white font-sf-pro">LuminX</h1>
          </motion.div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="flex space-x-6 mr-8"
          >
            <a href="#features" className="text-white/80 hover:text-white transition-colors font-sf-pro">Features</a>
            <a href="#specs" className="text-white/80 hover:text-white transition-colors font-sf-pro">Specifications</a>
            <a href="#gallery" className="text-white/80 hover:text-white transition-colors font-sf-pro">Gallery</a>
          </motion.nav>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          >
            <CountdownTimer />
          </motion.div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="absolute top-full left-0 right-0 bg-[#1d1d1f]/95 backdrop-blur-lg md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
            <a 
              href="#features" 
              className="text-white/80 hover:text-white transition-colors text-lg font-sf-pro py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#specs" 
              className="text-white/80 hover:text-white transition-colors text-lg font-sf-pro py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Specifications
            </a>
            <a 
              href="#gallery" 
              className="text-white/80 hover:text-white transition-colors text-lg font-sf-pro py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </a>
            
            {/* Mobile Countdown */}
            <div className="pt-4">
              <CountdownTimer />
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
