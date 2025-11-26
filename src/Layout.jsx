import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Search, Upload, MapPin, User } from 'lucide-react';

const navItems = [
    { icon: Home, label: 'Home', page: 'Home' },
    { icon: Search, label: 'Search', page: 'Search' },
    { icon: Upload, label: 'Upload', page: 'Upload' },
    { icon: MapPin, label: 'Nearby', page: 'NearbyShops' },
    { icon: User, label: 'Profile', page: 'Profile' },
];

export default function Layout({ children, currentPageName }) {
    const hideNav = ['ShopDashboard'].includes(currentPageName);

    return (
        <div className="min-h-screen bg-slate-50">
            {children}

            {/* Bottom Navigation */}
            {!hideNav && (
                <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-2 z-50">
                    <div className="max-w-md mx-auto flex items-center justify-around">
                        {navItems.map((item) => {
                            const isActive = currentPageName === item.page;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.page}
                                    to={createPageUrl(item.page)}
                                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${isActive
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${item.page === 'Upload' && isActive ? 'scale-110' : ''}`} />
                                    <span className={`text-xs font-medium ${isActive ? 'text-emerald-600' : ''}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            )}
        </div>
    );
}
