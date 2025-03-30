
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import PreOrderForm from './PreOrderForm';

interface PreOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PreOrderDialog: React.FC<PreOrderDialogProps> = ({ open, onOpenChange }) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-screen overflow-y-auto bg-[#0a0a0a] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Pre-order LuminX</DialogTitle>
          <DialogDescription className="text-white/70">
            Secure your LuminX AR glasses by completing this pre-order form. We'll notify you when your order is ready to ship.
          </DialogDescription>
        </DialogHeader>
        <PreOrderForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default PreOrderDialog;
