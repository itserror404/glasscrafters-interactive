
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import CountdownTimer from '@/components/CountdownTimer';
import NewsletterSignup from '@/components/NewsletterSignup';
import GlassesModelScene from '@/components/GlassesModel';
import FeaturePanel from '@/components/FeaturePanel';
import CustomizerDialog from '@/components/CustomizerDialog';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Smartphone, 
  Wifi, 
  Battery, 
  Compass, 
  Lightbulb,
  Zap,
  Headphones
} from 'lucide-react';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollPosition = window.scrollY;
        const totalHeight = mainRef.current.scrollHeight - window.innerHeight;
        const calculatedProgress = Math.min(scrollPosition / totalHeight, 1);
        setScrollProgress(calculatedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main ref={mainRef} className="relative">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative px-4 py-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-glasscraft-dark via-gray-900 to-black z-0" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
                The Future Is Clear
              </h1>
              <p className="text-lg md:text-xl mb-6 text-white/80">
                Experience reality enhanced with GlassCrafters AR glasses. 
                See digital information seamlessly integrated into your world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  className="bg-glasscraft-blue hover:bg-glasscraft-blue/80 text-white"
                  size="lg"
                >
                  Pre-order Now
                </Button>
                <Button 
                  className="bg-transparent border border-glasscraft-purple hover:bg-glasscraft-purple/20 text-white"
                  size="lg"
                  onClick={() => setIsCustomizerOpen(true)}
                >
                  Customize
                </Button>
              </div>
            </div>
            
            {/* 3D Glasses Model */}
            <div className="h-[300px] md:h-[400px] w-full">
              <GlassesModelScene scrollProgress={scrollProgress} />
            </div>
          </div>
          
          {/* Countdown Timer */}
          <div className="mt-12">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-glasscraft-dark z-0" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
              Revolutionary Features
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Our AR glasses combine cutting-edge technology with stylish design to 
              bring you an unparalleled augmented reality experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturePanel 
              title="Enhanced Vision" 
              icon={<Eye size={24} />}
              description="Our advanced display technology offers crystal clear visuals with 4K resolution per eye, providing a seamless AR experience that blends with the real world."
            />
            <FeaturePanel 
              title="Smartphone Integration" 
              icon={<Smartphone size={24} />}
              description="Pair with your smartphone for notifications, calls, and app functionality. Control your digital life without taking your phone out of your pocket."
            />
            <FeaturePanel 
              title="Wireless Connectivity" 
              icon={<Wifi size={24} />}
              description="Stay connected with WiFi 6E and Bluetooth 5.2 for ultra-fast, reliable connections to all your devices and cloud services."
            />
            <FeaturePanel 
              title="All-Day Battery" 
              icon={<Battery size={24} />}
              description="Our revolutionary battery technology provides up to 8 hours of continuous use, with quick-charge capability that gives you 2 hours of use from just 20 minutes of charging."
            />
            <FeaturePanel 
              title="Spatial Awareness" 
              icon={<Compass size={24} />}
              description="Advanced sensors map your environment in real-time, enabling precise AR overlays and interaction with virtual objects in physical space."
            />
            <FeaturePanel 
              title="Adaptive Brightness" 
              icon={<Lightbulb size={24} />}
              description="Lenses automatically adjust to ambient lighting conditions, ensuring optimal visibility whether you're indoors or in bright sunlight."
            />
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-glasscraft-dark to-black z-0" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
                Technical Specifications
              </h2>
              <div className="space-y-6">
                <div className="glass-effect p-4">
                  <h3 className="text-xl font-semibold mb-2 text-glasscraft-blue">Display</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center">
                      <Zap size={16} className="mr-2 text-glasscraft-purple" />
                      4K Micro-OLED per eye (3840 x 2160)
                    </li>
                    <li className="flex items-center">
                      <Zap size={16} className="mr-2 text-glasscraft-purple" />
                      120Hz refresh rate
                    </li>
                    <li className="flex items-center">
                      <Zap size={16} className="mr-2 text-glasscraft-purple" />
                      1000 nits brightness
                    </li>
                    <li className="flex items-center">
                      <Zap size={16} className="mr-2 text-glasscraft-purple" />
                      110° field of view
                    </li>
                  </ul>
                </div>
                
                <div className="glass-effect p-4">
                  <h3 className="text-xl font-semibold mb-2 text-glasscraft-blue">Hardware</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center">
                      <Zap size={16} className="mr-2 text-glasscraft-purple" />
                      GlassCrafters XR1 Processor
                    </li>
                    <li className="flex items-center">
                      <Zap size={16} className="mr-2 text-glasscraft-purple" />
                      8GB LPDDR5 RAM
                    </li>
                    <li className="flex items-center">
                      <Zap size={16} className="mr-2 text-glasscraft-purple" />
                      128GB UFS 3.1 storage
                    </li>
                    <li className="flex items-center">
                      <Zap size={16} className="mr-2 text-glasscraft-purple" />
                      Weight: 78g
                    </li>
                  </ul>
                </div>
                
                <div className="glass-effect p-4">
                  <h3 className="text-xl font-semibold mb-2 text-glasscraft-blue">Audio</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center">
                      <Headphones size={16} className="mr-2 text-glasscraft-purple" />
                      Spatial audio with dynamic head tracking
                    </li>
                    <li className="flex items-center">
                      <Headphones size={16} className="mr-2 text-glasscraft-purple" />
                      Dual beam-forming microphones
                    </li>
                    <li className="flex items-center">
                      <Headphones size={16} className="mr-2 text-glasscraft-purple" />
                      Active noise cancellation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Second Column - 3D Model */}
            <div className="h-[400px] md:h-[500px] w-full">
              <GlassesModelScene scrollProgress={scrollProgress + 0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Customize Section */}
      <section id="customize" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-glasscraft-dark z-0" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
              Make It Yours
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Customize your AR glasses to match your style and needs.
              Choose from a variety of frame colors, lens options, and smart features.
            </p>
          </div>
          
          <div className="glass-effect p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Design Your Perfect Pair
              </h3>
              <p className="text-white/70 mb-4">
                Our 3D customizer lets you visualize your unique configuration before ordering.
              </p>
              <Button 
                onClick={() => setIsCustomizerOpen(true)}
                className="bg-glasscraft-purple hover:bg-glasscraft-purple/80 text-white"
              >
                Open 3D Customizer
              </Button>
            </div>
            
            <div className="h-[200px] w-full md:w-[300px]">
              <GlassesModelScene scrollProgress={0.8} />
            </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="mt-16">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold gradient-text">GlassCrafters</h3>
              <p className="text-white/60 mt-2">The future of augmented reality</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">Connect</h4>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Company</h4>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Support</h4>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              © 2023 GlassCrafters. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Customizer Dialog */}
      <CustomizerDialog 
        open={isCustomizerOpen} 
        onOpenChange={setIsCustomizerOpen} 
      />
    </main>
  );
};

export default Index;
