import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar({ onSearch, placeholder = 'Search for onion, tomato, milk...', isSmall = false }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    if (isSmall) {
        return (
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex items-center">
                    <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                    <Input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-12 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 transition-all"
                    />
                    <Button
                        type="submit"
                        className="absolute right-1 bg-emerald-500 hover:bg-emerald-600 rounded-lg px-3 py-1 text-xs shadow-sm"
                    >
                        Go
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-slate-100 bg-white shadow-lg shadow-slate-100/50 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all"
                />
                <Button
                    type="submit"
                    className="absolute right-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl px-6 py-5 shadow-lg shadow-emerald-500/25"
                >
                    Search
                </Button>
            </div>
        </form>
    );
}
