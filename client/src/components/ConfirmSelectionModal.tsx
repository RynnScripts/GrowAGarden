import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface SelectedPet {
  id: string;
  name: string;
  quantity: number;
}

interface ConfirmSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedPets: SelectedPet[];
  username: string;
}

export default function ConfirmSelectionModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedPets, 
  username 
}: ConfirmSelectionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-confirm-selection">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle>Confirm Selection</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            data-testid="button-close-modal"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Selected Pets */}
          <div className="space-y-2">
            {selectedPets.map((pet) => (
              <div 
                key={pet.id} 
                className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                data-testid={`selected-pet-${pet.id}`}
              >
                <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                  🐾
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{pet.name}</p>
                  <p className="text-sm text-muted-foreground">x{pet.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Username */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Roblox Username</p>
            <p className="font-semibold text-lg" data-testid="text-confirm-username">
              @{username}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              data-testid="button-cancel-confirm"
            >
              Cancel
            </Button>
            <Button 
              onClick={onConfirm} 
              className="flex-1 bg-destructive hover:bg-destructive/90"
              data-testid="button-confirm-selection"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}