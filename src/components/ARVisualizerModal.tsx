import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Camera, 
  Scan, 
  Box, 
  Package, 
  CheckCircle, 
  ArrowRight, 
  Eye,
  RotateCcw,
  Zap,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ARVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingTitle: string;
  availableSizes: string[];
}

type ModalStep = 'intro' | 'permission' | 'scanning' | 'results';

interface ScannedItem {
  id: string;
  name: string;
  volume: number;
  confidence: number;
}

export const ARVisualizerModal: React.FC<ARVisualizerModalProps> = ({
  isOpen,
  onClose,
  listingTitle,
  availableSizes
}) => {
  const [currentStep, setCurrentStep] = useState<ModalStep>('intro');
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedSize, setSelectedSize] = useState(availableSizes[1] || '50 sq ft');
  const [isScanning, setIsScanning] = useState(false);

  const startScanning = () => {
    setCurrentStep('permission');
    setTimeout(() => {
      setCurrentStep('scanning');
      simulateScan();
    }, 2000);
  };

  const simulateScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Add a scanned item
          const newItem: ScannedItem = {
            id: Date.now().toString(),
            name: ['Office Chair', 'Storage Box', 'Desk', 'Bookshelf', 'TV Stand'][Math.floor(Math.random() * 5)],
            volume: Math.round((Math.random() * 1.5 + 0.2) * 10) / 10,
            confidence: Math.round(Math.random() * 10 + 90)
          };
          
          setScannedItems(prev => [...prev, newItem]);
          
          // Continue scanning or show results
          if (scannedItems.length < 3) {
            setTimeout(simulateScan, 1000);
          } else {
            setTimeout(() => setCurrentStep('results'), 1500);
          }
          
          return 0;
        }
        return prev + 3;
      });
    }, 100);
  };

  const totalVolume = scannedItems.reduce((sum, item) => sum + item.volume, 0);
  const recommendedSize = totalVolume <= 2 ? '25 sq ft' : totalVolume <= 4 ? '50 sq ft' : '100 sq ft';
  const price = recommendedSize === '25 sq ft' ? 980 : recommendedSize === '50 sq ft' ? 1400 : 2200;

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 100 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0, 
      y: 100,
      transition: { duration: 0.3 }
    }
  };

  const renderIntroStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center space-y-6"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto relative"
      >
        <Scan className="w-12 h-12 text-white" />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-md"
        />
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold gradient-text mb-2">Smart Scanning</h2>
        <p className="text-muted-foreground mb-4">
          Our AI will analyze your items with 95% accuracy to find the perfect storage size.
        </p>
        <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          95% Accuracy Rate
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto">
            <Camera className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm font-medium">Scan Items</p>
        </div>
        <div className="space-y-2">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto">
            <Box className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm font-medium">3D Preview</p>
        </div>
        <div className="space-y-2">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm font-medium">Get Match</p>
        </div>
      </div>

      <Button 
        size="lg" 
        onClick={startScanning}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold"
      >
        <Zap className="w-5 h-5 mr-2" />
        Start AR Scanning
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  );

  const renderPermissionStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center space-y-6"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto"
      >
        <Camera className="w-10 h-10 text-orange-500" />
      </motion.div>

      <div>
        <h2 className="text-xl font-bold mb-2">Camera Permission</h2>
        <p className="text-muted-foreground">
          We need access to your camera to scan and analyze your items. Your privacy is protected.
        </p>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
        />
        <span className="text-sm">Requesting camera access...</span>
      </div>
    </motion.div>
  );

  const renderScanningStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Scanning Your Items</h2>
        <p className="text-muted-foreground">Point your camera at each item to scan</p>
      </div>

      {/* Mock Camera View */}
      <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
        
        {/* Scanning Grid */}
        <div className="absolute inset-4 border-2 border-primary/50 rounded-lg">
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary" />
        </div>

        {/* Scanning Line */}
        {isScanning && (
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        )}

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Items Scanned: {scannedItems.length}</span>
            {isScanning && (
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Scan className="w-4 h-4" />
                </motion.div>
                <span className="text-sm">Analyzing...</span>
              </div>
            )}
          </div>
          <Progress value={scanProgress} className="h-2" />
        </div>
      </div>

      {/* Scanned Items */}
      {scannedItems.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Scanned Items</h3>
          <div className="space-y-2">
            {scannedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-surface p-3 rounded-lg flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Volume: {item.volume}m³ • Confidence: {item.confidence}%
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderResultsStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-xl font-bold gradient-text mb-2">✨ Perfect Match Found!</h2>
        <p className="text-muted-foreground">Your items will fit perfectly in our recommended size.</p>
      </div>

      {/* Recommendation Card */}
      <Card className="glass-card border-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div>
              <div className="text-3xl font-bold gradient-text">{recommendedSize}</div>
              <div className="text-sm text-muted-foreground">Recommended Size</div>
            </div>
            
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-lg font-semibold">{totalVolume.toFixed(1)}m³</div>
                <div className="text-xs text-muted-foreground">Total Volume</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">Perfect Fit</div>
                <div className="text-xs text-muted-foreground">Space Utilization</div>
              </div>
            </div>

            <div className="pt-4 border-t border-glass-border">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Monthly Price:</span>
                <div className="text-right">
                  <div className="text-2xl font-bold gradient-text">HK${price}</div>
                  <div className="text-xs text-muted-foreground">Best price today</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold"
                onClick={onClose}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Reserve Now - {recommendedSize}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Options */}
      <div>
        <h3 className="font-semibold mb-3">Try Different Sizes</h3>
        <div className="grid grid-cols-3 gap-3">
          {availableSizes.slice(0, 3).map((size) => (
            <Button
              key={size}
              variant={size === recommendedSize ? "default" : "outline"}
              className={size === recommendedSize ? "bg-primary" : "glass-surface"}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-md"
        >
          <Card className="glass-card border-0 overflow-hidden">
            {/* Header */}
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <CardTitle className="gradient-text">AR Space Visualizer</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="glass-surface w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {currentStep === 'intro' && renderIntroStep()}
                {currentStep === 'permission' && renderPermissionStep()}
                {currentStep === 'scanning' && renderScanningStep()}
                {currentStep === 'results' && renderResultsStep()}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};