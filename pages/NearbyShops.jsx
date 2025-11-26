import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Star, BadgeCheck, Navigation, Phone, Clock, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categoryLabels = {
  grocery: 'Grocery Store',
  vegetables: 'Vegetable Market',
  supermarket: 'Supermarket',
  wholesale: 'Wholesale',
  general_store: 'General Store'
};

export default function NearbyShops() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }
      );
    }
  }, []);

  const { data: shops = [], isLoading } = useQuery({
    queryKey: ['shops'],
    queryFn: () => base44.entities.Shop.list('-rating', 50)
  });

  // Add mock distance for demo
  const enrichedShops = shops.map((shop, index) => ({
    ...shop,
    distance: `${(0.3 + index * 0.4).toFixed(1)} km`,
    travelTime: `${3 + index * 2} min walk`
  }));

  const handleNavigate = (shop) => {
    if (shop.latitude && shop.longitude) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Nearby Shops</h1>
            <p className="text-sm text-slate-500">Find stores around you</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
            <p className="text-emerald-700 font-medium">Map View</p>
            <p className="text-sm text-emerald-600">
              {enrichedShops.length} shops nearby
            </p>
          </div>
        </div>
      </div>

      {/* Shop List */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          All Shops ({enrichedShops.length})
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : enrichedShops.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">No shops found nearby</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enrichedShops.map((shop) => (
              <Card key={shop.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Shop Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                      {shop.image_url ? (
                        <img 
                          src={shop.image_url} 
                          alt={shop.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <MapPin className="w-8 h-8 text-emerald-500" />
                      )}
                    </div>
                    
                    {/* Shop Info */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-800">{shop.name}</h3>
                            {shop.is_verified && (
                              <BadgeCheck className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {categoryLabels[shop.category] || shop.category}
                          </Badge>
                        </div>
                        
                        {shop.rating > 0 && (
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-medium text-amber-700">
                              {shop.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {shop.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {shop.travelTime}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm"
                          onClick={() => handleNavigate(shop)}
                          className="bg-emerald-500 hover:bg-emerald-600 rounded-lg text-xs"
                        >
                          <Navigation className="w-3 h-3 mr-1" />
                          Navigate
                        </Button>
                        {shop.phone && (
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`tel:${shop.phone}`)}
                            className="rounded-lg text-xs"
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}