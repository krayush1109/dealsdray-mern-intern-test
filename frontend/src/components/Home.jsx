import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            {/* Heading */}
            <h1 className="text-4xl font-bold mb-4 text-center">
                Welcome to Employee Management System
            </h1>

            {/* Image explaining the feature */}
            <div className="mb-8">
                <img
                    src="https://fabhr.in/wp-content/uploads/2021/04/fabhr-people-management-sec2img2.png" // Replace with your own image URL
                    alt="Employee Management"
                    className="w-full max-w-3xl rounded-lg shadow-lg"
                />
            </div>

            {/* Description */}
            <p className="text-lg mb-8 text-center text-gray-600">
                You can easily add, update, and manage employee details right here. Start by logging in or registering to get started!
            </p>

            {/* Buttons for Login and Register */}
            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
