import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ArrowLeft, Maximize2, RotateCcw, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ScannedItem {
  id: string;
  name: string;
  volume: number;
  dimensions: { width: number; height: number; depth: number };
  confidence: number;
  thumbnail: string;
}

interface StorageUnit {
  id: string;
  name: string;
  dimensions: { width: number; height: number; depth: number };
  totalVolume: number;
  price: number;
  features: string[];
}

interface StorageViewer3DProps {
  scannedItems: ScannedItem[];
  onBack: () => void;
}

// 3D Storage Unit Component
const StorageUnitBox: React.FC<{ unit: StorageUnit; items: ScannedItem[] }> = ({ unit, items }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group>
      {/* Storage Unit Walls */}
      <Box
        ref={meshRef}
        args={[unit.dimensions.width / 100, unit.dimensions.height / 100, unit.dimensions.depth / 100]}
        position={[0, (unit.dimensions.height / 100) / 2, 0]}
      >
        <meshStandardMaterial 
          color="#f0f9ff"
          transparent
          opacity={0.3}
          wireframe={true}
          wireframeLinewidth={2}
        />
      </Box>

      {/* Floor */}
      <Box
        args={[unit.dimensions.width / 100, 0.05, unit.dimensions.depth / 100]}
        position={[0, 0.025, 0]}
      >
        <meshStandardMaterial color="#e2e8f0" />
      </Box>

      {/* Items inside the unit */}
      {items.map((item, index) => (
        <ItemBox key={item.id} item={item} position={[
          (Math.random() - 0.5) * (unit.dimensions.width / 100 - 0.5),
          (item.dimensions.height / 100) / 2 + 0.05,
          (Math.random() - 0.5) * (unit.dimensions.depth / 100 - 0.5)
        ]} />
      ))}
    </group>
  );
};

// 3D Item Component
const ItemBox: React.FC<{ item: ScannedItem; position: [number, number, number] }> = ({ item, position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[item.dimensions.width / 100, item.dimensions.height / 100, item.dimensions.depth / 100]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#00a5e0" : "#ffd662"}
          transparent
          opacity={0.8}
        />
      </Box>
      
      {hovered && (
        <Text
          position={[0, (item.dimensions.height / 100) / 2 + 0.2, 0]}
          fontSize={0.1}
          color="#1a1a1a"
          anchorX="center"
          anchorY="middle"
        >
          {item.name}
        </Text>
      )}
    </group>
  );
};

// Main 3D Scene
const Scene3D: React.FC<{ unit: StorageUnit; items: ScannedItem[] }> = ({ unit, items }) => {
  return (
    <>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <StorageUnitBox unit={unit} items={items} />
      <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={10} blur={2} far={4} />
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
    </>
  );
};

export const StorageViewer3D: React.FC<StorageViewer3DProps> = ({ scannedItems, onBack }) => {
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');

  // Mock storage units data
  const storageUnits: StorageUnit[] = [
    {
      id: '2x3-basic',
      name: '2×3m Basic Unit',
      dimensions: { width: 200, height: 250, depth: 300 },
      totalVolume: 15,
      price: 800,
      features: ['24/7 Access', 'CCTV Security', 'Climate Controlled']
    },
    {
      id: '3x4-premium',
      name: '3×4m Premium Unit',
      dimensions: { width: 300, height: 250, depth: 400 },
      totalVolume: 30,
      price: 1200,
      features: ['24/7 Access', 'CCTV Security', 'Climate Controlled', 'Insurance Included']
    },
    {
      id: '4x5-large',
      name: '4×5m Large Unit',
      dimensions: { width: 400, height: 250, depth: 500 },
      totalVolume: 50,
      price: 1800,
      features: ['24/7 Access', 'CCTV Security', 'Climate Controlled', 'Insurance Included', 'Loading Bay Access']
    }
  ];

  const currentUnit = storageUnits[selectedUnit];
  const totalItemVolume = scannedItems.reduce((sum, item) => sum + item.volume, 0);
  const utilizationRate = (totalItemVolume / currentUnit.totalVolume) * 100;
  const fitScore = Math.min(100, Math.max(0, 100 - (utilizationRate - 70)));

  const getUtilizationColor = (rate: number) => {
    if (rate < 60) return 'text-green-600';
    if (rate < 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getUtilizationIcon = (rate: number) => {
    if (rate < 85) return <CheckCircle className="w-5 h-5 text-green-600" />;
    return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
  };

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
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="glass-surface"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="font-semibold gradient-text">3D Storage Viewer</h1>
              <p className="text-sm text-muted-foreground">Visualize your items in storage</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="glass-surface">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="glass-surface">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* 3D Viewer */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex-1 mx-4 mb-4"
      >
        <Card className="glass-card border-0 h-full overflow-hidden">
          <CardContent className="p-0 h-full">
            <Suspense fallback={
              <div className="h-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
            }>
              <Canvas camera={{ position: [3, 3, 3], fov: 60 }}>
                <Scene3D unit={currentUnit} items={scannedItems} />
              </Canvas>
            </Suspense>
            
            {/* 3D Overlay Info */}
            <div className="absolute top-4 left-4 right-4">
              <div className="glass-card p-3 border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{currentUnit.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentUnit.dimensions.width/100}×{currentUnit.dimensions.height/100}×{currentUnit.dimensions.depth/100}m
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      {getUtilizationIcon(utilizationRate)}
                      <span className={`font-semibold ${getUtilizationColor(utilizationRate)}`}>
                        {utilizationRate.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Utilization</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Unit Selection & Stats */}
      <div className="mx-4 mb-4 space-y-4">
        {/* Fit Analysis */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-0 p-4">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Fit Analysis</span>
                <Badge 
                  variant={fitScore >= 70 ? "default" : "destructive"}
                  className="glass-surface"
                >
                  {fitScore.toFixed(0)}% Match
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Items Volume: {totalItemVolume.toFixed(1)}m³</span>
                <span>Unit Volume: {currentUnit.totalVolume}m³</span>
              </div>
              <Progress value={utilizationRate} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Remaining: {(currentUnit.totalVolume - totalItemVolume).toFixed(1)}m³</span>
                <span>HK${currentUnit.price}/month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Unit Selection */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {storageUnits.map((unit, index) => (
              <motion.div
                key={unit.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedUnit(index)}
                className={`flex-shrink-0 min-w-[200px] glass-card p-3 border-0 cursor-pointer transition-all ${
                  selectedUnit === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{unit.name}</h4>
                  <Badge variant="outline" className="glass-surface text-xs">
                    {unit.totalVolume}m³
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  HK${unit.price}/month
                </p>
                <div className="flex flex-wrap gap-1">
                  {unit.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs glass-surface">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex space-x-3"
        >
          <Button 
            size="lg" 
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={fitScore < 50}
          >
            Book This Unit
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="glass-surface border-glass-border"
          >
            Save & Compare
          </Button>
        </motion.div>
      </div>
    </div>
  );
};