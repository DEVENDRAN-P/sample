import React, { useState } from 'react';
import { ArrowLeft, Gift, Zap, TrendingUp, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useUser } from '@/context/UserContext';

export default function Rewards() {
    const { totalSavings, searchCount } = useUser();

    // Calculate reward points (50 points per unique search, 25 per repeat)
    const uniqueSearches = Math.ceil(searchCount / 1.5); // Estimate
    const points = (uniqueSearches * 50) + ((searchCount - uniqueSearches) * 25);

    const rewards = [
        { id: 1, name: '₹50 Cashback', points: 100, icon: Gift, color: 'from-blue-400 to-blue-600' },
        { id: 2, name: '₹100 Voucher', points: 200, icon: Gift, color: 'from-purple-400 to-purple-600' },
        { id: 3, name: '₹250 Gift Card', points: 500, icon: Crown, color: 'from-yellow-400 to-yellow-600' },
        { id: 4, name: 'Free Premium', points: 1000, icon: Zap, color: 'from-emerald-400 to-emerald-600' },
    ];

    const canRedeem = (requiredPoints) => points >= requiredPoints;

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 z-40">
                <div className="px-4 py-4 flex items-center gap-3">
                    <Link to={createPageUrl('Profile')}>
                        <Button variant="ghost" size="sm" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="font-semibold text-slate-900 text-lg">Rewards</h1>
                </div>
            </div>

            {/* Points Summary */}
            <div className="px-4 py-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-white/80 text-sm mb-1">Your Reward Points</p>
                            <p className="text-4xl font-bold">{points.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-white/20" />
                    </div>
                    <div className="text-sm text-white/80">
                        <p>From {searchCount} searches • ₹{totalSavings.toLocaleString()} saved</p>
                    </div>
                </div>

                {/* Available Rewards */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Redeem Rewards</h2>
                    <div className="space-y-3">
                        {rewards.map((reward) => {
                            const RewardIcon = reward.icon;
                            const isAvailable = canRedeem(reward.points);

                            return (
                                <div
                                    key={reward.id}
                                    className={`rounded-2xl p-4 flex items-center justify-between transition-all ${isAvailable
                                            ? 'bg-white border border-emerald-200 hover:shadow-md'
                                            : 'bg-slate-100 border border-slate-200 opacity-60'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`bg-gradient-to-br ${reward.color} p-3 rounded-xl text-white`}>
                                            <RewardIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{reward.name}</p>
                                            <p className="text-sm text-slate-500">{reward.points.toLocaleString()} points</p>
                                        </div>
                                    </div>
                                    <Button
                                        disabled={!isAvailable}
                                        className={`${isAvailable
                                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {isAvailable ? 'Redeem' : 'Locked'}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* How to Earn */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <h3 className="font-semibold text-slate-900 mb-3">How to Earn Points</h3>
                    <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>50 points per unique search</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>25 points per repeat search</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Bonus points for uploads</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
