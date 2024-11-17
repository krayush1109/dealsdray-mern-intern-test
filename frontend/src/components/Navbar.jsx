import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import useAuthStatus from '../utils/useAuthStatus'; // Import the custom hook
import axios from '../utils/axios';

const Navbar = () => {
    const { isLoggedIn, userName, loading, fetchLoginStatus } = useAuthStatus(); // Use the custom hook
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout', {}, { withCredentials: true });
            fetchLoginStatus();
            navigate('/'); // Redirect to homepage or login page after logout
        } catch (err) {
            console.error('Error during logout:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator until login status is fetched
    }

    return (
        <nav className="bg-blue-600 p-4">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-xl font-bold">
                    <Link to="/">Logo</Link>
                </div>

                {/* Navbar Links */}
                <div className="space-x-4">
                    {isLoggedIn ? (
                        // Logged-in view: Show Logout button and user name
                        <>
                            <span className="text-white">Hello, {userName}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        // Not logged-in view: Show Login and Register links
                        <>
                            <Link to="/login" className="text-white">
                                Login
                            </Link>
                            <Link to="/register" className="text-white">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
