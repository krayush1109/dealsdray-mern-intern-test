import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { setIsAuthenticated, setUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // To manage loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading before making the request
        setError(''); // Clear previous errors

        try {
            const response = await axios.post('/auth/login', { email, password });
            console.log(response)
            if (response.status === 200) {
                // Successful login, update login status and navigate
                setIsAuthenticated(true);
                setUser(response.data.user)
                navigate('/dashboard'); // Redirect to the dashboard or desired page
            }
        } catch (err) {
            // Error handling as per the status code
            if (err.response) {
                if (err.response.status === 401) {
                    setError('Invalid email or password');
                } else if (err.response.status === 500) {
                    setError('There was a server error. Please try again later.');
                } else {
                    setError('An error occurred. Please try again.');
                }
            } else if (err.request) {
                setError('Network error. Please check your internet connection.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false); // End loading after the request
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
