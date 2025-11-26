import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar({ onSearch, placeholder = "Search for onion, tomato, milk..." }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

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