
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  shippingAddress: z.string().min(5, { message: 'Shipping address is required' }),
  phoneNumber: z.string().optional(),
  productColor: z.string().default('Black')
});

type PreOrderFormValues = z.infer<typeof formSchema>;

interface PreOrderFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const PreOrderForm: React.FC<PreOrderFormProps> = ({ onSuccess, onCancel }) => {
  const { toast } = useToast();
  const form = useForm<PreOrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      shippingAddress: '',
      phoneNumber: '',
      productColor: 'Black'
    },
  });

  const onSubmit = async (data: PreOrderFormValues) => {
    try {
      // Get current user if logged in
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      // Save pre-order to Supabase
      const { error } = await supabase.from('pre_orders').insert({
        user_id: userId || null,
        email: data.email,
        full_name: data.fullName,
        shipping_address: data.shippingAddress,
        phone_number: data.phoneNumber,
        product_color: data.productColor
      });

      if (error) throw error;

      toast({
        title: "Pre-order submitted!",
        description: "Thank you for your pre-order. We'll notify you when LuminX is ready to ship.",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error submitting pre-order:', error);
      toast({
        title: "Error",
        description: "Failed to submit pre-order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shippingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your shipping address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Complete Pre-order
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PreOrderForm;
