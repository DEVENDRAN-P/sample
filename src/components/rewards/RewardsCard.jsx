import React from 'react';
import { Flame, Coins, Gift } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function RewardsCard({ points, streak, nextReward, progress }) {
    return (
        <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-6 text-white shadow-xl shadow-orange-500/25">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <Coins className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-white/80 text-sm">Your Points</p>
                        <p className="text-3xl font-bold">{points.toLocaleString()}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white/20 rounded-2xl px-4 py-2 backdrop-blur-sm">
                    <Flame className="w-5 h-5 text-yellow-200" />
                    <span className="font-bold text-lg">{streak}</span>
                    <span className="text-white/80 text-sm">day streak</span>
                </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-yellow-200" />
                        <span className="text-sm">Next Reward: {nextReward}</span>
                    </div>
                    <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/20" />
            </div>
        </div>
    );
}
