import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card hover:glass-border transition-smooth p-2 w-10 h-10"
        aria-label="Language switcher"
      >
        <Globe className="h-4 w-4" strokeWidth={1.5} />
      </Button>
      
      {isOpen && (
        <div className="absolute top-12 right-0 glass-card rounded-2xl p-2 min-w-24 z-50 transition-spring">
          <button
            onClick={() => toggleLanguage('en')}
            className={`block w-full text-left px-3 py-2 rounded-xl transition-smooth text-sm ${
              language === 'en' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-white/20'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => toggleLanguage('zh')}
            className={`block w-full text-left px-3 py-2 rounded-xl transition-smooth text-sm ${
              language === 'zh' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-white/20'
            }`}
          >
            繁
          </button>
        </div>
      )}
    </div>
  );
};