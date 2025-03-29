
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, Youtube, Facebook, Github } from 'lucide-react';

const NewsletterAndFooter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive updates about LuminX AR Glasses.",
        className: "bg-black text-white border border-white/10",
      });
      setEmail('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="py-20 px-6 sm:px-8 md:px-12 lg:px-24 bg-gradient-to-b from-black to-[#1d1d1f]">
        <motion.div 
          className="container mx-auto max-w-4xl glass-effect p-12 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white font-sf-pro">Stay Updated</h3>
            <p className="text-lg text-white/70 max-w-xl mx-auto font-sf-pro">
              Subscribe to our newsletter for exclusive updates, early-access opportunities, and AR insights.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-12 focus:ring-[#2997ff] focus:border-[#2997ff]"
              required
            />
            <Button 
              type="submit"
              className="bg-[#2997ff] hover:bg-[#2997ff]/90 text-white h-12 px-8 font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 md:px-12 lg:px-24 bg-[#1d1d1f] text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-12">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3 font-sf-pro">LuminX</h3>
              <p className="text-white/60 max-w-xs font-sf-pro">
                Revolutionizing how we perceive and interact with the world through cutting-edge AR technology.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
              <div>
                <h4 className="text-sm uppercase tracking-wider mb-4 text-white/60 font-sf-pro">Product</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Features</a></li>
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Specifications</a></li>
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Pre-order</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider mb-4 text-white/60 font-sf-pro">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">About Us</a></li>
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Careers</a></li>
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Press</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider mb-4 text-white/60 font-sf-pro">Support</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Contact</a></li>
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">FAQ</a></li>
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Developers</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider mb-4 text-white/60 font-sf-pro">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Privacy</a></li>
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Terms</a></li>
                  <li><a href="#" className="text-white hover:text-[#2997ff] transition-colors font-sf-pro">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/60 mb-4 md:mb-0 font-sf-pro">
              © 2023 LuminX Technologies. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default NewsletterAndFooter;
