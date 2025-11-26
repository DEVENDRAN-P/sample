import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@/context/UserContext';
import Layout from '@/Layout';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Upload from '@/pages/Upload';
import NearbyShops from '@/pages/NearbyShops';
import Profile from '@/pages/Profile';
import ShopDashboard from '@/pages/ShopDashboard';
import SearchHistory from '@/pages/SearchHistory';
import Rewards from '@/pages/Rewards';
import Settings from '@/pages/Settings';
import Bills from '@/pages/Bills';

const queryClient = new QueryClient();

const pageNameMap = {
    '/': 'Home',
    '/search': 'Search',
    '/upload': 'Upload',
    '/nearby': 'NearbyShops',
    '/profile': 'Profile',
    '/shop-dashboard': 'ShopDashboard',
    '/search-history': 'SearchHistory',
    '/rewards': 'Rewards',
    '/settings': 'Settings',
    '/bills': 'Bills',
};

function AppContent() {
    const location = useLocation();
    const currentPageName = pageNameMap[location.pathname] || 'Home';

    return (
        <Layout currentPageName={currentPageName}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/nearby" element={<NearbyShops />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/shop-dashboard" element={<ShopDashboard />} />
                <Route path="/search-history" element={<SearchHistory />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/bills" element={<Bills />} />
            </Routes>
        </Layout>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <AppContent />
                </Router>
            </UserProvider>
        </QueryClientProvider>
    );
}

export default App;
