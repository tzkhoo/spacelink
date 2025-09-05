import React, { useState, useEffect } from 'react';
import { User, Settings, Moon, Sun, LogOut, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const ProfileSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  // Check for system dark mode preference on mount
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle dark mode class on document
    document.documentElement.classList.toggle('dark');
    toast({
      description: `Switched to ${!isDarkMode ? 'dark' : 'light'} mode`,
    });
  };

  const handleSwitchAccount = () => {
    setIsOpen(false);
    toast({
      description: "Account switching coming soon!",
    });
  };

  const handleSettings = () => {
    setIsOpen(false);
    toast({
      description: "Settings panel coming soon!",
    });
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card hover:glass-border transition-smooth p-2 w-10 h-10"
        aria-label="Profile menu"
      >
        <User className="h-4 w-4" strokeWidth={1.5} />
      </Button>
      
      {isOpen && (
        <div className="absolute top-12 right-0 glass-card rounded-2xl p-3 min-w-48 z-50 transition-spring border border-glass-border">
          {/* Switch Account */}
          <button
            onClick={handleSwitchAccount}
            className="flex items-center space-x-3 w-full text-left px-3 py-2.5 rounded-xl transition-smooth text-sm hover:bg-white/10 group"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <UserCheck className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="font-medium">Switch Account</div>
              <div className="text-xs text-muted-foreground">Manage multiple accounts</div>
            </div>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-3 w-full text-left px-3 py-2.5 rounded-xl transition-smooth text-sm hover:bg-white/10 group"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-primary" />
              ) : (
                <Moon className="h-4 w-4 text-primary" />
              )}
            </div>
            <div>
              <div className="font-medium">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </div>
              <div className="text-xs text-muted-foreground">Switch theme appearance</div>
            </div>
          </button>

          {/* Settings */}
          <button
            onClick={handleSettings}
            className="flex items-center space-x-3 w-full text-left px-3 py-2.5 rounded-xl transition-smooth text-sm hover:bg-white/10 group"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Settings className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="font-medium">Settings</div>
              <div className="text-xs text-muted-foreground">App preferences & config</div>
            </div>
          </button>

          {/* Divider */}
          <div className="border-t border-glass-border my-2" />

          {/* Optional Sign Out (for future use) */}
          <button
            onClick={() => {
              setIsOpen(false);
              toast({
                description: "Sign out functionality coming soon!",
              });
            }}
            className="flex items-center space-x-3 w-full text-left px-3 py-2.5 rounded-xl transition-smooth text-sm hover:bg-destructive/10 text-destructive group"
          >
            <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
              <LogOut className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">Sign Out</div>
              <div className="text-xs opacity-70">Leave current session</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};