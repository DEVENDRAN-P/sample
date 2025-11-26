import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
    const navigate = useNavigate();
    const { register, isAuthenticated, error: authError } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [validation, setValidation] = useState({
        username: true,
        email: true,
        password: true
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const validateForm = () => {
        const newValidation = {
            username: formData.username.length >= 3,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
            password: formData.password.length >= 6
        };

        setValidation(newValidation);
        return Object.values(newValidation).every(v => v);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            setError('Please fix validation errors');
            return;
        }

        setIsLoading(true);
        try {
            await register(formData.username, formData.email, formData.password, formData.fullName);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-emerald-600 mb-2">Low Price Tracker</h1>
                    <p className="text-slate-600">Create your account</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                    {/* Error Alert */}
                    {(error || authError) && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-red-700 text-sm">{error || authError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name (Optional)
                            </label>
                            <Input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500/20 transition-all"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Username Input */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-700">
                                    Username
                                </label>
                                {validation.username && formData.username && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                            </div>
                            <Input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="At least 3 characters"
                                className={`w-full px-4 py-3 border rounded-lg transition-all ${validation.username || !formData.username
                                        ? 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                                        : 'border-red-300 focus:border-red-500'
                                    }`}
                                disabled={isLoading}
                            />
                            {!validation.username && formData.username && (
                                <p className="text-xs text-red-600 mt-1">Username must be at least 3 characters</p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-700">
                                    Email
                                </label>
                                {validation.email && formData.email && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                            </div>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`w-full px-4 py-3 border rounded-lg transition-all ${validation.email || !formData.email
                                        ? 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                                        : 'border-red-300 focus:border-red-500'
                                    }`}
                                disabled={isLoading}
                            />
                            {!validation.email && formData.email && (
                                <p className="text-xs text-red-600 mt-1">Please enter a valid email</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                {validation.password && formData.password && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                            </div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="At least 6 characters"
                                    className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all ${validation.password || !formData.password
                                            ? 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                                            : 'border-red-300 focus:border-red-500'
                                        }`}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {!validation.password && formData.password && (
                                <p className="text-xs text-red-600 mt-1">Password must be at least 6 characters</p>
                            )}
                        </div>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                        >
                            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                            {isLoading ? 'Creating account...' : 'Sign Up'}
                        </Button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                        <p className="text-slate-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Real authentication with database integration
                </p>
            </div>
        </div>
    );
}
