import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from 'lucide-react';

interface Pet {
  id: string;
  name: string;
  rarity?: string;
  imageUrl?: string;
}

interface PetCardProps {
  pet: Pet;
  quantity: number;
  onQuantityChange: (petId: string, newQuantity: number) => void;
}

export default function PetCard({ pet, quantity, onQuantityChange }: PetCardProps) {
  const handleAdd = () => {
    console.log(`Adding ${pet.name}`);
    onQuantityChange(pet.id, quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      console.log(`Removing ${pet.name}`);
      onQuantityChange(pet.id, quantity - 1);
    }
  };

  return (
    <Card className="group hover-elevate transition-all duration-200" data-testid={`card-pet-${pet.id}`}>
      <CardContent className="p-4 space-y-3">
        {/* Pet Image Placeholder */}
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden p-2">
          {pet.imageUrl ? (
            <img 
              src={pet.imageUrl} 
              alt={pet.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-4xl">🐾</div>
          )}
          {pet.rarity && (
            <Badge 
              className="absolute top-2 right-2 text-xs"
              variant={pet.rarity === 'Legendary' ? 'default' : 'secondary'}
            >
              {pet.rarity}
            </Badge>
          )}
        </div>

        {/* Pet Name */}
        <div className="text-center">
          <h3 className="font-semibold text-sm">{pet.name}</h3>
          {pet.rarity && (
            <p className="text-xs text-muted-foreground">{pet.rarity}</p>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleRemove}
            disabled={quantity === 0}
            data-testid={`button-remove-${pet.id}`}
          >
            <Minus className="w-3 h-3" />
          </Button>
          
          <div className="w-8 text-center">
            <span 
              className={`font-bold ${quantity > 0 ? 'text-destructive' : 'text-muted-foreground'}`}
              data-testid={`text-quantity-${pet.id}`}
            >
              {quantity}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleAdd}
            data-testid={`button-add-${pet.id}`}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}