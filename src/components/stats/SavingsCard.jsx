import React from 'react';
import { PiggyBank, ArrowUpRight } from 'lucide-react';

export default function SavingsCard({ totalSavings, thisMonth }) {
    return (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-500/25">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <PiggyBank className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-white/80 text-sm">Total Savings</p>
                    <p className="text-3xl font-bold">₹{totalSavings.toLocaleString()}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <ArrowUpRight className="w-5 h-5 text-emerald-200" />
                <span className="text-sm">
                    <span className="font-semibold">₹{thisMonth}</span> saved this month
                </span>
            </div>
        </div>
    );
}
