import React from 'react';
import { MapPin, Clock, BadgeCheck, AlertTriangle, Sparkles, Navigation } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ShopPriceCard({ 
  shopName, 
  price, 
  unit,
  distance, 
  travelTime, 
  stockStatus, 
  isVerified,
  isOffer,
  offerText,
  isCheapest,
  onNavigate 
}) {
  const stockConfig = {
    in_stock: { label: 'In Stock', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    low_stock: { label: 'Low Stock', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertTriangle },
    out_of_stock: { label: 'Out of Stock', color: 'bg-red-50 text-red-700 border-red-200' }
  };

  const stock = stockConfig[stockStatus] || stockConfig.in_stock;

  return (
    <div className={`relative bg-white rounded-2xl border-2 transition-all hover:shadow-lg ${isCheapest ? 'border-emerald-400 shadow-emerald-100' : 'border-slate-100'}`}>
      {isCheapest && (
        <div className="absolute -top-3 left-4">
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg shadow-emerald-500/25 px-3 py-1">
            <Sparkles className="w-3 h-3 mr-1" /> Best Price
          </Badge>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-lg">{shopName}</h3>
              {isVerified && (
                <BadgeCheck className="w-5 h-5 text-emerald-500" />
              )}
            </div>
            
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {travelTime}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-2xl font-bold ${isCheapest ? 'text-emerald-600' : 'text-slate-800'}`}>
              ₹{price}
              <span className="text-sm font-normal text-slate-500">/{unit}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={stock.color}>
              {stock.icon && <stock.icon className="w-3 h-3 mr-1" />}
              {stock.label}
            </Badge>
            {isOffer && (
              <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                🔥 {offerText || 'Special Offer'}
              </Badge>
            )}
          </div>
          
          <Button 
            onClick={onNavigate}
            size="sm"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Navigate
          </Button>
        </div>
      </div>
    </div>
  );
}