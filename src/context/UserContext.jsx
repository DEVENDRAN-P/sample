import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [billHistory, setBillHistory] = useState([]);
    const [totalSavings, setTotalSavings] = useState(0);
    const [thisMonthSavings, setThisMonthSavings] = useState(0);

    // Get user-specific storage keys
    const getStorageKeys = () => {
        const authUser = localStorage.getItem('authUser');
        const userId = authUser ? JSON.parse(authUser).id : 'guest';
        return {
            searches: `userSearchHistory_${userId}`,
            bills: `userBillHistory_${userId}`
        };
    };

    // Load from localStorage on mount
    useEffect(() => {
        const keys = getStorageKeys();
        const savedSearches = localStorage.getItem(keys.searches);
        const savedBills = localStorage.getItem(keys.bills);

        if (savedSearches) {
            const history = JSON.parse(savedSearches);
            setSearchHistory(history);
            calculateSavings(history, JSON.parse(savedBills || '[]'));
        }

        if (savedBills) {
            setBillHistory(JSON.parse(savedBills));
        }
    }, []);

    const calculateSavings = (history, bills = []) => {
        // Calculate total savings based on searches
        const uniqueSearches = new Set(history).size;
        const totalCount = history.length;
        const repeatCount = totalCount - uniqueSearches;

        // Add bill upload savings (₹10 per bill + bill amount)
        const billSavings = bills.reduce((sum, bill) => sum + (bill.totalAmount || 0) * 0.1, 0);

        const total = (uniqueSearches * 50) + (repeatCount * 25) + billSavings + (bills.length * 10);
        const thisMonth = Math.floor(total * 0.3);

        setTotalSavings(total);
        setThisMonthSavings(thisMonth);
    };

    const addSearch = (query) => {
        if (query && query.trim()) {
            const updated = [...searchHistory, query.toLowerCase()];
            setSearchHistory(updated);
            const keys = getStorageKeys();
            localStorage.setItem(keys.searches, JSON.stringify(updated));
            calculateSavings(updated, billHistory);
        }
    };

    const addBillUpload = (billData) => {
        const updated = [...billHistory, { ...billData, id: Date.now(), uploadDate: new Date().toISOString() }];
        setBillHistory(updated);
        const keys = getStorageKeys();
        localStorage.setItem(keys.bills, JSON.stringify(updated));
        calculateSavings(searchHistory, updated);
    };

    const getBills = () => {
        return billHistory;
    };

    const value = {
        searchHistory,
        searches: searchHistory,
        billHistory,
        totalSavings,
        thisMonthSavings,
        addSearch,
        addBillUpload,
        getBills,
        searchCount: searchHistory.length,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
};
