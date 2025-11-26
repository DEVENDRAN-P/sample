import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import SearchBar from '@/components/search/SearchBar';
import TrendingItem from '@/components/search/TrendingItem';
import CategoryPill from '@/components/common/CategoryPill';
import RewardsCard from '@/components/rewards/RewardsCard';
import SavingsCard from '@/components/stats/SavingsCard';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const categories = ['vegetables', 'fruits', 'dairy', 'grains', 'spices', 'oils', 'beverages', 'snacks'];

// Generate trending items dynamically
const generateTrendingItems = () => {
    const items = ['Onion', 'Tomato', 'Potato', 'Milk', 'Oil', 'Rice', 'Eggs', 'Bread'];
    return items.slice(0, 4).map((name) => ({
        name,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        priceChange: Math.floor(Math.random() * 25) - 12,
    }));
};

// Generate user data with search count for points
const generateUserData = (searchCount) => {
    return {
        points: Math.floor(searchCount * 10) + 100,
        streak: Math.floor(searchCount / 5) + 1,
        nextReward: `₹${Math.floor((searchCount % 10) * 5) + 50} Cashback`,
    };
};

export default function Home() {
    const navigate = useNavigate();
    const { totalSavings, thisMonthSavings, addSearch, searchCount } = useUser();
    const [locationName, setLocationName] = useState('Detecting location...');
    const [userData, setUserData] = useState(null);
    const [trendingItems, setTrendingItems] = useState([]);

    useEffect(() => {
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocationName('Current Location');
                },
                () => {
                    setLocationName('Location unavailable');
                }
            );
        }

        // Generate initial user data and trending items
        setUserData(generateUserData(searchCount));
        setTrendingItems(generateTrendingItems());
    }, [searchCount]);

    const handleSearch = (query) => {
        addSearch(query);
        navigate(createPageUrl('Search') + `?q=${encodeURIComponent(query)}`);
    };

    const handleCategoryClick = (category) => {
        addSearch(category);
        navigate(createPageUrl('Search') + `?category=${category}`);
    };

    const handleTrendingClick = (name) => {
        addSearch(name);
        navigate(createPageUrl('Search') + `?q=${encodeURIComponent(name)}`);
    };

    if (!userData) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-200/30 to-transparent rounded-full blur-3xl" />

                <div className="relative px-4 pt-8 pb-12">
                    {/* Location Badge */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-slate-600">{locationName}</span>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                            Never <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Overpay</span> Again
                        </h1>
                        <p className="text-slate-500 text-lg max-w-md mx-auto">
                            Find the cheapest prices at stores near you, verified by real shoppers
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="px-4 py-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">Browse Categories</h2>
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                        See All <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <CategoryPill
                            key={category}
                            category={category}
                            onClick={() => handleCategoryClick(category)}
                        />
                    ))}
                </div>
            </div>

            {/* Trending Prices */}
            <div className="px-4 py-6">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <h2 className="text-lg font-semibold text-slate-800">Trending Prices Today</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {trendingItems.map((item) => (
                        <TrendingItem
                            key={item.name}
                            {...item}
                            onClick={() => handleTrendingClick(item.name)}
                        />
                    ))}
                </div>
            </div>

            {/* User Stats Cards */}
            <div className="px-4 py-6 space-y-4">
                <SavingsCard
                    totalSavings={totalSavings}
                    thisMonth={thisMonthSavings}
                />
                <RewardsCard
                    points={userData.points}
                    streak={userData.streak}
                    nextReward={userData.nextReward}
                    progress={Math.min(userData.points % 100, 99)}
                />
            </div>

            {/* Quick Actions */}
            <div className="px-4 pt-8 pb-28">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        onClick={() => navigate(createPageUrl('Upload'))}
                        className="h-24 flex-col gap-2 rounded-2xl border-2 border-emerald-200 bg-white hover:bg-emerald-50 text-slate-900 font-medium"
                    >
                        <div className="p-2 bg-emerald-100 rounded-xl">
                            <Sparkles className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-sm">Upload Bill</span>
                    </Button>
                    <Button
                        onClick={() => navigate(createPageUrl('NearbyShops'))}
                        className="h-24 flex-col gap-2 rounded-2xl border-2 border-teal-200 bg-white hover:bg-teal-50 text-slate-900 font-medium"
                    >
                        <div className="p-2 bg-teal-100 rounded-xl">
                            <MapPin className="w-5 h-5 text-teal-600" />
                        </div>
                        <span className="text-sm">Nearby Shops</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
