import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Building2, Zap, FileText, Scan, Box, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ProfileSection } from '@/components/ProfileSection';
import { Navigation } from '@/components/Navigation';
import { MobileBottomNavigation } from '@/components/MobileBottomNavigation';
import { HeroSection } from '@/components/HeroSection';
import { SpaceHostsInterface } from '@/components/SpaceHostsInterface';
import { StorageSeekersInterface } from '@/components/StorageSeekersInterface';
import { Chatbot } from '@/components/Chatbot';
import { ARFeatureCard } from '@/components/ARFeatureCard';
import { useARFeatureCard } from '@/hooks/useARFeatureCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'hosts' | 'seekers'>('hosts');
  const [showHero, setShowHero] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { showARCard, closeARCard, openARCard } = useARFeatureCard();

  // Auto-switch to seekers interface if on /listings route
  useEffect(() => {
    if (location.pathname === '/listings') {
      setActiveTab('seekers');
      setShowHero(false);
    } else if (location.pathname === '/') {
      setShowHero(true);
    }
  }, [location.pathname]);

  const handleTabChange = (tab: 'hosts' | 'seekers') => {
    setActiveTab(tab);
    setShowHero(false);
  };

  const handleBackToHero = () => {
    setShowHero(true);
  };

  // Add reduced motion support
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    }
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen w-full relative overflow-x-hidden">
        {/* Language Switcher - Top Left */}
        <div className="fixed top-6 left-6 z-50">
          <LanguageSwitcher />
        </div>

        {/* Profile Section - Top Right */}
        <div className="fixed top-6 right-6 z-50">
          <ProfileSection />
        </div>

        {/* Desktop Navigation */}
        {!showHero && (
          <div className="container mx-auto pt-8">
            <Navigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
              position="top" 
            />
          </div>
        )}

        {/* Main Content */}
        <main className="relative z-10">
          {showHero ? (
            <>
              <HeroSection onTabChange={handleTabChange} />
              
              {/* AR Space Visualizer Feature */}
              <div className="container mx-auto px-4 py-12">
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-8"
                >
                  <Card className="glass-card border-0 p-8 max-w-4xl mx-auto">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Box className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl gradient-text mb-2">AR Space Visualizer</CardTitle>
                      <CardDescription className="text-lg">
                        Scan your items with your phone and visualize them in 3D storage units
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Smartphone className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold mb-2">Smart Scanning</h3>
                          <p className="text-sm text-muted-foreground">AI-powered volume estimation using your phone camera</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Scan className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold mb-2">3D Visualization</h3>
                          <p className="text-sm text-muted-foreground">See how your items fit in real storage units</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Shield className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold mb-2">Perfect Matching</h3>
                          <p className="text-sm text-muted-foreground">Get accurate size recommendations and avoid over/under-booking</p>
                        </div>
                      </div>
                      <Link to="/ar-scanner">
                        <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                          <Scan className="w-5 h-5 mr-2" />
                          Try AR Scanner
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Advanced Features Section */}
              <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold gradient-text mb-4">Enterprise Solutions</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Advanced features designed for businesses, including insurance protection and API integrations
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <Card className="glass-card border-0 transition-all duration-300 hover:scale-105 group">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Insurance Module</CardTitle>
                      <CardDescription>
                        Comprehensive insurance coverage with 72-hour claim processing and broker partnerships
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>All-risk property insurance</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>Third-party liability coverage</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>Digital document management</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>Automated claim processing</span>
                        </li>
                      </ul>
                      <Link to="/insurance">
                        <Button className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Explore Insurance
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-0 transition-all duration-300 hover:scale-105 group">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Corporate Portal</CardTitle>
                      <CardDescription>
                        Enterprise dashboard with bulk booking, CSV uploads, and API integrations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>Bulk booking management</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>CSV upload for SKU tagging</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>Shopify & HKTVmall integration</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>Logistics partner APIs</span>
                        </li>
                      </ul>
                      <Link to="/corporate">
                        <Button className="w-full">
                          <Zap className="h-4 w-4 mr-2" />
                          Access Corporate Portal
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="container mx-auto py-8">
              {/* Interface Content */}
              {activeTab === 'hosts' ? (
                <SpaceHostsInterface />
              ) : (
                <StorageSeekersInterface />
              )}
            </div>
          )}
        </main>


        {/* Chatbot - controlled by global nav */}
        <Chatbot 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)}
        />

        {/* AR Feature Introduction Card */}
        <ARFeatureCard 
          isVisible={showARCard} 
          onClose={closeARCard} 
        />

        {/* Accessibility Skip Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
      </div>
    </LanguageProvider>
  );
};

export default Index;
