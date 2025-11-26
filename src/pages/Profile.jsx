import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useUser } from '@/context/UserContext';

export default function Profile() {
    const { totalSavings, searchCount } = useUser();

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
                    <h1 className="font-semibold text-slate-900 text-lg">Profile</h1>
                </div>
            </div>

            {/* Profile Section */}
            <div className="px-4 py-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                            LP
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Low Price Tracker</h2>
                            <p className="text-white/80">Track prices • Earn rewards</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/10 rounded-2xl p-4">
                            <p className="text-white/80 text-sm">Total Savings</p>
                            <p className="text-2xl font-bold">₹{totalSavings.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-4">
                            <p className="text-white/80 text-sm">Searches</p>
                            <p className="text-2xl font-bold">{searchCount}</p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-2">
                    {[
                        { label: 'Search History', desc: `${searchCount} searches`, path: '/search-history' },
                        { label: 'Rewards', desc: 'View available rewards', path: '/rewards' },
                        { label: 'Settings', desc: 'App preferences', path: '/settings' },
                    ].map((item, idx) => (
                        <Link key={idx} to={item.path}>
                            <button
                                className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all"
                            >
                                <div className="text-left">
                                    <p className="font-medium text-slate-900">{item.label}</p>
                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-400" />
                            </button>
                        </Link>
                    ))}
                </div>

                {/* Info Section */}
                <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-sm text-emerald-900">
                        ✨ <span className="font-semibold">Low Price Tracker</span><br/>
                        Find the best prices, track savings, and earn rewards!
                    </p>
                </div>
            </div>
        </div>
    );
}
