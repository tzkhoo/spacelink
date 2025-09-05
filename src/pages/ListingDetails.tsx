import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  Thermometer, 
  Camera, 
  MessageSquare, 
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  User,
  Calendar,
  Ruler,
  ArrowLeft,
  Scan,
  Play,
  Heart,
  Share2
} from 'lucide-react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Chatbot } from '@/components/Chatbot';
import { ARSpaceVisualizerEntry } from '@/components/ARSpaceVisualizerEntry';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Import storage images
import storageIndoorRoom from '@/assets/storage-indoor-room.jpg';
import storageOfficeSpace from '@/assets/storage-office-space.jpg';
import storageResidentialRoom from '@/assets/storage-residential-room.jpg';
import storageWarehouseCorner from '@/assets/storage-warehouse-corner.jpg';
import storageGarageUnit from '@/assets/storage-garage-unit.jpg';
import storageInteriorView from '@/assets/storage-interior-view.jpg';
import storageSecurityView from '@/assets/storage-security-view.jpg';
import storageCorridorView from '@/assets/storage-corridor-view.jpg';

// Import profile images
import profileWoman1 from '@/assets/profile-woman-1.jpg';
import profileMan1 from '@/assets/profile-man-1.jpg';
import profileWoman2 from '@/assets/profile-woman-2.jpg';
import profileMan2 from '@/assets/profile-man-2.jpg';

// Gallery images pool for random selection
const additionalImages = [
  storageInteriorView,
  storageSecurityView,
  storageCorridorView
];

// Generate consistent gallery images for each listing using seeded randomization
const generateGalleryImages = (mainImage: string, listingId: string): string[] => {
  // Simple seeded random function based on listing ID
  let seed = parseInt(listingId) || 1;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  const numAdditionalImages = Math.floor(seededRandom() * 4) + 1; // 1-4 additional images
  const galleryImages = [mainImage];
  
  // Add deterministic additional images based on seed
  for (let i = 0; i < numAdditionalImages; i++) {
    const randomIndex = Math.floor(seededRandom() * additionalImages.length);
    galleryImages.push(additionalImages[randomIndex]);
  }
  
  return galleryImages;
};

// Listings data mapping
const listingsData: { [key: string]: any } = {
  '1': {
    title: 'Secure Storage in Kwun Tong',
    location: 'Kwun Tong, Kowloon',
    price: 150,
    rating: 4.8,
    mainImage: storageIndoorRoom,
    features: ['24h Security', 'CCTV', 'Climate Control']
  },
  '2': {
    title: 'Central Storage Hub',
    location: 'Central, Hong Kong Island',
    price: 280,
    rating: 4.9,
    mainImage: storageOfficeSpace,
    features: ['Premium Location', 'Concierge', 'Parking']
  },
  '3': {
    title: 'Affordable Warehouse Space',
    location: 'Tsuen Wan, New Territories',
    price: 95,
    rating: 4.5,
    mainImage: storageWarehouseCorner,
    features: ['Large Space', 'Loading Dock', 'Affordable']
  },
  '4': {
    title: 'Premium Storage in Mong Kok',
    location: 'Mong Kok, Kowloon',
    price: 220,
    rating: 4.7,
    mainImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    features: ['Easy Access', 'Air Conditioning', 'Insurance']
  },
  '5': {
    title: 'Budget Storage in Sha Tin',
    location: 'Sha Tin, New Territories',
    price: 85,
    rating: 4.3,
    mainImage: storageGarageUnit,
    features: ['Budget Friendly', 'Vehicle Access', 'Clean']
  },
  '6': {
    title: 'Industrial Storage in Fo Tan',
    location: 'Fo Tan, New Territories',
    price: 120,
    rating: 4.4,
    mainImage: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop',
    features: ['High Ceiling', 'Forklift Access', 'Industrial']
  },
  '7': {
    title: 'Self Storage in Causeway Bay',
    location: 'Causeway Bay, Hong Kong Island',
    price: 320,
    rating: 4.8,
    mainImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    features: ['Prime Location', 'Modern Facility', 'Smart Locks']
  },
  '8': {
    title: 'Mini Storage in Tai Po',
    location: 'Tai Po, New Territories',
    price: 75,
    rating: 4.2,
    mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    features: ['Small Units', 'Flexible Terms', 'Economic']
  },
  '9': {
    title: 'Climate Storage in Admiralty',
    location: 'Admiralty, Hong Kong Island',
    price: 350,
    rating: 4.9,
    mainImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    features: ['Climate Control', 'Luxury Building', 'Concierge']
  },
  '10': {
    title: 'Container Storage in Yuen Long',
    location: 'Yuen Long, New Territories',
    price: 60,
    rating: 4.0,
    mainImage: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop',
    features: ['Container Units', 'Drive-up Access', 'Cheap']
  },
  '11': {
    title: 'Business Storage in Tsim Sha Tsui',
    location: 'Tsim Sha Tsui, Kowloon',
    price: 390,
    rating: 4.8,
    mainImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    features: ['Business Center', 'Meeting Rooms', 'Premium']
  },
  '12': {
    title: 'Family Storage in Tuen Mun',
    location: 'Tuen Mun, New Territories',
    price: 90,
    rating: 4.3,
    mainImage: storageResidentialRoom,
    features: ['Family Friendly', 'Wide Aisles', 'Safe']
  },
  '13': {
    title: 'Luxury Storage in Mid-Levels',
    location: 'Mid-Levels, Hong Kong Island',
    price: 450,
    rating: 5.0,
    mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    features: ['Luxury Service', 'White Glove', 'Valet']
  }
};

