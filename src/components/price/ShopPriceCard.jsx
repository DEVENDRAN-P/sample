import React from 'react';
import { Star, MapPin } from 'lucide-react';

export default function ShopPriceCard({ shop, price, product, distance, onClick }) {
    // Format price to 2 decimal places
    const formattedPrice = parseFloat(price).toFixed(2);

    return (
        <button
            onClick={onClick}
            className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-emerald-200 transition-all p-4 text-left w-full"
        >
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-semibold text-slate-900">{shop}</h3>
                    <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-slate-600">4.5</span>
                    </div>
                </div>
                <span className="text-2xl font-bold text-emerald-600">₹{formattedPrice}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4" />
                <span>{distance || '500m away'}</span>
            </div>
        </button>
    );
}
