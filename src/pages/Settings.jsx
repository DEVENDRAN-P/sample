import React, { useState } from 'react';
import { ArrowLeft, Bell, Lock, Globe, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Settings() {
    const [settings, setSettings] = useState({
        notifications: true,
        locationTracking: true,
        darkMode: false,
        language: 'English',
    });

    const handleToggle = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

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
                    <h1 className="font-semibold text-slate-900 text-lg">Settings</h1>
                </div>
            </div>

            {/* Settings Content */}
            <div className="px-4 py-6">
                {/* App Preferences */}
                <div className="mb-6">
                    <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">App Preferences</h2>

                    <div className="space-y-3">
                        {/* Notifications */}
                        <div className="bg-white rounded-xl p-4 border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-slate-600" />
                                <div>
                                    <p className="font-medium text-slate-900">Notifications</p>
                                    <p className="text-xs text-slate-500">Price alerts and updates</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleToggle('notifications')}
                                className={`w-12 h-7 rounded-full transition-all ${settings.notifications ? 'bg-emerald-500' : 'bg-slate-300'
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.notifications ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>

                        {/* Location Tracking */}
                        <div className="bg-white rounded-xl p-4 border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-slate-600" />
                                <div>
                                    <p className="font-medium text-slate-900">Location Tracking</p>
                                    <p className="text-xs text-slate-500">Find nearby shops</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleToggle('locationTracking')}
                                className={`w-12 h-7 rounded-full transition-all ${settings.locationTracking ? 'bg-emerald-500' : 'bg-slate-300'
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.locationTracking ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>

                        {/* Dark Mode */}
                        <div className="bg-white rounded-xl p-4 border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-slate-600" />
                                <div>
                                    <p className="font-medium text-slate-900">Dark Mode</p>
                                    <p className="text-xs text-slate-500">Coming soon</p>
                                </div>
                            </div>
                            <button
                                disabled
                                className="w-12 h-7 rounded-full bg-slate-300 cursor-not-allowed opacity-50"
                            >
                                <div className="w-5 h-5 bg-white rounded-full translate-x-1"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Support */}
                <div className="mb-6">
                    <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">Support</h2>

                    <div className="space-y-2">
                        <button className="w-full bg-white rounded-xl p-4 border border-slate-100 text-left hover:border-emerald-200 transition-all flex items-center gap-3">
                            <HelpCircle className="w-5 h-5 text-slate-600" />
                            <div>
                                <p className="font-medium text-slate-900">Help & FAQ</p>
                                <p className="text-xs text-slate-500">Get help with app</p>
                            </div>
                        </button>

                        <button className="w-full bg-white rounded-xl p-4 border border-slate-100 text-left hover:border-emerald-200 transition-all flex items-center gap-3">
                            <HelpCircle className="w-5 h-5 text-slate-600" />
                            <div>
                                <p className="font-medium text-slate-900">Report a Bug</p>
                                <p className="text-xs text-slate-500">Help us improve</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* About */}
                <div className="bg-slate-100 rounded-xl p-4 text-center">
                    <p className="text-sm text-slate-600 mb-1">Low Price Tracker v1.0.0</p>
                    <p className="text-xs text-slate-500">Track prices • Save money • Earn rewards</p>
                </div>
            </div>
        </div>
    );
}
