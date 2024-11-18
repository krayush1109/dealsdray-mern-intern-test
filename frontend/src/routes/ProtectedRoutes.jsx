import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return children; // Render the protected content if authenticated
};

export default ProtectedRoute;
