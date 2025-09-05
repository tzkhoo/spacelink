import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scan, Box, X, Sparkles, Eye, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ARFeatureCardProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ARFeatureCard: React.FC<ARFeatureCardProps> = ({ isVisible, onClose }) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <Scan className="w-6 h-6" />,
      title: "Smart Scanning",
      description: "AI-powered item recognition with 95% accuracy",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: "3D Visualization", 
      description: "See your items in realistic storage units",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Perfect Matching",
      description: "Find the ideal storage size every time",
      color: "from-amber-500 to-orange-500"
    }
  ];

  React.useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, features.length]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, rotate: -10, y: 100 }}
          animate={{ scale: 1, rotate: 0, y: 0 }}
          exit={{ scale: 0, rotate: 10, y: -100 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.6 
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <Card 
            className="glass-card border-0 overflow-hidden relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background */}
            <motion.div
              animate={{ 
                background: [
                  "linear-gradient(45deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))",
                  "linear-gradient(45deg, hsl(var(--secondary) / 0.1), hsl(var(--primary) / 0.1))",
                  "linear-gradient(45deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 glass-surface w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Content */}
            <CardHeader className="relative z-10 text-center pb-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 relative"
              >
                <Box className="w-8 h-8 text-white" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-md"
                />
              </motion.div>

              <div className="flex items-center justify-center space-x-2 mb-2">
                <CardTitle className="gradient-text text-xl">AR Space Visualizer</CardTitle>
                <Badge variant="secondary" className="glass-surface animate-pulse-glow">
                  <Sparkles className="w-3 h-3 mr-1" />
                  NEW
                </Badge>
              </div>

              <p className="text-muted-foreground text-sm">
                Revolutionary AR technology for perfect storage matching
              </p>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
              {/* Feature Showcase */}
              <div className="relative h-20 overflow-hidden rounded-xl bg-gradient-to-r from-background/50 to-background/20 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center p-4"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${features[currentFeature].color} rounded-xl flex items-center justify-center text-white mr-4`}>
                      {features[currentFeature].icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{features[currentFeature].title}</h3>
                      <p className="text-muted-foreground text-xs">{features[currentFeature].description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Feature Indicators */}
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {features.map((_, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: index === currentFeature ? 1.2 : 1,
                        opacity: index === currentFeature ? 1 : 0.4
                      }}
                      className="w-2 h-2 bg-primary rounded-full cursor-pointer"
                      onClick={() => setCurrentFeature(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Demo Preview */}
              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center relative overflow-hidden"
                >
                  <Scan className="w-6 h-6 text-primary" />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    className="absolute inset-0 bg-primary/20 rounded-full"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center relative overflow-hidden"
                >
                  <Box className="w-6 h-6 text-secondary" />
                  <motion.div
                    animate={{ 
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border border-secondary/30 rounded-lg"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center relative overflow-hidden"
                >
                  <Eye className="w-6 h-6 text-green-600" />
                  <motion.div
                    animate={{ 
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 bg-green-500/10 rounded-lg"
                  />
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Link to="/ar-scanner" className="flex-1">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Scan className="w-5 h-5" />
                      <span>Try Now</span>
                    </motion.div>
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={onClose}
                  className="glass-surface border-glass-border hover:bg-glass-surface"
                >
                  Later
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.sin(i) * 10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 80}%`
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};