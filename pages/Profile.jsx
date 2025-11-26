import React from 'react';
import { ArrowLeft, User, Gift, FileText, Star, Settings, ChevronRight, LogOut, Flame, Coins, PiggyBank, Store } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: bills = [] } = useQuery({
    queryKey: ['userBills'],
    queryFn: async () => {
      const currentUser = await base44.auth.me();
      return base44.entities.Bill.filter({ created_by: currentUser.email });
    }
  });

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  const menuItems = [
    { icon: FileText, label: 'My Bills', desc: `${bills.length} uploaded`, page: 'MyBills' },
    { icon: Gift, label: 'Rewards', desc: 'View available rewards', page: 'Rewards' },
    { icon: Star, label: 'Saved Shops', desc: 'Your favorite stores', page: 'SavedShops' },
    { icon: Settings, label: 'Settings', desc: 'App preferences', page: 'Settings' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <Skeleton className="h-48 w-full rounded-3xl mb-6" />
        <Skeleton className="h-24 w-full rounded-2xl mb-4" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-4 pt-4 pb-12">
        <div className="flex items-center justify-between mb-8">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-4 border-white/20">
            <AvatarFallback className="bg-white/20 text-white text-2xl">
              {user?.full_name?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">
            <h1 className="text-2xl font-bold">{user?.full_name || 'User'}</h1>
            <p className="text-white/80">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="p-2 bg-amber-100 rounded-xl w-fit mx-auto mb-2">
                <Coins className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{user?.points || 0}</p>
              <p className="text-xs text-slate-500">Points</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="p-2 bg-orange-100 rounded-xl w-fit mx-auto mb-2">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{user?.streak_days || 0}</p>
              <p className="text-xs text-slate-500">Day Streak</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="p-2 bg-emerald-100 rounded-xl w-fit mx-auto mb-2">
                <PiggyBank className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-slate-800">₹{user?.total_savings || 0}</p>
              <p className="text-xs text-slate-500">Saved</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Shopkeeper Section */}
      {user?.is_shopkeeper && (
        <div className="px-4 mt-6">
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Shop Dashboard</p>
                    <p className="text-sm text-white/80">Manage your shop & prices</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate(createPageUrl('ShopDashboard'))}
                  className="bg-white text-indigo-600 hover:bg-white/90 rounded-xl"
                >
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Menu Items */}
      <div className="px-4 mt-6">
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => navigate(createPageUrl(item.page))}
                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-xl">
                    <item.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-slate-800">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6">
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="w-full py-6 rounded-xl text-red-500 border-red-200 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}