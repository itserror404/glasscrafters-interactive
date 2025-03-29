
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Please enter a valid email",
        description: "We need your email to keep you updated.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "You're now on the list for exclusive updates.",
        className: "bg-glasscraft-blue text-white",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full glass-effect p-6 md:p-8">
      <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Stay Updated</h3>
      <p className="text-white/70 mb-4 text-sm md:text-base">
        Subscribe to our newsletter for exclusive updates and early access offers.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          required
        />
        <Button 
          type="submit"
          className="bg-glasscraft-purple hover:bg-glasscraft-purple/80 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
