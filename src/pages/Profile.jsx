import React, { useState, useEffect } from 'react';
import { ArrowLeft, LogOut, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
    const navigate = useNavigate();
    const { totalSavings, searchCount } = useUser();
    const { user, logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        logout();
        navigate('/login');
    };

    if (!user) return null;

    // Get initials from username or full name
    const getInitials = () => {
        if (user.fullName) {
            const names = user.fullName.split(' ');
            return (names[0]?.[0] || '') + (names[1]?.[0] || '');
        }
        return (user.username?.[0] || '') + (user.username?.[1] || '');
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
                    <h1 className="font-semibold text-slate-900 text-lg">Profile</h1>
                </div>
            </div>

            {/* Profile Section */}
            <div className="px-4 py-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                            {getInitials().toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{user.fullName || user.username}</h2>
                            <p className="text-white/80">{user.email}</p>
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

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full mt-8 px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center border border-red-600"
                >
                    {isLoggingOut ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Signing out...</span>
                        </>
                    ) : (
                        <>
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
