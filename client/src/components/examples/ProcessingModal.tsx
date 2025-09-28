import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ProcessingModal from '../ProcessingModal';

export default function ProcessingModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Open Processing Modal</Button>
      <ProcessingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAccept={() => {
          console.log('Processing accepted!');
          setIsOpen(false);
        }}
      />
    </div>
  );
}