import React from 'react';
import { Home, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationProps {
  activeTab: 'hosts' | 'seekers';
  onTabChange: (tab: 'hosts' | 'seekers') => void;
  position?: 'bottom' | 'top';
}

export const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  position = 'bottom' 
}) => {
  const { t } = useLanguage();

  const baseClasses = position === 'bottom' 
    ? 'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40'
    : 'mb-8';

  return (
    <nav className={`${baseClasses} ${position === 'bottom' ? 'block md:hidden' : 'hidden md:block'}`}>
      <div className="glass-card rounded-full p-2 flex items-center space-x-2 min-w-[320px] h-[72px]">
        {/* Sliding indicator */}
        <div 
          className={`absolute h-[56px] w-[calc(50%-8px)] bg-primary rounded-full transition-all duration-250 cubic-bezier(0.4,0,0.2,1) ${
            activeTab === 'hosts' ? 'left-2' : 'left-[calc(50%+2px)]'
          }`}
        />
        
        {/* Host Tab */}
        <button
          onClick={() => onTabChange('hosts')}
          className={`relative z-10 flex-1 flex items-center justify-center space-x-2 h-[56px] rounded-full transition-all duration-200 ${
            activeTab === 'hosts' 
              ? 'text-white' 
              : 'text-foreground hover:text-primary'
          }`}
          aria-label={t('nav.spaceHosts')}
        >
          <Home className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-sm font-medium">{t('nav.spaceHosts')}</span>
        </button>

        {/* Seeker Tab */}
        <button
          onClick={() => onTabChange('seekers')}
          className={`relative z-10 flex-1 flex items-center justify-center space-x-2 h-[56px] rounded-full transition-all duration-200 ${
            activeTab === 'seekers' 
              ? 'text-white' 
              : 'text-foreground hover:text-primary'
          }`}
          aria-label={t('nav.storageSeekers')}
        >
          <Search className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-sm font-medium">{t('nav.storageSeekers')}</span>
        </button>
      </div>
    </nav>
  );
};