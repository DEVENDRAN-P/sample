import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useUser } from '@/context/UserContext';

export default function SearchHistory() {
    const { searches } = useUser();
    const [sortedSearches, setSortedSearches] = useState([]);

    useEffect(() => {
        if (searches && searches.length > 0) {
            // Group searches by query and count frequency
            const grouped = {};
            searches.forEach(search => {
                if (!grouped[search]) {
                    grouped[search] = { query: search, count: 0, lastSearched: new Date() };
                }
                grouped[search].count++;
            });

            // Convert to array and sort by frequency
            const sorted = Object.values(grouped).sort((a, b) => b.count - a.count);
            setSortedSearches(sorted);
        }
    }, [searches]);

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
                    <div>
                        <h1 className="font-semibold text-slate-900 text-lg">Search History</h1>
                        <p className="text-xs text-slate-500">{sortedSearches.length} unique searches</p>
                    </div>
                </div>
            </div>

            {/* Search History List */}
            <div className="px-4 py-6">
                {sortedSearches.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600">No search history yet</p>
                        <p className="text-sm text-slate-500">Start searching to build your history</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sortedSearches.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-4 border border-slate-100 flex items-center justify-between hover:border-emerald-200 transition-all"
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium text-slate-900 capitalize">{item.query}</h3>
                                    <p className="text-sm text-slate-500">{item.count} search{item.count !== 1 ? 'es' : ''}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {item.count}x
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Summary */}
            {sortedSearches.length > 0 && (
                <div className="px-4 mb-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
                        <p className="text-sm text-slate-600 mb-2">Most Searched</p>
                        <p className="text-xl font-bold text-emerald-600 capitalize">
                            {sortedSearches[0].query}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
