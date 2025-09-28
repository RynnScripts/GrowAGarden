import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <header className="bg-card border-b border-card-border p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Free Grow A Garden Pets
          </h1>
          <Badge 
            className="bg-live-indicator text-black font-bold animate-pulse" 
            data-testid="badge-live-indicator"
          >
            LIVE
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Create By Grow A Garden Moderators
        </p>
      </div>
    </header>
  );
}