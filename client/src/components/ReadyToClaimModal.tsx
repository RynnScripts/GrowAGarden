import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, X, ExternalLink } from 'lucide-react';

interface ReadyToClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

export default function ReadyToClaimModal({ isOpen, onClose, redirectUrl }: ReadyToClaimModalProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(10);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Auto redirect when countdown reaches 0
          if (redirectUrl) {
            window.open(redirectUrl, '_blank');
          }
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, redirectUrl, onClose]);

  const handleJoinNow = () => {
    console.log('Redirecting to:', redirectUrl);
    if (redirectUrl) {
      window.open(redirectUrl, '_blank');
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-ready-to-claim">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success-claim" />
            <DialogTitle className="text-success-claim">Ready to Claim</DialogTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            data-testid="button-close-ready"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Instructions */}
          <div className="space-y-2">
            <h3 className="font-semibold">Instructions</h3>
            <p className="text-sm text-muted-foreground">
              Join the private server and find Niva in the spawn area to complete your claim.
            </p>
          </div>
          
          {/* Countdown */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Redirecting in <span className="font-bold text-primary" data-testid="text-countdown">{countdown}</span> seconds...
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              data-testid="button-cancel-ready"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleJoinNow} 
              className="flex-1 bg-destructive hover:bg-destructive/90"
              data-testid="button-join-now"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Join Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}