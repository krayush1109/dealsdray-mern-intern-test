import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchLoginStatus = async () => {
        try {
            const response = await axios.get('/auth/status', { withCredentials: true });
            if (response.data.isLoggedIn) {
                setIsLoggedIn(true);
                setUserName(response.data.user?.username || 'User');
            } else {
                setIsLoggedIn(false);
                setUserName(null);
            }
        } catch (err) {
            console.error('Error fetching login status:', err);
            setIsLoggedIn(false);
            setUserName(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoginStatus();
    }, []); // Only run on mount to check login status when the app loads

    // Return the state and function to manually refresh the login status
    return { isLoggedIn, userName, loading, fetchLoginStatus };
};

export default useAuthStatus;
