import { useState } from 'react';
import PetCard from '../PetCard';

export default function PetCardExample() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'trex': 0,
    'raccoon': 0
  });

  const handleQuantityChange = (petId: string, newQuantity: number) => {
    setQuantities(prev => ({ ...prev, [petId]: newQuantity }));
  };

  return (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <PetCard
        pet={{ id: 'trex', name: 'T-Rex', rarity: 'Legendary' }}
        quantity={quantities.trex}
        onQuantityChange={handleQuantityChange}
      />
      <PetCard
        pet={{ id: 'raccoon', name: 'Raccoon' }}
        quantity={quantities.raccoon}
        onQuantityChange={handleQuantityChange}
      />
    </div>
  );
}