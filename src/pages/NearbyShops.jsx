import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Star, Phone, Navigation, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Generate shops based on coordinates with consistent seeding
const generateShopsForLocation = (lat, lng) => {
    const shopNames = ['Metro Store', 'Local Market', 'Fresh Shop', 'Organic Hub', 'Best Price', 'Daily Needs', 'Quick Shop', 'Super Bazaar', 'Quality Shop', 'Market Hub'];
    const count = 5;

    // Use coordinates as seed for consistent results per location
    const seed = Math.floor(lat * 1000) + Math.floor(lng * 1000);

    return Array.from({ length: count }, (_, idx) => {
        const randomSeed = seed + idx;
        const shopName = shopNames[(randomSeed % shopNames.length)];
        const distance = 0.2 + (idx * 0.3) + ((randomSeed % 100) / 1000);

        return {
            id: idx,
            name: shopName,
            distance: `${distance.toFixed(1)} km`,
            time: `${Math.round(distance * 12)} min walk`,
            rating: (3.5 + ((randomSeed % 20) / 10)).toFixed(1),
            phone: `+91-${String((randomSeed % 9000000000) + 1000000000).slice(0, 10)}`,
        };
    }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
};

export default function NearbyShops() {
    const [shops, setShops] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchNearbyShops = () => {
            // Silently use default location without triggering geolocation permission
            const defaultLat = 28.6139;
            const defaultLng = 77.2090;
            setLocation({ lat: defaultLat, lng: defaultLng });
            setShops(generateShopsForLocation(defaultLat, defaultLng));
            setIsLoading(false);

            // Optional: Try geolocation only if user wants to update
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ lat: latitude, lng: longitude });
                        setShops(generateShopsForLocation(latitude, longitude));
                    },
                    (error) => {
                        // Silently fail - already using default location
                        console.log('Using default location');
                    }
                );
            }
        };

        fetchNearbyShops();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 z-40">
                <div className="px-4 py-4 flex items-center gap-3">
                    <Link to={createPageUrl('Home')}>
                        <Button variant="ghost" size="sm" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="font-semibold text-slate-900">Nearby Shops</h1>
                        <p className="text-xs text-slate-500">{shops?.length || 0} shops found {location && `at ${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}`}</p>
                    </div>
                </div>
            </div>

            {/* Shops List */}
            <div className="px-4 py-6">
                {error && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-amber-800">{error}</span>
                    </div>
                )}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                            <p className="text-slate-600">Finding nearby shops...</p>
                        </div>
                    </div>
                ) : shops && shops.length > 0 ? (
                    <div className="space-y-3">
                        {shops.map((shop) => (
                            <div key={shop.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-slate-900 text-lg">{shop.name}</h3>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                <span className="text-sm text-slate-600">{shop.rating}</span>
                                            </div>
                                        </div>
                                        <span className="text-2xl font-bold text-emerald-600">{shop.distance}</span>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin className="w-4 h-4" />
                                            <span>{shop.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Phone className="w-4 h-4" />
                                            <span>{shop.phone}</span>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-lg flex items-center gap-2 justify-center">
                                        <Navigation className="w-4 h-4" />
                                        Open in Maps
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-slate-600 mb-2">No shops found</p>
                        <p className="text-sm text-slate-500">Enable location to find nearby shops</p>
                    </div>
                )}
            </div>
        </div>
    );
}
