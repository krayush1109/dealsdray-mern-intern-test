import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Import axios instance

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Fetch employees from the backend
    const fetchEmployees = async () => {
        try {
            setLoading(true); // Start loading
            const response = await axios.get('/user/employees'); // Replace with your API endpoint
            setEmployees(response.data); // Assuming the response contains an array of employees
        } catch (err) {
            console.error('Error fetching employees:', err);
            setError('Failed to load employee data. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Call fetchEmployees on component mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Calculate the displayed rows
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = employees.slice(indexOfFirstRow, indexOfLastRow);

    // Total number of pages
    const totalPages = Math.ceil(employees.length / rowsPerPage);

    // Handle pagination click
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Mobile No</th>
                        <th className="px-4 py-2 border">Designation</th>
                        <th className="px-4 py-2 border">Gender</th>
                        <th className="px-4 py-2 border">Course</th>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((employee, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 border text-center">{indexOfFirstRow + index + 1}</td>
                            <td className="px-4 py-2 border">{employee.name}</td>
                            <td className="px-4 py-2 border">{employee.email}</td>
                            <td className="px-4 py-2 border">{employee.mobile}</td>
                            <td className="px-4 py-2 border">{employee.designation}</td>
                            <td className="px-4 py-2 border">{employee.gender}</td>
                            <td className="px-4 py-2 border">{employee.courses.join(', ')}</td>
                            <td className="px-4 py-2 border">
                                <img
                                    src={employee.img}
                                    alt="Employee"
                                    className="w-10 h-10 object-cover rounded-full mx-auto"
                                />
                            </td>
                            <td className="px-4 py-2 border text-center">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded mx-1 hover:bg-blue-600">
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded mx-1 hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmployeeTable;