// Sample reviews with real profile photos
const sampleReviews = [
  {
    id: 1,
    user: 'Sarah Wong',
    avatar: profileWoman1,
    rating: 5,
    date: '2 weeks ago',
    comment: 'Perfect location and very clean facility. The host was very responsive and helpful throughout the entire process.',
    photos: [storageInteriorView]
  },
  {
    id: 2,
    user: 'Michael Chen',
    avatar: profileMan1,
    rating: 4,
    date: '1 month ago',
    comment: 'Great security features and easy access. The climate control works perfectly for my documents and electronics.',
    photos: []
  },
  {
    id: 3,
    user: 'Lisa Park',
    avatar: profileWoman2,
    rating: 5,
    date: '3 weeks ago',
    comment: 'Excellent value for money. The space is exactly as described and the booking process was seamless.',
    photos: [storageSecurityView]
  },
  {
    id: 4,
    user: 'David Liu',
    avatar: profileMan2,
    rating: 4,
    date: '2 months ago',
    comment: 'Professional service and modern facilities. Would definitely recommend to anyone looking for reliable storage.',
    photos: []
  }
];

const ListingDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('50 sq ft');
  const [selectedDuration, setSelectedDuration] = useState('monthly');
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Get current listing data
  const currentListing = listingsData[id || '1'];
  const galleryImages = generateGalleryImages(currentListing?.mainImage || storageIndoorRoom, id || '1');
  
  // Create mock listing object based on current data
  const mockListing = {
    id: id || '1',
    title: currentListing?.title || 'Storage Unit',
    images: galleryImages,
    pricePerSqFt: Math.round((currentListing?.price || 150) / 50),
    rating: currentListing?.rating || 4.8,
    reviewCount: Math.floor((parseInt(id || '1') * 17 + 47) % 150) + 50, // Deterministic review count
    badges: currentListing?.features || ['24/7 Access', 'Climate Controlled', 'CCTV Security'],
    host: {
      name: 'David Chen',
      avatar: profileMan1,
      verified: true,
      responseRate: 98,
      responseTime: '2 hours',
      joinedDate: 'Member since 2020'
    },
    details: {
      availableSizes: ['25 sq ft', '50 sq ft', '100 sq ft', '200 sq ft'],
      dimensions: '10ft × 10ft × 8ft (H)',
      floor: 'Ground Floor',
      accessHours: '24/7 Access',
      features: ['Climate Control', 'CCTV Monitoring', 'Staff on Site', 'Lift Access'],
      address: currentListing?.location || 'Hong Kong'
    },
    insurance: {
      coverage: 'HK$10M Liability Coverage',
      provider: 'SpaceLink Insurance'
    },
    reviews: sampleReviews.slice(0, ((parseInt(id || '1') + 1) % 3) + 2) // 2-4 deterministic reviews
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === mockListing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockListing.images.length - 1 : prev - 1
    );
  };

  const calculatePrice = () => {
    const sizeMultiplier = {
      '25 sq ft': 25,
      '50 sq ft': 50,
      '100 sq ft': 100,
      '200 sq ft': 200
    }[selectedSize] || 50;

    const durationMultiplier = {
      'weekly': 1.2,
      'monthly': 1,
      'yearly': 0.8
    }[selectedDuration] || 1;

    return Math.round(mockListing.pricePerSqFt * sizeMultiplier * durationMultiplier);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        {/* Header */}
        <header className="sticky top-0 z-40 glass-surface border-b border-glass-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Search</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="glass-surface">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="glass-surface">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden group">
                  <img 
                    src={mockListing.images[currentImageIndex]} 
                    alt="Storage unit"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  {/* Image Navigation */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 glass-surface w-10 h-10 rounded-full flex items-center justify-center hover:bg-glass-surface opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 glass-surface w-10 h-10 rounded-full flex items-center justify-center hover:bg-glass-surface opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {mockListing.badges.map((badge) => (
                      <Badge key={badge} className="glass-surface text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 glass-surface px-3 py-1 rounded-full text-xs">
                    {currentImageIndex + 1} / {mockListing.images.length}
                  </div>
                </div>

                {/* Image Thumbnails */}
                <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
                  {mockListing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-glass-border'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Title and Rating */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold gradient-text">{mockListing.title}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{mockListing.rating}</span>
                      <span className="text-muted-foreground">({mockListing.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{mockListing.details.address}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Host Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Hosted by {mockListing.host.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={mockListing.host.avatar} />
                        <AvatarFallback>{mockListing.host.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{mockListing.host.name}</span>
                          {mockListing.host.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>Response rate: {mockListing.host.responseRate}%</div>
                          <div>Response time: {mockListing.host.responseTime}</div>
                          <div className="col-span-2">{mockListing.host.joinedDate}</div>
                        </div>
                        <Button variant="outline" size="sm" className="glass-surface">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message Host
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Space Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Ruler className="w-5 h-5" />
                      <span>Space Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Dimensions</h4>
                        <p className="text-muted-foreground">{mockListing.details.dimensions}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Floor</h4>
                        <p className="text-muted-foreground">{mockListing.details.floor}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Access</h4>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{mockListing.details.accessHours}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">Features & Amenities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {mockListing.details.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AR Space Visualizer Entry */}
              <ARSpaceVisualizerEntry 
                listingTitle={mockListing.title}
                availableSizes={mockListing.details.availableSizes}
              />

              {/* Reviews Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Reviews ({mockListing.reviewCount})</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{mockListing.rating}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {mockListing.reviews.slice(0, showAllReviews ? undefined : 2).map((review) => (
                      <div key={review.id} className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">{review.user}</span>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                            {review.photos.length > 0 && (
                              <div className="flex space-x-2">
                                {review.photos.map((photo, index) => (
                                  <img 
                                    key={index}
                                    src={photo} 
                                    alt="Review photo"
                                    className="w-20 h-20 rounded-lg object-cover"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        {review.id !== mockListing.reviews[mockListing.reviews.length - 1].id && (
                          <Separator />
                        )}
                      </div>
                    ))}
                    
                    {mockListing.reviews.length > 2 && (
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="w-full glass-surface"
                      >
                        {showAllReviews ? 'Show Less' : `Show All ${mockListing.reviewCount} Reviews`}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Booking Card - Sticky */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24"
              >
                <Card className="glass-card border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                    <CardTitle className="text-center">
                      <span className="text-2xl font-bold">HK${calculatePrice()}</span>
                      <span className="text-sm text-muted-foreground ml-2">/ {selectedDuration}</span>
                    </CardTitle>
                    <p className="text-center text-xs text-muted-foreground">
                      Best price today • AI-optimized
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Size</label>
                        <Select value={selectedSize} onValueChange={setSelectedSize}>
                          <SelectTrigger className="glass-surface">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {mockListing.details.availableSizes.map((size) => (
                              <SelectItem key={size} value={size}>{size}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Duration</label>
                        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                          <SelectTrigger className="glass-surface">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly (20% off)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Base price ({selectedSize})</span>
                        <span>HK${Math.round(mockListing.pricePerSqFt * parseInt(selectedSize))}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Duration discount</span>
                        <span>
                          {selectedDuration === 'yearly' ? '-20%' : 
                           selectedDuration === 'weekly' ? '+20%' : '0%'}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>HK${calculatePrice()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold">
                        Reserve Now
                      </Button>
                      <Button variant="outline" size="lg" className="w-full glass-surface">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Host
                      </Button>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>{mockListing.insurance.coverage}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Insurance Add-on */}
                <Card className="glass-card border-0 mt-4">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="insurance" className="rounded" />
                      <div className="flex-1">
                        <label htmlFor="insurance" className="text-sm font-medium cursor-pointer">
                          Add Premium Insurance
                        </label>
                        <p className="text-xs text-muted-foreground">
                          HK$50/month • Full contents coverage
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Similar Spaces */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">Similar Spaces Nearby</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="glass-card border-0 hover-scale cursor-pointer">
                  <div className="aspect-[16/10] rounded-t-lg overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Similar space"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">HK$1,200/month</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.6</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">50 sq ft • Wan Chai</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        <Chatbot />
      </div>
    </LanguageProvider>
  );
};

export default ListingDetails;