import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Scan, Package, Eye, CheckCircle, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ScannedItem {
  id: string;
  name: string;
  volume: number;
  dimensions: { width: number; height: number; depth: number };
  confidence: number;
  thumbnail: string;
}

interface ARScannerProps {
  onItemScanned: (item: ScannedItem) => void;
  onViewIn3D: () => void;
  scannedItems: ScannedItem[];
}

export const ARScanner: React.FC<ARScannerProps> = ({ 
  onItemScanned, 
  onViewIn3D, 
  scannedItems 
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [currentScan, setCurrentScan] = useState<Partial<ScannedItem> | null>(null);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!cameraActive) {
      await startCamera();
      return;
    }
    
    // Capture photo first
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Flip the image horizontally to match the mirrored video
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0);
        
        // Show photo captured feedback
        setPhotoCaptured(true);
        
        // Start analysis after photo is taken
        setTimeout(() => {
          setIsScanning(true);
          setScanProgress(0);
          setPhotoCaptured(false);

          // Simulate ML scanning process
          const scanAnimation = setInterval(() => {
            setScanProgress(prev => {
              if (prev >= 100) {
                clearInterval(scanAnimation);
                
                // Mock detected item
                const mockItem: ScannedItem = {
                  id: Date.now().toString(),
                  name: ['Office Chair', 'Storage Box', 'Desk Lamp', 'File Cabinet'][Math.floor(Math.random() * 4)],
                  volume: Math.round((Math.random() * 0.8 + 0.1) * 10) / 10,
                  dimensions: {
                    width: Math.round(Math.random() * 80 + 20),
                    height: Math.round(Math.random() * 100 + 30),
                    depth: Math.round(Math.random() * 60 + 20)
                  },
                  confidence: Math.round((Math.random() * 15 + 85)),
                  thumbnail: canvas.toDataURL('image/jpeg', 0.8)
                };

                setCurrentScan(mockItem);
                setTimeout(() => {
                  onItemScanned(mockItem);
                  setCurrentScan(null);
                  setIsScanning(false);
                  setScanProgress(0);
                }, 2000);
                
                return 100;
              }
              return prev + 2;
            });
          }, 50);
        }, 1000);
      }
    }
  }, [cameraActive, startCamera, onItemScanned]);

  const totalVolume = scannedItems.reduce((sum, item) => sum + item.volume, 0);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background-gradient-start to-background-gradient-end">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card m-4 p-4 border-0"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Scan className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold gradient-text">AR Space Scanner</h1>
              <p className="text-sm text-muted-foreground">Scan your items with precision</p>
            </div>
          </div>
          <Badge variant="secondary" className="glass-surface">
            {scannedItems.length} items
          </Badge>
        </div>
      </motion.div>

      {/* Camera Viewport */}
      <div className="flex-1 mx-4 mb-4">
        <Card className="glass-card border-0 h-full overflow-hidden">
          <CardContent className="p-0 h-full relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
              style={{ transform: 'scaleX(-1)' }}
            />
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!cameraActive && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-card p-4 text-center border-0"
                >
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Tap "Start Camera" to begin</p>
                </motion.div>
              )}

              {/* Scanning Frame */}
              {cameraActive && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-8 border-2 border-primary/50 rounded-2xl"
                >
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg" />

                  {/* Scanning animation */}
                  {isScanning && (
                    <motion.div
                      initial={{ y: -100 }}
                      animate={{ y: '100vh' }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                  )}
                </motion.div>
              )}

              {/* Photo Captured Feedback */}
              {photoCaptured && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="glass-card p-4 text-center border-0">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">Photo Captured!</p>
                    <p className="text-xs text-muted-foreground">Analyzing...</p>
                  </div>
                </motion.div>
              )}
              <AnimatePresence>
                {currentScan && (
                  <motion.div
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: -50 }}
                    className="absolute bottom-4 left-4 right-4 glass-card p-4 border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{currentScan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Volume: {currentScan.volume}m³ • Confidence: {currentScan.confidence}%
                        </p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scanning Progress */}
      {isScanning && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-4 mb-4"
        >
          <Card className="glass-card border-0 p-4">
            <div className="flex items-center space-x-3 mb-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Scan className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-sm font-medium">Analyzing object...</span>
            </div>
            <Progress value={scanProgress} className="h-2" />
          </Card>
        </motion.div>
      )}

      {/* Scanned Items Summary */}
      {scannedItems.length > 0 && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-4 mb-4"
        >
          <Card className="glass-card border-0 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Volume: {totalVolume.toFixed(1)}m³</span>
              </div>
              <Button 
                size="sm" 
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed relative"
              >
                <Eye className="w-4 h-4 mr-2" />
                View in 3D
                <Badge className="absolute -top-2 -right-2 text-xs px-1 py-0 bg-secondary text-secondary-foreground">
                  Soon
                </Badge>
              </Button>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {scannedItems.slice(-3).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, x: 50 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 glass-surface p-2 rounded-lg min-w-[100px]"
                >
                  <Package className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-xs font-medium text-center truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground text-center">{item.volume}m³</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Photo Capture Button */}
      <div className="p-4 pt-0 pb-24 md:pb-4">
        <Button
          size="lg"
          onClick={capturePhoto}
          disabled={isScanning || photoCaptured}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300"
        >
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3"
          >
            <Camera className="w-6 h-6" />
            <span>
              {!cameraActive ? 'Start Camera' : 
               isScanning ? 'Analyzing...' : 
               photoCaptured ? 'Captured!' : 'Take Photo'}
            </span>
          </motion.div>
        </Button>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};