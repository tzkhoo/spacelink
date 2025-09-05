import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ARScanner } from '@/components/ARScanner';
import { StorageViewer3D } from '@/components/StorageViewer3D';

interface ScannedItem {
  id: string;
  name: string;
  volume: number;
  dimensions: { width: number; height: number; depth: number };
  confidence: number;
  thumbnail: string;
}

type ViewMode = 'scanner' | '3d-viewer';

const ARSpaceVisualizer = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('scanner');
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);

  const handleItemScanned = (item: ScannedItem) => {
    setScannedItems(prev => [...prev, item]);
  };

  const handleViewIn3D = () => {
    setCurrentView('3d-viewer');
  };

  const handleBackToScanner = () => {
    setCurrentView('scanner');
  };

  const pageVariants = {
    initial: { x: '100%', opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: '-100%', opacity: 0 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Language Switcher */}
        <div className="fixed top-6 right-6 z-50">
          <LanguageSwitcher />
        </div>

        {/* Animated View Transitions */}
        <AnimatePresence mode="wait">
          {currentView === 'scanner' && (
            <motion.div
              key="scanner"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="absolute inset-0"
            >
              <ARScanner
                onItemScanned={handleItemScanned}
                onViewIn3D={handleViewIn3D}
                scannedItems={scannedItems}
              />
            </motion.div>
          )}

          {currentView === '3d-viewer' && (
            <motion.div
              key="3d-viewer"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="absolute inset-0"
            >
              <StorageViewer3D
                scannedItems={scannedItems}
                onBack={handleBackToScanner}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Stats (Always visible) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          className="fixed bottom-6 left-6 z-40"
        >
          <div className="glass-card p-3 border-0">
            <div className="text-xs text-muted-foreground">Items Scanned</div>
            <div className="text-2xl font-bold gradient-text">{scannedItems.length}</div>
          </div>
        </motion.div>

        {/* Background Decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-primary/5 via-secondary/5 to-primary/5 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-conic from-secondary/5 via-primary/5 to-secondary/5 rounded-full"
          />
        </div>

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

export default ARSpaceVisualizer;