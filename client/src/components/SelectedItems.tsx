import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift } from 'lucide-react';

interface SelectedItemsProps {
  selectedCount: number;
  onClaimSelected: () => void;
}

export default function SelectedItems({ selectedCount, onClaimSelected }: SelectedItemsProps) {
  return (
    <Card className="w-full" data-testid="card-selected-items">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">Selected Items</h3>
            <p className="text-4xl font-bold text-primary" data-testid="text-selected-items-count">
              {selectedCount}
            </p>
          </div>
          
          <Button
            className="w-full h-12 text-lg font-bold bg-success-claim hover:bg-success-claim/90 text-black"
            onClick={onClaimSelected}
            disabled={selectedCount === 0}
            data-testid="button-claim-selected"
          >
            <Gift className="w-5 h-5 mr-2" />
            Claim Selected ({selectedCount})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}