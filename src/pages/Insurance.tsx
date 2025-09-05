import React, { useState } from 'react';
import { ArrowLeft, Shield, FileText, Clock, CheckCircle, Upload, Camera, AlertCircle, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const Insurance = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const insurancePlans = [
    {
      id: 'basic',
      name: 'Basic Protection',
      price: 'HK$299/month',
      coverage: 'Up to HK$50,000',
      features: ['Fire & Theft Protection', 'Natural Disaster Coverage', '48h Claim Processing', 'Online Support']
    },
    {
      id: 'premium',
      name: 'Premium Shield',
      price: 'HK$599/month',
      coverage: 'Up to HK$150,000',
      features: ['All-Risk Coverage', 'Third-Party Liability', '24h Claim Processing', 'Dedicated Agent', 'Global Coverage']
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plus',
      price: 'Custom Pricing',
      coverage: 'Unlimited',
      features: ['Full Risk Assessment', 'Custom Policy Terms', '12h Claim Processing', 'Priority Support', 'Regulatory Compliance']
    }
  ];

  const recentClaims = [
    { id: '2024-001', type: 'Water Damage', amount: 'HK$12,500', status: 'Approved', date: '2024-01-15' },
    { id: '2024-002', type: 'Theft', amount: 'HK$8,750', status: 'Processing', date: '2024-01-20' },
    { id: '2024-003', type: 'Fire Damage', amount: 'HK$25,000', status: 'Under Review', date: '2024-01-25' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background-gradient-start))] to-[hsl(var(--background-gradient-end))]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-primary hover:text-primary/80 transition-smooth">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Insurance Portal</h1>
              <p className="text-muted-foreground">Comprehensive storage protection & claims management</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="font-medium">Coverage Active</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="coverage" className="w-full">
          <TabsList className="glass-card border-0 p-1 mb-8 w-full md:w-auto">
            <TabsTrigger value="coverage" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Coverage Plans</span>
            </TabsTrigger>
            <TabsTrigger value="claims" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Claims</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coverage" className="space-y-8">
            {/* Coverage Plans */}
            <div className="grid md:grid-cols-3 gap-6">
              {insurancePlans.map((plan) => (
                <Card key={plan.id} className={`glass-card border-0 transition-all duration-300 hover:scale-105 cursor-pointer ${selectedPlan === plan.id ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedPlan(plan.id)}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {plan.name}
                      {plan.id === 'premium' && <Badge className="bg-secondary text-secondary-foreground">Popular</Badge>}
                    </CardTitle>
                    <CardDescription>{plan.coverage} coverage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary mb-4">{plan.price}</div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant={selectedPlan === plan.id ? "default" : "outline"}>
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Risk Assessment */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>AI Risk Assessment</span>
                </CardTitle>
                <CardDescription>Smart analysis of your storage risks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Location Risk Score</Label>
                      <div className="mt-2">
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Medium Risk - Urban Area</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Storage Type Risk</Label>
                      <div className="mt-2">
                        <Progress value={45} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Low Risk - Climate Controlled</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Value Assessment</Label>
                      <div className="mt-2">
                        <Progress value={85} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">High Value - Premium Coverage Recommended</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-surface p-4 rounded-xl">
                    <h4 className="font-semibold mb-3">Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Consider Premium Shield for high-value items</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Third-party liability coverage recommended</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Enhanced security monitoring available</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="claims" className="space-y-6">
            {/* New Claim Form */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>File New Claim</span>
                </CardTitle>
                <CardDescription>Average processing time: 24-72 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="claim-type">Claim Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select claim type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fire">Fire Damage</SelectItem>
                          <SelectItem value="water">Water Damage</SelectItem>
                          <SelectItem value="theft">Theft</SelectItem>
                          <SelectItem value="natural">Natural Disaster</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="estimated-value">Estimated Loss Value (HK$)</Label>
                      <Input id="estimated-value" placeholder="0.00" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="incident-date">Incident Date</Label>
                      <Input id="incident-date" type="date" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Please describe the incident in detail..." className="min-h-[120px]" />
                    </div>
                    <Button className="w-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Photos & Documents
                    </Button>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <Button className="w-full" size="lg">Submit Claim</Button>
                </div>
              </CardContent>
            </Card>

            {/* Claims History */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Recent Claims</CardTitle>
                <CardDescription>Track your claim status and history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClaims.map((claim) => (
                    <div key={claim.id} className="glass-surface p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{claim.type}</p>
                          <p className="text-sm text-muted-foreground">Claim #{claim.id} • {claim.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{claim.amount}</p>
                        <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Document Upload */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Digital Document Vault</span>
                </CardTitle>
                <CardDescription>Secure storage for all your insurance documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                  <p className="text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
                  <Button variant="outline">Choose Files</Button>
                </div>
                
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Uploaded Documents</h4>
                  {['Policy Certificate.pdf', 'Inventory List.xlsx', 'Property Photos.zip'].map((doc, index) => (
                    <div key={index} className="glass-surface p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-medium">{doc}</span>
                      </div>
                      <Badge variant="outline">Verified</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Broker Integration */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Insurance Broker Network</CardTitle>
                <CardDescription>Connect with certified insurance brokers in Hong Kong</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Pacific Insurance Brokers', rating: 4.9, speciality: 'Commercial Storage', response: '< 2 hours' },
                    { name: 'Asia Risk Management', rating: 4.8, speciality: 'High-Value Assets', response: '< 4 hours' }
                  ].map((broker, index) => (
                    <div key={index} className="glass-surface p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{broker.name}</h4>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{broker.rating}</span>
                          <div className="text-yellow-500">★</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Speciality: {broker.speciality}</p>
                      <p className="text-sm text-muted-foreground mb-3">Response time: {broker.response}</p>
                      <Button variant="outline" size="sm" className="w-full">Connect Now</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Insurance;