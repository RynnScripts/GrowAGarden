import { useState } from 'react';
import PetCard from './PetCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import trexImg from '@/assets/trex.png';
import raccoonImg from '@/assets/raccoon.png';
import fennecImg from '@/assets/fennec.png';
import kitsuneImg from '@/assets/kitsune.png';
import redDragonImg from '@/assets/red-dragon.png';
import mimicImg from '@/assets/mimic.png';
import discoBeeImg from '@/assets/disco-bee.png';
import queenBeeImg from '@/assets/queen-bee.png';

interface Pet {
  id: string;
  name: string;
  rarity?: string;
  imageUrl?: string;
}

interface PetGridProps {
  onSelectionChange?: (selectedPets: Record<string, number>) => void;
}

export default function PetGrid({ onSelectionChange }: PetGridProps) {
  const pets: Pet[] = [
    { id: 'trex', name: 'T-Rex', rarity: 'Legendary', imageUrl: trexImg },
    { id: 'raccoon', name: 'Raccoon', imageUrl: raccoonImg },
    { id: 'fennec', name: 'Fennec Fox', imageUrl: fennecImg },
    { id: 'kitsune', name: 'Kitsune', rarity: 'Legendary', imageUrl: kitsuneImg },
    { id: 'red-dragon', name: 'Red Dragon', rarity: 'Legendary', imageUrl: redDragonImg },
    { id: 'mimic', name: 'Mimic Octopus', imageUrl: mimicImg },
    { id: 'disco-bee', name: 'Disco Bee', imageUrl: discoBeeImg },
    { id: 'queen-bee', name: 'Queen Bee', rarity: 'Legendary', imageUrl: queenBeeImg },
  ];

  const [quantities, setQuantities] = useState<Record<string, number>>(
    pets.reduce((acc, pet) => ({ ...acc, [pet.id]: 0 }), {})
  );

  const handleQuantityChange = (petId: string, newQuantity: number) => {
    const updatedQuantities = { ...quantities, [petId]: newQuantity };
    setQuantities(updatedQuantities);
    onSelectionChange?.(updatedQuantities);
    console.log('Selection changed:', updatedQuantities);
  };

  const selectedCount = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <Card className="w-full" data-testid="card-pet-grid">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Choose Pets</CardTitle>
        <span className="text-sm text-primary font-semibold" data-testid="text-selected-count">
          {selectedCount} selected
        </span>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              quantity={quantities[pet.id]}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}