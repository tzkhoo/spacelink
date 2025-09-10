import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, List, MessageCircle, Camera, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileBottomNavigationProps {
  onChatbotToggle?: () => void;
  isChatbotOpen?: boolean;
}

export const MobileBottomNavigation: React.FC<MobileBottomNavigationProps> = ({ 
  onChatbotToggle,
  isChatbotOpen = false 
}) => {
  const { t } = useLanguage();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      isActive: isActive('/')
    },
    {
      id: 'listings', 
      label: 'Listings',
      icon: List,
      path: '/listings',
      isActive: location.pathname.includes('/listing') || isActive('/listings')
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: MessageCircle,
      isCenter: true,
      isActive: isChatbotOpen,
      onClick: onChatbotToggle
    },
    {
      id: 'history',
      label: 'History',
      icon: Clock,
      path: '/my-rentals',
      isActive: isActive('/my-rentals')
    },
    {
      id: 'camera',
      label: 'Camera', 
      icon: Camera,
      path: '/ar-scanner',
      isActive: isActive('/ar-scanner')
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-4 mb-4">
        <div className="glass-card rounded-2xl p-2 flex items-center justify-around relative">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const baseClasses = `
              flex flex-col items-center justify-center space-y-1 py-2 px-3 rounded-xl transition-all duration-300
              ${item.isCenter ? 'relative' : ''}
            `;
            
            const centerClasses = item.isCenter 
              ? `w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg transform -translate-y-4 ${item.isActive ? 'scale-110 shadow-xl animate-bounce' : 'hover:scale-105 transition-all duration-300'}`
              : `${item.isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`;

            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    // Add ripple animation
                    const button = document.querySelector(`[aria-label="${item.label}"]`);
                    if (button) {
                      button.classList.add('animate-ping');
                      setTimeout(() => button.classList.remove('animate-ping'), 150);
                    }
                    item.onClick?.();
                  }}
                  className={`${baseClasses} ${centerClasses}`}
                  aria-label={item.label}
                >
                  <IconComponent className="h-7 w-7" strokeWidth={1.5} />
                </button>
              );
            }

            if (item.path) {
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`${baseClasses} ${centerClasses} min-w-[60px]`}
                  aria-label={item.label}
                >
                  <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            }

            return null;
          })}
        </div>
      </div>
    </nav>
  );
};