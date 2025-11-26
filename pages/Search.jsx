import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, MapPin, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SearchBar from '@/components/search/SearchBar';
import ShopPriceCard from '@/components/price/ShopPriceCard';
import CategoryPill from '@/components/common/CategoryPill';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const categories = ['vegetables', 'fruits', 'dairy', 'grains', 'spices', 'oils', 'beverages', 'snacks'];

export default function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialCategory = urlParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [maxDistance, setMaxDistance] = useState([3]);
  const [sortBy, setSortBy] = useState('price');

  const { data: prices = [], isLoading } = useQuery({
    queryKey: ['prices', searchQuery, activeCategory],
    queryFn: async () => {
      if (!searchQuery && !activeCategory) return [];
      
      const allPrices = await base44.entities.Price.list('-updated_date', 50);
      
      let filtered = allPrices;
      if (searchQuery) {
        filtered = filtered.filter(p => 
          p.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      return filtered;
    },
    enabled: !!(searchQuery || activeCategory)
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products', activeCategory],
    queryFn: async () => {
      if (!activeCategory) return [];
      return base44.entities.Product.filter({ category: activeCategory });
    },
    enabled: !!activeCategory
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveCategory('');
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? '' : category);
    setSearchQuery('');
  };

  // Add mock distance/time for demo
  const enrichedPrices = prices.map((price, index) => ({
    ...price,
    distance: `${(0.5 + index * 0.3).toFixed(1)} km`,
    travelTime: `${5 + index * 3} min`,
    isCheapest: index === 0
  })).sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link to={createPageUrl('Home')}>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <SearchBar 
                onSearch={handleSearch}
                placeholder={searchQuery || "Search products..."}
              />
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <CategoryPill 
                key={category} 
                category={category}
                isActive={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="px-4 py-3 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4 text-emerald-500" />
          Within {maxDistance[0]} km
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Results</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div>
                <Label className="text-sm font-medium">Max Distance: {maxDistance[0]} km</Label>
                <Slider
                  value={maxDistance}
                  onValueChange={setMaxDistance}
                  max={10}
                  min={1}
                  step={0.5}
                  className="mt-3"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-3 block">Sort By</Label>
                <RadioGroup value={sortBy} onValueChange={setSortBy}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price" id="price" />
                    <Label htmlFor="price">Lowest Price</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="distance" id="distance" />
                    <Label htmlFor="distance">Nearest First</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : !searchQuery && !activeCategory ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">Search for a product or select a category</p>
          </div>
        ) : enrichedPrices.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">No prices found for "{searchQuery || activeCategory}"</p>
            <p className="text-sm text-slate-400 mt-1">Be the first to add a price!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              {enrichedPrices.length} result{enrichedPrices.length !== 1 ? 's' : ''} found
            </p>
            {enrichedPrices.map((price) => (
              <ShopPriceCard
                key={price.id}
                shopName={price.shop_name || 'Local Shop'}
                price={price.price}
                unit={price.unit || 'kg'}
                distance={price.distance}
                travelTime={price.travelTime}
                stockStatus={price.stock_status}
                isVerified={price.is_verified}
                isOffer={price.is_offer}
                offerText={price.offer_text}
                isCheapest={price.isCheapest}
                onNavigate={() => {
                  // Would open maps navigation
                  window.open(`https://www.google.com/maps/search/?api=1&query=shop+near+me`, '_blank');
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}