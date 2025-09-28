import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ReadyToClaimModal from '../ReadyToClaimModal';

export default function ReadyToClaimModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Open Ready to Claim Modal</Button>
      <ReadyToClaimModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        redirectUrl="https://example.com/roblox-server"
      />
    </div>
  );
}