import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useUser } from '@/context/UserContext';
import SearchBar from '@/components/search/SearchBar';
import ShopPriceCard from '@/components/price/ShopPriceCard';
import CategoryPill from '@/components/common/CategoryPill';

const categories = ['vegetables', 'fruits', 'dairy', 'grains', 'spices', 'oils', 'beverages', 'snacks'];

// Generate consistent prices based on query hash for same search
const generatePricesForQuery = (query, category) => {
    if (!query && !category) return [];

    const shops = ['Metro Store', 'Local Market', 'Fresh Shop', 'Organic Hub', 'Best Price'];

    // Generate consistent base price based on query
    const queryHash = (query || category).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seededRandom = (seed) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    const basePrice = Math.floor(seededRandom(queryHash) * 50) + 20;

    return shops.map((shop, idx) => ({
        shop,
        price: Math.round((basePrice + (seededRandom(queryHash + idx) * 20 - 10)) * 100) / 100,
        product: `${query || category} (1kg)`,
        distance: `${(0.3 + idx * 0.4).toFixed(1)}km`,
    })).sort((a, b) => a.price - b.price);
};

export default function Search() {
    const navigate = useNavigate();
    const { addSearch } = useUser();
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q') || '';
    const initialCategory = urlParams.get('category') || '';

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [prices, setPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Update results when query or category changes
    useEffect(() => {
        if (searchQuery || activeCategory) {
            setIsLoading(true);
            // Add to search history
            if (searchQuery) addSearch(searchQuery);
            if (activeCategory) addSearch(activeCategory);

            // Simulate API call delay
            const timer = setTimeout(() => {
                setPrices(generatePricesForQuery(searchQuery, activeCategory));
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setPrices([]);
        }
    }, [searchQuery, activeCategory]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        navigate(`${createPageUrl('Search')}?q=${encodeURIComponent(query)}`);
    };

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
                    <div className="flex-1">
                        <h1 className="font-semibold text-slate-900">Search Results</h1>
                        <p className="text-xs text-slate-500">{prices.length} results found</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="px-4 pb-4">
                    <SearchBar onSearch={handleSearch} placeholder={searchQuery || 'Search...'} isSmall={true} />
                </div>
            </div>

            {/* Categories Filter */}
            <div className="px-4 py-4">
                <div className="flex gap-2 overflow-x-auto">
                    {categories.map((category) => (
                        <CategoryPill
                            key={category}
                            category={category}
                            isActive={activeCategory === category}
                            onClick={() => setActiveCategory(activeCategory === category ? '' : category)}
                        />
                    ))}
                </div>
            </div>

            {/* Results */}
            <div className="px-4 py-6">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                            <p className="text-slate-600">Loading prices...</p>
                        </div>
                    </div>
                ) : prices.length > 0 ? (
                    <div className="space-y-3">
                        {prices.map((item, idx) => (
                            <ShopPriceCard key={idx} {...item} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-slate-600 mb-2">No results yet</p>
                        <p className="text-sm text-slate-500">Try searching for a product or select a category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
