import React, { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load token and user from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('authUser');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }

        setIsLoading(false);
    }, []);

    const apiCall = useCallback(async (endpoint, method = 'POST', data = null) => {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'API call failed');
        }

        return result;
    }, [token]);

    const register = useCallback(async (username, email, password, fullName) => {
        try {
            setError(null);
            const data = await apiCall('/auth/register', 'POST', {
                username,
                email,
                password,
                fullName
            });

            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(data.user));

            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, [apiCall]);

    const login = useCallback(async (username, password) => {
        try {
            setError(null);
            const data = await apiCall('/auth/login', 'POST', {
                username,
                password
            });

            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(data.user));

            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, [apiCall]);

    const logout = useCallback(() => {
        // Clear user-specific data if authenticated
        if (user) {
            const userId = user.id;
            localStorage.removeItem(`userSearchHistory_${userId}`);
            localStorage.removeItem(`userBillHistory_${userId}`);
        }

        // Also clear old shared keys for backward compatibility
        localStorage.removeItem('userSearchHistory');
        localStorage.removeItem('userBillHistory');

        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        setError(null);
    }, [user]);

    const value = {
        user,
        token,
        isLoading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
