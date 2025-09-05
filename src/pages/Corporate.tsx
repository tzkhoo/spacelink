import React, { useState } from 'react';
import { ArrowLeft, Building2, Upload, BarChart3, Settings, Users, Package, ShoppingCart, Truck, Database, Zap, Globe, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Corporate = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<string>('');
  
  const integrations = [
    {
      id: 'shopify',
      name: 'Shopify',
      icon: ShoppingCart,
      description: 'Connect your Shopify store for automated inventory management',
      status: 'Available',
      features: ['Auto-sync products', 'Order fulfillment', 'Inventory tracking']
    },
    {
      id: 'hktvmall',
      name: 'HKTVmall',
      icon: Globe,
      description: 'Hong Kong\'s leading e-commerce platform integration',
      status: 'Available',
      features: ['Product listing sync', 'Order management', 'Local fulfillment']
    },
    {
      id: 'logistics',
      name: 'Logistics Partners',
      icon: Truck,
      description: 'Connect with DHL, FedEx, and local courier services',
      status: 'Coming Soon',
      features: ['Shipping automation', 'Tracking integration', 'Rate optimization']
    }
  ];

  const bulkBookings = [
    { id: 'BB-001', company: 'Tech Innovations Ltd', units: 15, value: 'HK$45,000', status: 'Active', date: '2024-01-15' },
    { id: 'BB-002', company: 'Fashion Forward HK', units: 8, value: 'HK$24,000', status: 'Pending', date: '2024-01-20' },
    { id: 'BB-003', company: 'E-commerce Solutions', units: 22, value: 'HK$66,000', status: 'Active', date: '2024-01-25' }
  ];

  const apiMetrics = [
    { endpoint: '/api/v1/bookings', calls: '12.5K', success: '99.8%', avg: '145ms' },
    { endpoint: '/api/v1/inventory', calls: '8.3K', success: '99.9%', avg: '89ms' },
    { endpoint: '/api/v1/fulfillment', calls: '5.2K', success: '99.5%', avg: '234ms' },
    { endpoint: '/api/v1/analytics', calls: '3.1K', success: '100%', avg: '67ms' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Coming Soon': return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-3xl font-bold gradient-text">Corporate Portal</h1>
              <p className="text-muted-foreground">Enterprise-grade storage management & API integrations</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center space-x-2 text-sm">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="font-medium">Enterprise Plan</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="glass-card border-0 p-1 mb-8 w-full md:w-auto">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="bulk-booking" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Bulk Booking</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>API & Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Units</p>
                      <p className="text-3xl font-bold">245</p>
                    </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mt-2">
                    <Badge className="bg-green-100 text-green-800">+12% this month</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="text-3xl font-bold">HK$145K</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mt-2">
                    <Badge className="bg-green-100 text-green-800">+8% vs last month</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Clients</p>
                      <p className="text-3xl font-bold">47</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mt-2">
                    <Badge className="bg-blue-100 text-blue-800">3 new this week</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Utilization</p>
                      <p className="text-3xl font-bold">87%</p>
                    </div>
                    <Settings className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mt-2">
                    <Progress value={87} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Recent Corporate Bookings</CardTitle>
                <CardDescription>Latest enterprise storage reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bulkBookings.map((booking) => (
                    <div key={booking.id} className="glass-surface p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{booking.company}</p>
                          <p className="text-sm text-muted-foreground">{booking.units} units • {booking.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{booking.value}</p>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk-booking" className="space-y-6">
            {/* CSV Upload */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  <span>Bulk Storage Management</span>
                </CardTitle>
                <CardDescription>Upload CSV files for bulk operations and SKU-level tagging</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                      <h4 className="font-medium mb-2">Upload Inventory CSV</h4>
                      <p className="text-sm text-muted-foreground mb-3">Drag and drop your CSV file here</p>
                      <Button variant="outline">Choose File</Button>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>CSV Template Options</Label>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          Download Inventory Template
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          Download Booking Template
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="warehouse">Select Warehouse</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose warehouse location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kwun-tong">Kwun Tong Facility</SelectItem>
                          <SelectItem value="tsuen-wan">Tsuen Wan Warehouse</SelectItem>
                          <SelectItem value="sha-tin">Sha Tin Storage Center</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="batch-name">Batch Name</Label>
                      <Input id="batch-name" placeholder="e.g., Q1 2024 Inventory" />
                    </div>
                    
                    <div>
                      <Label htmlFor="priority">Processing Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High - 24h processing</SelectItem>
                          <SelectItem value="normal">Normal - 48h processing</SelectItem>
                          <SelectItem value="low">Low - 72h processing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full mt-4">Process Bulk Upload</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SKU Management */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>SKU-Level Management</CardTitle>
                <CardDescription>Advanced tagging and categorization for enterprise inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Storage Unit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono">SKU-001-A</TableCell>
                        <TableCell>Premium Electronics Set</TableCell>
                        <TableCell><Badge variant="outline">Electronics</Badge></TableCell>
                        <TableCell>KT-B-025</TableCell>
                        <TableCell><Badge className="bg-green-100 text-green-800">In Stock</Badge></TableCell>
                        <TableCell>HK$12,500</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono">SKU-002-B</TableCell>
                        <TableCell>Fashion Collection 2024</TableCell>
                        <TableCell><Badge variant="outline">Apparel</Badge></TableCell>
                        <TableCell>TW-C-014</TableCell>
                        <TableCell><Badge className="bg-blue-100 text-blue-800">Reserved</Badge></TableCell>
                        <TableCell>HK$8,750</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono">SKU-003-C</TableCell>
                        <TableCell>Luxury Home Decor</TableCell>
                        <TableCell><Badge variant="outline">Home & Garden</Badge></TableCell>
                        <TableCell>ST-A-009</TableCell>
                        <TableCell><Badge className="bg-green-100 text-green-800">In Stock</Badge></TableCell>
                        <TableCell>HK$15,200</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            {/* Available Integrations */}
            <div className="grid md:grid-cols-3 gap-6">
              {integrations.map((integration) => {
                const IconComponent = integration.icon;
                return (
                  <Card key={integration.id} className={`glass-card border-0 transition-all duration-300 hover:scale-105 cursor-pointer ${selectedIntegration === integration.id ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedIntegration(integration.id)}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                        </div>
                        <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
                      </div>
                      <CardDescription>{integration.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {integration.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={integration.status === 'Available' ? 'default' : 'outline'} disabled={integration.status === 'Coming Soon'}>
                        {integration.status === 'Available' ? 'Connect Now' : 'Coming Soon'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* API Documentation */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>API Performance Metrics</span>
                </CardTitle>
                <CardDescription>Real-time API usage and performance statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Total Calls</TableHead>
                        <TableHead>Success Rate</TableHead>
                        <TableHead>Avg Response Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiMetrics.map((metric, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono">{metric.endpoint}</TableCell>
                          <TableCell>{metric.calls}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{metric.success}</span>
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                            </div>
                          </TableCell>
                          <TableCell>{metric.avg}</TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-800">Healthy</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* API Keys Management */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>API Keys & Authentication</CardTitle>
                <CardDescription>Manage your API keys and webhook endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="glass-surface p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Production API Key</h4>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm flex-1">sk_prod_••••••••••••••••••••••••••••••••</code>
                      <Button variant="outline" size="sm">Copy</Button>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                  </div>
                  
                  <div className="glass-surface p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Webhook Endpoint</h4>
                      <Badge className="bg-blue-100 text-blue-800">Configured</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input value="https://your-domain.com/webhooks/storage" className="flex-1" />
                      <Button variant="outline" size="sm">Test</Button>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Usage Analytics */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Storage Utilization Trends</CardTitle>
                  <CardDescription>Monthly storage usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive analytics chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Revenue breakdown by service type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="glass-surface p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Standard Storage</span>
                        <span className="font-medium">HK$89,500</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="glass-surface p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Climate Controlled</span>
                        <span className="font-medium">HK$34,200</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="glass-surface p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Premium Security</span>
                        <span className="font-medium">HK$21,300</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export Options */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Data Export & Reporting</CardTitle>
                <CardDescription>Generate custom reports and export data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <FileSpreadsheet className="h-6 w-6" />
                    <span>Export to Excel</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Database className="h-6 w-6" />
                    <span>Generate Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <BarChart3 className="h-6 w-6" />
                    <span>Analytics Dashboard</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Corporate;