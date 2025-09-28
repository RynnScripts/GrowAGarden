import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  username: string;
  pet: string;
  timestamp: Date;
}

export default function LiveActivity() {
  // todo: remove mock functionality - replace with real activity data
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: '1', username: 'blake', pet: 'T-Rex', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
    { id: '2', username: 'taylor', pet: 'Red Dragon', timestamp: new Date(Date.now() - 5 * 60 * 1000) },
    { id: '3', username: 'alex', pet: 'Raccoon', timestamp: new Date(Date.now() - 8 * 60 * 1000) },
    { id: '4', username: 'blake', pet: 'Queen Bee', timestamp: new Date(Date.now() - 12 * 60 * 1000) },
    { id: '5', username: 'kai', pet: 'Raccoon', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
  ]);

  // Add new activity periodically for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const usernames = ['jordan', 'casey', 'riley', 'morgan', 'avery', 'sage'];
      const pets = ['T-Rex', 'Queen Bee', 'Red Dragon', 'Mimic Octopus', 'Fennec Fox', 'Disco Bee'];
      
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        username: usernames[Math.floor(Math.random() * usernames.length)],
        pet: pets[Math.floor(Math.random() * pets.length)],
        timestamp: new Date(),
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only 10 most recent
    }, 8000 + Math.random() * 4000); // Random interval 8-12 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full" data-testid="card-live-activity">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <div className="w-2 h-2 bg-live-indicator rounded-full animate-pulse"></div>
        <CardTitle className="text-lg">Live Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Recent claims</p>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              data-testid={`activity-item-${activity.id}`}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {activity.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{activity.username}</span>
                  <span className="text-muted-foreground"> just claimed </span>
                  <span className="font-semibold text-primary">{activity.pet}</span>
                  <span className="text-muted-foreground">!</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}