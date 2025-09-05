import React from 'react';
import { Clock, Package, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function MyRentals() {
  const activeRentals = [
    {
      id: '1',
      title: 'Secure Storage in Kwun Tong',
      location: 'Kwun Tong, Kowloon',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      price: 150,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    }
  ];

  const pastRentals = [
    {
      id: '2',
      title: 'Central Storage Hub',
      location: 'Central, Hong Kong Island',
      startDate: '2023-10-01',
      endDate: '2023-12-31',
      price: 280,
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-20">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold gradient-text mb-2">My Rentals</h1>
          <p className="text-muted-foreground">Track your storage bookings</p>
        </div>

        {/* Active Rentals */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Active Rentals
          </h2>
          {activeRentals.length > 0 ? (
            <div className="space-y-4">
              {activeRentals.map((rental) => (
                <Card key={rental.id} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={rental.image} 
                        alt={rental.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{rental.title}</h3>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {rental.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          {rental.startDate} - {rental.endDate}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">HK${rental.price}/day</span>
                          <Button size="sm">Manage</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-card text-center p-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Active Rentals</h3>
              <p className="text-muted-foreground">You don't have any active storage rentals</p>
            </Card>
          )}
        </div>

        {/* Past Rentals */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            Past Rentals
          </h2>
          {pastRentals.length > 0 ? (
            <div className="space-y-4">
              {pastRentals.map((rental) => (
                <Card key={rental.id} className="glass-card opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={rental.image} 
                        alt={rental.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{rental.title}</h3>
                          <Badge variant="secondary">Completed</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {rental.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          {rental.startDate} - {rental.endDate}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-muted-foreground">HK${rental.price}/day</span>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-card text-center p-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Past Rentals</h3>
              <p className="text-muted-foreground">Your rental history will appear here</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}