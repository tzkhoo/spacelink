import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Box, Sparkles, Camera, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ARVisualizerModal } from './ARVisualizerModal';

interface ARSpaceVisualizerEntryProps {
  listingTitle: string;
  availableSizes: string[];
}

export const ARSpaceVisualizerEntry: React.FC<ARSpaceVisualizerEntryProps> = ({ 
  listingTitle, 
  availableSizes 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <Card 
          className="glass-card border-0 overflow-hidden relative group cursor-pointer"
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
        >
          {/* Animated Background Gradient */}
          <motion.div
            animate={{ 
              background: cardHovered 
                ? "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.15))"
                : "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--secondary) / 0.08))"
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          />

          {/* NEW Badge Animation */}
          <motion.div
            animate={{ 
              scale: cardHovered ? [1, 1.1, 1] : 1,
              rotate: cardHovered ? [0, 5, 0] : 0
            }}
            transition={{ duration: 0.6, repeat: cardHovered ? Infinity : 0 }}
            className="absolute top-4 right-4 z-10"
          >
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 animate-pulse-glow">
              <Sparkles className="w-3 h-3 mr-1" />
              NEW
            </Badge>
          </motion.div>

          <CardHeader className="relative z-10 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                {/* AR Icon with Animation */}
                <motion.div
                  animate={{ 
                    rotate: cardHovered ? [0, 10, -10, 0] : 0,
                    scale: cardHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 1.2 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center relative overflow-hidden"
                >
                  <Scan className="w-8 h-8 text-white relative z-10" />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white/20 rounded-full"
                  />
                </motion.div>

                <div>
                  <CardTitle className="gradient-text text-2xl font-bold mb-2">
                    🔍 Try AR Space Visualizer
                  </CardTitle>
                  <p className="text-muted-foreground max-w-md">
                    Scan your items and preview how they fit before booking. 
                    See exactly what you need with our revolutionary AR technology.
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            {/* Features Preview */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 glass-surface rounded-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Smart Scanning</h4>
                <p className="text-xs text-muted-foreground">95% accuracy</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 glass-surface rounded-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Box className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">3D Preview</h4>
                <p className="text-xs text-muted-foreground">True-to-scale</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 glass-surface rounded-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Perfect Match</h4>
                <p className="text-xs text-muted-foreground">Ideal sizing</p>
              </motion.div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  size="lg"
                  onClick={() => setShowModal(true)}
                  className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-lg shadow-xl relative overflow-hidden group"
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-center space-x-3"
                  >
                    <Zap className="w-6 h-6" />
                    <span>Try Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </Button>
              </motion.div>

              <Button
                variant="outline"
                size="lg"
                className="glass-surface border-glass-border hover:bg-glass-surface px-8"
              >
                Later
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-glass-border">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">95%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">10k+</div>
                <div className="text-xs text-muted-foreground">Items Scanned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">3D</div>
                <div className="text-xs text-muted-foreground">Visualization</div>
              </div>
            </div>
          </CardContent>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 15, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-primary/40 rounded-full"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 30}%`
                }}
              />
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AR Visualizer Modal */}
      <ARVisualizerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        listingTitle={listingTitle}
        availableSizes={availableSizes}
      />
    </>
  );
};