import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, Trash2, Plus, Eye, EyeOff, Lock } from 'lucide-react';
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";

interface AdminPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function AdminPanel({ isVisible, onToggle }: AdminPanelProps) {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Fetch admin settings when authenticated
  const { data: settings, refetch } = useQuery({
    queryKey: ['/api/admin/settings'],
    queryFn: () => fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).then(res => res.json()),
    enabled: isAuthenticated,
  });

  // Authentication mutation
  const authMutation = useMutation({
    mutationFn: (adminPassword: string) => 
      fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      }).then(res => res.json()),
    onSuccess: () => {
      setIsAuthenticated(true);
      setAuthError('');
      refetch();
    },
    onError: () => {
      setAuthError('Invalid password');
      setIsAuthenticated(false);
    },
  });

  // Save URL mutation
  const saveUrlMutation = useMutation({
    mutationFn: (url: string) => 
      fetch('/api/admin/settings/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          password,
          key: `redirect_url_${Date.now()}`,
          value: url 
        }),
      }).then(res => res.json()),
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['/api/admin/settings'] });
    },
  });

  // Delete URL mutation
  const deleteUrlMutation = useMutation({
    mutationFn: (key: string) => 
      fetch('/api/admin/settings/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, key }),
      }).then(res => res.json()),
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['/api/admin/settings'] });
    },
  });

  const handleAuth = () => {
    if (!password.trim()) return;
    authMutation.mutate(password);
  };

  const saveUrl = () => {
    if (!redirectUrl.trim()) return;
    saveUrlMutation.mutate(redirectUrl);
  };

  const deleteUrl = (key: string) => {
    deleteUrlMutation.mutate(key);
  };

  const selectUrl = (url: string) => {
    setRedirectUrl(url);
  };

  // Get saved URLs from settings
  const savedUrls = Array.isArray(settings) ? settings.filter((setting: any) => 
    setting.key.startsWith('redirect_url_')
  ) : [];

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className="fixed top-4 right-4 z-50"
        data-testid="button-show-admin"
      >
        <Settings className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Card className="fixed top-4 right-4 w-96 z-50 shadow-xl" data-testid="card-admin-panel">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <CardTitle className="text-lg">Admin Panel</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          data-testid="button-hide-admin"
        >
          <EyeOff className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Badge variant="destructive" className="text-xs">
            ADMIN ONLY
          </Badge>
        </div>

        {!isAuthenticated ? (
          /* Authentication Form */
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Admin authentication required</span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Password</label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  data-testid="input-admin-password"
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                />
                <Button 
                  onClick={handleAuth}
                  disabled={!password.trim() || authMutation.isPending}
                  data-testid="button-admin-login"
                >
                  {authMutation.isPending ? 'Checking...' : 'Login'}
                </Button>
              </div>
              {authError && (
                <p className="text-sm text-destructive">{authError}</p>
              )}
            </div>
          </div>
        ) : (
          /* Admin Panel Content */
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Authenticated as Admin</span>
            </div>
            
            {/* Current URL Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Redirect URL</label>
              <div className="flex gap-2">
                <Input
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  placeholder="Enter redirect URL"
                  data-testid="input-redirect-url"
                />
                <Button 
                  onClick={saveUrl}
                  disabled={!redirectUrl.trim() || saveUrlMutation.isPending}
                  size="icon"
                  data-testid="button-save-url"
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Saved URLs */}
            {savedUrls.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Saved URLs</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {savedUrls.map((setting: any, index: number) => (
                    <div 
                      key={setting.id} 
                      className="flex items-center gap-2 p-2 bg-muted rounded-lg"
                      data-testid={`saved-url-${index}`}
                    >
                      <div 
                        className="flex-1 text-sm truncate cursor-pointer hover:text-primary"
                        onClick={() => selectUrl(setting.value)}
                        title={setting.value}
                      >
                        {setting.value}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => deleteUrl(setting.key)}
                        data-testid={`button-delete-url-${index}`}
                        disabled={deleteUrlMutation.isPending}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground">
              URLs are saved permanently on the server and persist between sessions.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}