import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ConfirmSelectionModal from '../ConfirmSelectionModal';

export default function ConfirmSelectionModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const selectedPets = [
    { id: 'raccoon', name: 'Raccoon', quantity: 5 }
  ];

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Open Confirm Modal</Button>
      <ConfirmSelectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log('Selection confirmed!');
          setIsOpen(false);
        }}
        selectedPets={selectedPets}
        username="Astragenz"
      />
    </div>
  );
}