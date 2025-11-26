import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@/context/UserContext';
import { AuthProvider } from '@/context/AuthContext';
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
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ProtectedRoute from '@/components/ProtectedRoute';

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
    '/login': 'Login',
    '/register': 'Register',
};

function AppContent() {
    const location = useLocation();
    const currentPageName = pageNameMap[location.pathname] || 'Home';
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthPage) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        );
    }

    return (
        <Layout currentPageName={currentPageName}>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                <Route path="/nearby" element={<ProtectedRoute><NearbyShops /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/shop-dashboard" element={<ProtectedRoute><ShopDashboard /></ProtectedRoute>} />
                <Route path="/search-history" element={<ProtectedRoute><SearchHistory /></ProtectedRoute>} />
                <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
            </Routes>
        </Layout>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <UserProvider>
                    <Router>
                        <AppContent />
                    </Router>
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
