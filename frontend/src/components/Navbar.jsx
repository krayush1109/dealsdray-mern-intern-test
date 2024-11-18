import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
    const navigate = useNavigate();
    const { loading, isAuthenticated, setIsAuthenticated, user } = useAuth();
    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
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
                    {isAuthenticated ? (
                        // Logged-in view: Show Logout button and user name
                        <>
                            <span className="text-white">Hello, {user.username}</span>
                            <button
                                onClick={()=> navigate('/dashboard')}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Dashboard
                            </button>
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
