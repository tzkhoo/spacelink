import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Upload, MapPin, DollarSign, Camera, Eye } from 'lucide-react';

export const SpaceHostsInterface = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublished, setIsPublished] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    size: '',
    pricePerDay: '',
    photos: []
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPublished(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isPublished) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Dashboard */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            {t('hosts.dashboard.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Space Overview */}
            <Card className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Your Listed Space</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground">{formData.location || 'Kwun Tong, Hong Kong'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-secondary" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground">HK${formData.pricePerDay || '150'}/day</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground">42 views today</span>
                </div>
              </div>
            </Card>

            {/* Requests */}
            <Card className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">{t('hosts.dashboard.requests')}</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                    <div>
                      <div className="font-medium text-sm">Storage Request #{i + 1}</div>
                      <div className="text-xs text-muted-foreground">2-3 weeks duration</div>
                    </div>
                    <Button size="sm" className="rounded-lg">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass-card rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 gradient-text">{t('hosts.title')}</h2>
          <p className="text-muted-foreground">{t('hosts.subtitle')}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step <= currentStep 
                  ? 'bg-primary text-white' 
                  : 'bg-white/20 text-muted-foreground'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`h-0.5 w-16 mx-4 transition-all ${
                  step < currentStep ? 'bg-primary' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{t('hosts.step1.title')}</h3>
                <p className="text-muted-foreground text-sm">{t('hosts.step1.desc')}</p>
              </div>
              
              <div className="space-y-4">
                <Input 
                  placeholder="Storage space title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="glass-surface border-glass-border rounded-2xl"
                />
                <Textarea 
                  placeholder="Describe your storage space, access hours, and any special features..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="glass-surface border-glass-border rounded-2xl min-h-[120px]"
                />
                <Input 
                  placeholder="Location (e.g., Kwun Tong, Hong Kong)"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="glass-surface border-glass-border rounded-2xl"
                />
                <Input 
                  placeholder="Size (sq ft)"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="glass-surface border-glass-border rounded-2xl"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{t('hosts.step2.title')}</h3>
                <p className="text-muted-foreground text-sm">{t('hosts.step2.desc')}</p>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  <Input 
                    placeholder="Daily rate (HKD)"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
                    className="glass-surface border-glass-border rounded-2xl pl-10"
                  />
                </div>
                
                {/* Price suggestion cards */}
                <div className="grid grid-cols-3 gap-3">
                  {['120', '150', '200'].map((price) => (
                    <button
                      key={price}
                      onClick={() => setFormData({...formData, pricePerDay: price})}
                      className="glass-card p-4 rounded-xl transition-spring hover:scale-105 hover:bg-primary/10"
                    >
                      <div className="text-lg font-semibold">HK${price}</div>
                      <div className="text-xs text-muted-foreground">per day</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{t('hosts.step3.title')}</h3>
                <p className="text-muted-foreground text-sm">{t('hosts.step3.desc')}</p>
              </div>
              
              <div className="space-y-4">
                {/* Photo upload area */}
                <div className="glass-card border-2 border-dashed border-glass-border rounded-2xl p-8 text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" strokeWidth={1.5} />
                  <h4 className="font-medium mb-2">Upload Photos</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add up to 10 photos of your storage space
                  </p>
                  <Button className="rounded-xl">
                    <Upload className="h-4 w-4 mr-2" strokeWidth={1.5} />
                    Choose Photos
                  </Button>
                </div>
                
                {/* Photo grid placeholder */}
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square glass-card rounded-xl flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 1}
            className="glass-card border-glass-border rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" strokeWidth={1.5} />
            {t('common.back')}
          </Button>
          
          <Button 
            onClick={handleNext}
            className="bg-primary hover:bg-primary/90 rounded-xl"
          >
            {currentStep === 3 ? t('common.publish') : t('common.next')}
            {currentStep < 3 && <ArrowRight className="h-4 w-4 ml-2" strokeWidth={1.5} />}
          </Button>
        </div>
      </div>
    </div>
  );
};