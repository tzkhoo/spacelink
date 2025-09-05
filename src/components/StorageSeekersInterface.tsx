import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useARFeatureCard } from '@/hooks/useARFeatureCard';

// Import storage images
import storageIndoorRoom from '@/assets/storage-indoor-room.jpg';
import storageOfficeSpace from '@/assets/storage-office-space.jpg';
import storageResidentialRoom from '@/assets/storage-residential-room.jpg';
import storageWarehouseCorner from '@/assets/storage-warehouse-corner.jpg';
import storageGarageUnit from '@/assets/storage-garage-unit.jpg';
import { 
  Search, 
  MapPin, 
  Camera, 
  Filter, 
  Star, 
  Shield, 
  Clock, 
  Wifi,
  Car,
  Eye,
  Heart,
  Scan
} from 'lucide-react';

interface StorageSpace {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  distance: string;
  distanceValue: number; // for filtering
  features: string[];
  image: string;
  available247: boolean;
  security: boolean;
  floorAccess: boolean; // ground floor access
}

export const StorageSeekersInterface = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { openARCard } = useARFeatureCard();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [filters, setFilters] = useState({
    distance: [5],
    priceRange: [0, 500],
    floorAccess: false,
    security24h: false
  });

  // Mock data for storage spaces
  const storageSpaces: StorageSpace[] = [
    {
      id: '1',
      title: 'Secure Storage in Kwun Tong',
      location: 'Kwun Tong, Kowloon',
      price: 150,
      rating: 4.8,
      distance: '0.8 km',
      distanceValue: 0.8,
      features: ['24h Security', 'CCTV', 'Climate Control'],
      image: storageIndoorRoom,
      available247: true,
      security: true,
      floorAccess: true
    },
    {
      id: '2',
      title: 'Central Storage Hub',
      location: 'Central, Hong Kong Island',
      price: 280,
      rating: 4.9,
      distance: '1.2 km',
      distanceValue: 1.2,
      features: ['Premium Location', 'Concierge', 'Parking'],
      image: storageOfficeSpace,
      available247: true,
      security: true,
      floorAccess: true
    },
    {
      id: '3',
      title: 'Affordable Warehouse Space',
      location: 'Tsuen Wan, New Territories',
      price: 95,
      rating: 4.5,
      distance: '2.1 km',
      distanceValue: 2.1,
      features: ['Large Space', 'Loading Dock', 'Affordable'],
      image: storageWarehouseCorner,
      available247: false,
      security: true,
      floorAccess: true
    },
    {
      id: '4',
      title: 'Premium Storage in Mong Kok',
      location: 'Mong Kok, Kowloon',
      price: 220,
      rating: 4.7,
      distance: '1.5 km',
      distanceValue: 1.5,
      features: ['Easy Access', 'Air Conditioning', 'Insurance'],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      available247: true,
      security: true,
      floorAccess: false
    },
    {
      id: '5',
      title: 'Budget Storage in Sha Tin',
      location: 'Sha Tin, New Territories',
      price: 85,
      rating: 4.3,
      distance: '3.2 km',
      distanceValue: 3.2,
      features: ['Budget Friendly', 'Vehicle Access', 'Clean'],
      image: storageGarageUnit,
      available247: false,
      security: false,
      floorAccess: true
    },
    {
      id: '6',
      title: 'Industrial Storage in Fo Tan',
      location: 'Fo Tan, New Territories',
      price: 120,
      rating: 4.4,
      distance: '2.8 km',
      distanceValue: 2.8,
      features: ['High Ceiling', 'Forklift Access', 'Industrial'],
      image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop',
      available247: true,
      security: true,
      floorAccess: false
    },
    {
      id: '7',
      title: 'Self Storage in Causeway Bay',
      location: 'Causeway Bay, Hong Kong Island',
      price: 320,
      rating: 4.8,
      distance: '1.8 km',
      distanceValue: 1.8,
      features: ['Prime Location', 'Modern Facility', 'Smart Locks'],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      available247: true,
      security: true,
      floorAccess: true
    },
    {
      id: '8',
      title: 'Mini Storage in Tai Po',
      location: 'Tai Po, New Territories',
      price: 75,
      rating: 4.2,
      distance: '4.1 km',
      distanceValue: 4.1,
      features: ['Small Units', 'Flexible Terms', 'Economic'],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      available247: false,
      security: true,
      floorAccess: true
    },
    {
      id: '9',
      title: 'Climate Storage in Admiralty',
      location: 'Admiralty, Hong Kong Island',
      price: 350,
      rating: 4.9,
      distance: '2.3 km',
      distanceValue: 2.3,
      features: ['Climate Control', 'Luxury Building', 'Concierge'],
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
      available247: true,
      security: true,
      floorAccess: false
    },
    {
      id: '10',
      title: 'Container Storage in Yuen Long',
      location: 'Yuen Long, New Territories',
      price: 60,
      rating: 4.0,
      distance: '5.5 km',
      distanceValue: 5.5,
      features: ['Container Units', 'Drive-up Access', 'Cheap'],
      image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop',
      available247: false,
      security: false,
      floorAccess: true
    },
    {
      id: '11',
      title: 'Business Storage in Tsim Sha Tsui',
      location: 'Tsim Sha Tsui, Kowloon',
      price: 390,
      rating: 4.8,
      distance: '2.0 km',
      distanceValue: 2.0,
      features: ['Business Center', 'Meeting Rooms', 'Premium'],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      available247: true,
      security: true,
      floorAccess: false
    },
    {
      id: '12',
      title: 'Family Storage in Tuen Mun',
      location: 'Tuen Mun, New Territories',
      price: 90,
      rating: 4.3,
      distance: '4.8 km',
      distanceValue: 4.8,
      features: ['Family Friendly', 'Wide Aisles', 'Safe'],
      image: storageResidentialRoom,
      available247: false,
      security: true,
      floorAccess: true
    },
    {
      id: '13',
      title: 'Luxury Storage in Mid-Levels',
      location: 'Mid-Levels, Hong Kong Island',
      price: 450,
      rating: 5.0,
      distance: '1.9 km',
      distanceValue: 1.9,
      features: ['Luxury Service', 'White Glove', 'Valet'],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      available247: true,
      security: true,
      floorAccess: false
    }
  ];

  const filteredSpaces = storageSpaces.filter(space => {
    const matchesSearch = space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         space.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = space.price >= filters.priceRange[0] && space.price <= filters.priceRange[1];
    const matchesDistance = space.distanceValue <= filters.distance[0];
    const matchesFloorAccess = !filters.floorAccess || space.floorAccess;
    const matchesSecurity24h = !filters.security24h || (space.security && space.available247);
    
    return matchesSearch && matchesPrice && matchesDistance && matchesFloorAccess && matchesSecurity24h;
  });

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchQuery('Current Location');
          // In a real app, you'd reverse geocode the coordinates
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleListingClick = (e: React.MouseEvent, spaceId: string) => {
    e.preventDefault();
    // Trigger AR popup for first-time users
    openARCard();
    
    // Small delay to show popup before navigation
    setTimeout(() => {
      navigate(`/listing/${spaceId}`);
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pb-20">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 gradient-text">Find Storage Fast</h2>
        <p className="text-muted-foreground">Rental storages near you</p>
      </div>

      {/* Search Section */}
      <div className="glass-card rounded-2xl p-4 mb-6">
        <div className="relative w-full">
          {/* Compact Search Bar with integrated buttons */}
          <div className="relative flex items-center w-full">
            <button
              onClick={handleUseLocation}
              className="absolute left-3 z-10 p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Use my location"
            >
              <MapPin className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </button>
            
            <Input
              placeholder="Search for storage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-surface border-glass-border rounded-xl pl-14 pr-14 h-12 w-full"
            />
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 z-10 p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Filters"
            >
              <Filter className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-glass-border">
            {/* Distance Filter */}
            <div>
              <label className="text-sm font-medium mb-3 block">{t('seekers.filters.distance')}</label>
              <Slider
                value={filters.distance}
                onValueChange={(value) => setFilters({...filters, distance: value})}
                max={20}
                min={1}
                step={1}
                className="mb-2"
              />
              <div className="text-xs text-muted-foreground">Within {filters.distance[0]} km</div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-sm font-medium mb-3 block">{t('seekers.filters.price')}</label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters({...filters, priceRange: value})}
                max={1000}
                min={0}
                step={50}
                className="mb-2"
              />
              <div className="text-xs text-muted-foreground">
                HK${filters.priceRange[0]} - HK${filters.priceRange[1]}
              </div>
            </div>

            {/* Floor Access */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.floorAccess}
                  onChange={(e) => setFilters({...filters, floorAccess: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm">{t('seekers.filters.access')}</span>
              </label>
            </div>

            {/* 24h Security */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.security24h}
                  onChange={(e) => setFilters({...filters, security24h: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm">{t('seekers.filters.security')}</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Results Grid - Center aligned for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 justify-items-center md:justify-items-stretch">
        {filteredSpaces.map((space) => (
          <div key={space.id} className="block">
            <Card 
              className="glass-card rounded-2xl overflow-hidden transition-spring hover:scale-105 hover:shadow-glass-hover cursor-pointer w-full max-w-sm md:max-w-none"
              onClick={(e) => handleListingClick(e, space.id)}
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                <img 
                  src={space.image} 
                  alt={space.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {['1', '2', '3', '4', '5', '7', '8', '9', '11', '13'].includes(space.id) && (
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 animate-pulse-glow">
                      <Scan className="h-3 w-3 mr-1" strokeWidth={1.5} />
                      AR Camera
                    </Badge>
                  )}
                  {space.available247 && (
                    <Badge className="bg-primary text-white rounded-lg">
                      <Clock className="h-3 w-3 mr-1" strokeWidth={1.5} />
                      24/7
                    </Badge>
                  )}
                  {space.security && (
                    <Badge className="bg-secondary text-secondary-foreground rounded-lg">
                      <Shield className="h-3 w-3 mr-1" strokeWidth={1.5} />
                      Secure
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <button 
                  className="absolute top-3 right-3 w-8 h-8 glass-surface rounded-full flex items-center justify-center transition-smooth hover:bg-white/30"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{space.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{space.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground">{space.location}</span>
                  <span className="text-xs text-muted-foreground">• {space.distance}</span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {space.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs rounded-lg">
                      {feature}
                    </Badge>
                  ))}
                  {space.features.length > 2 && (
                    <Badge variant="outline" className="text-xs rounded-lg">
                      +{space.features.length - 2} more
                    </Badge>
                  )}
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">HK${space.price}</span>
                    <span className="text-sm text-muted-foreground">/day</span>
                  </div>
                  <Button className="rounded-xl">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-card rounded-2xl p-6 max-w-md w-full">
            <div className="text-center">
              <Camera className="h-16 w-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold mb-2">{t('seekers.camera.scan')}</h3>
              <p className="text-muted-foreground mb-6">
                Record a 15-second video of your item to get AI-powered size estimates and 3D previews.
              </p>
              <div className="flex gap-3">
                <Button className="flex-1 rounded-xl">
                  Start Recording
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCamera(false)}
                  className="glass-card border-glass-border rounded-xl"
                >
                  {t('common.close')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};