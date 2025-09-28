import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ExternalLink } from 'lucide-react';

interface RobloxProfile {
  username: string;
  userId: string;
  joinDate: string;
  avatarUrl?: string;
}

interface RobloxAccountProps {
  onProfileLoaded?: (profile: RobloxProfile) => void;
}

export default function RobloxAccount({ onProfileLoaded }: RobloxAccountProps) {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<RobloxProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!username.trim()) return;
    
    setIsLoading(true);
    console.log('Fetching profile for:', username);
    
    // Simulate realistic Roblox profile data based on username
    setTimeout(() => {
      const mockProfile: RobloxProfile = {
        username: username,
        userId: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
        joinDate: `${Math.floor(Math.random() * 12 + 1)}/${Math.floor(Math.random() * 28 + 1)}/${Math.floor(Math.random() * 10 + 2015)}`,
        avatarUrl: undefined // Will use fallback
      };
      setProfile(mockProfile);
      onProfileLoaded?.(mockProfile);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full" data-testid="card-roblox-account">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
        <User className="w-5 h-5" />
        <CardTitle>Roblox Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Real Roblox info appears after saving your username.
        </p>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Roblox Username</label>
          <div className="flex gap-2">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              data-testid="input-roblox-username"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSave}
              disabled={!username.trim() || isLoading}
              className="bg-destructive hover:bg-destructive/90"
              data-testid="button-save-username"
            >
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>

        {profile && (
          <div className="bg-card border border-card-border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-border">
                <AvatarImage src={profile.avatarUrl} />
                <AvatarFallback className="bg-muted text-foreground text-lg font-bold">
                  {profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">{profile.username}</h3>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>
              
              <Button 
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
                data-testid="button-open-profile"
              >
                Open
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">User ID</p>
                <p className="text-sm font-mono font-semibold text-foreground">{profile.userId}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Joined</p>
                <p className="text-sm font-semibold text-foreground">{profile.joinDate}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}