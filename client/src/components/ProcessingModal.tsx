import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Circle, X } from 'lucide-react';

interface ProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

interface ProcessingStep {
  id: string;
  label: string;
  completed: boolean;
}

export default function ProcessingModal({ isOpen, onClose, onAccept }: ProcessingModalProps) {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { id: 'connect', label: 'Connecting to account...', completed: false },
    { id: 'encrypt', label: 'Encrypting item transfer...', completed: false },
    { id: 'finalize', label: 'Finalizing confirmation...', completed: false },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      // Reset when modal closes
      setSteps(steps.map(step => ({ ...step, completed: false })));
      setCurrentStep(0);
      setIsProcessing(true);
      return;
    }

    const timer = setInterval(() => {
      setSteps(prev => {
        const newSteps = [...prev];
        if (currentStep < newSteps.length) {
          newSteps[currentStep].completed = true;
          
          if (currentStep === newSteps.length - 1) {
            setIsProcessing(false);
          } else {
            setCurrentStep(current => current + 1);
          }
        }
        return newSteps;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [isOpen, currentStep]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-processing">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle>Processing your claim</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            data-testid="button-close-processing"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Please keep this tab open.
          </p>
          
          {/* Processing Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="flex items-center gap-3"
                data-testid={`processing-step-${step.id}`}
              >
                {step.completed ? (
                  <CheckCircle className="w-5 h-5 text-success-claim" />
                ) : index === currentStep ? (
                  <div className="w-5 h-5 rounded-full border-2 border-primary animate-spin border-t-transparent" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
                <span className={step.completed ? 'text-foreground' : 'text-muted-foreground'}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              data-testid="button-cancel-processing"
            >
              Cancel
            </Button>
            <Button 
              onClick={onAccept} 
              disabled={isProcessing}
              className="flex-1 bg-success-claim hover:bg-success-claim/90 text-black disabled:opacity-50"
              data-testid="button-accept-processing"
            >
              {isProcessing ? 'Processing...' : 'Accept'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}