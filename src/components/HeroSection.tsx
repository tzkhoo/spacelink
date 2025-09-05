import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-storage.jpg';

interface HeroSectionProps {
  onTabChange: (tab: 'hosts' | 'seekers') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onTabChange }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    spaces: 0,
    sqft: 0,
    users: 0
  });

  // Animate counter on mount
  useEffect(() => {
    const targetStats = {
      spaces: 2900,
      sqft: 150000,
      users: 8900
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        spaces: Math.floor(targetStats.spaces * progress),
        sqft: Math.floor(targetStats.sqft * progress),
        users: Math.floor(targetStats.users * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats(targetStats);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Storage space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-5 sm:px-6">
        {/* Main Headline - Moved up for mobile */}
        <div className="mb-4 sm:mb-8 animate-float -mt-8 sm:mt-0">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-4 leading-tight">
            <span className="block sm:inline text-primary drop-shadow-lg">
              {t('hero.title1')}
            </span>
            <br className="hidden sm:block" />
            <span className="block sm:inline text-primary drop-shadow-lg">
              {t('hero.title2')}
            </span>
          </h1>
          <div className="py-2 sm:py-4">
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              <span className="block sm:hidden">Hong Kong's trusted storage marketplace</span>
              <span className="hidden sm:block">{t('hero.subtitle')}</span>
            </p>
          </div>
        </div>

        {/* Stats Counter - Optimized for mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-8 mb-6 sm:mb-12 px-2">
          <div className="glass-card rounded-xl p-2 sm:p-6 transition-spring hover:scale-105 h-16 sm:h-auto flex flex-col justify-center min-w-0">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2 truncate">
              {stats.spaces.toLocaleString()}+
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground text-center leading-tight">
              {t('hero.stats.spaces')}
            </div>
          </div>
          <div className="glass-card rounded-xl p-2 sm:p-6 transition-spring hover:scale-105 h-16 sm:h-auto flex flex-col justify-center min-w-0">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-secondary mb-1 sm:mb-2 truncate">
              {stats.sqft >= 1000 ? `${Math.floor(stats.sqft / 1000)}K` : stats.sqft.toLocaleString()}+
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground text-center leading-tight">
              {t('hero.stats.sqft')}
            </div>
          </div>
          <div className="glass-card rounded-xl p-2 sm:p-6 transition-spring hover:scale-105 h-16 sm:h-auto flex flex-col justify-center min-w-0">
            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-accent mb-1 sm:mb-2 truncate">
              {stats.users.toLocaleString()}+
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground text-center leading-tight">
              {t('hero.stats.users')}
            </div>
          </div>
        </div>

        {/* CTA Button - Reduced height */}
        <div className="flex justify-center px-5">
          <Button 
            onClick={() => navigate('/listings')}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-6 sm:px-12 py-3 sm:py-6 text-base sm:text-xl rounded-2xl shadow-2xl transition-spring hover:scale-105 relative overflow-hidden group h-12 sm:h-auto"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-xl">Find Your Perfect Storage Space</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>
      </div>
    </section>
  );
};