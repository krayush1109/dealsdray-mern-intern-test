import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios'; // Your axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // To store logged-in user data
    const [loading, setLoading] = useState(true);

    // Function to check login status and fetch user data
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('/auth/check_login'); // Replace with your API endpoint
            setIsAuthenticated(response.data.isAuthenticated);
            setUser(response.data.user || null); // Store user data if authenticated
        } catch (err) {
            console.error('Failed to verify login status:', err);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
