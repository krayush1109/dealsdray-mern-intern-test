import { useEffect, useState } from "react";
import axios from "../utils/axios";
import DeleteConfirmModal from "./DeleteConfirmModal";

const EmployeeTable = ({ setEmployeesCount, search }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [showModal, setShowModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    // Fetch employees from the backend
    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/user/getAllEmployee');
            setEmployeesCount(response.data.length);
            setEmployees(response.data); // Assuming the response contains an array of employees
        } catch (err) {
            setError('Failed to load employee data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Call fetchEmployees on component mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Filter employees based on search query
    const filteredEmployees = employees.filter(
        (employee) =>
            employee.name.toLowerCase().includes(search.toLowerCase()) ||
            employee.email.toLowerCase().includes(search.toLowerCase())
    );

    // handle DELETE
    const handleDelete = async () => {
        try {
            await axios.get(`/user/delete/${employeeToDelete}`);
            // alert("Employee deleted successfully.");
            // Refresh employee list or trigger state update
            fetchEmployees();
        } catch (error) {
            console.error("Failed to delete employee:", error);
            alert("Failed to delete employee. Please try again.");
        } finally {
            setShowModal(false);
        }
    };

    // Sorting state
    const [sortBy, setSortBy] = useState({ column: null, direction: 'asc' });

    const handleSort = (column) => {
        setSortBy((prevSort) => {
            const isAscending = prevSort.column === column && prevSort.direction === 'asc';
            return { column, direction: isAscending ? 'desc' : 'asc' };
        });
    };

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (!sortBy.column) return 0; // No sorting

        const valA = a[sortBy.column];
        const valB = b[sortBy.column];

        if (valA < valB) return sortBy.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortBy.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedEmployees.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div>
            <table className="min-w-full bg-white border border-gray-300">
                {/* Table Header */}
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('id')}>#</th>
                        <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                        <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('email')}>Email</th>
                        <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('mobileNo')}>Mobile No</th>
                        <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('designation')}>Designation</th>
                        <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('gender')}>Gender</th>
                        <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('course')}>Course</th>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {currentRows.map((employee, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 border text-center">{indexOfFirstRow + index + 1}</td>
                            <td className="px-4 py-2 border">{employee.name}</td>
                            <td className="px-4 py-2 border">{employee.email}</td>
                            <td className="px-4 py-2 border">{employee.mobileNo}</td>
                            <td className="px-4 py-2 border">{employee.designation}</td>
                            <td className="px-4 py-2 border">{employee.gender}</td>
                            <td className="px-4 py-2 border">{employee.course.join(', ')}</td>
                            <td className="px-4 py-2 border">
                                <img src={employee.img} alt="Employee" className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="px-4 py-2 border">
                                <a href={`/edit/${employee.e_id}`}> <button className="bg-blue-500 text-white px-2 py-1 rounded mx-1">Edit</button> </a>
                                <button onClick={() => { setShowModal(true); setEmployeeToDelete(employee.e_id) }} className="bg-red-500 text-white px-2 py-1 rounded mx-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >

            <DeleteConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                title="Delete Employee"
                message="Are you sure you want to delete this employee?"
            />

            {/* Pagination Controls */}
            < div className="flex justify-center mt-4 space-x-2" >
                {
                    Array.from({ length: totalPages }, (_, index) => (
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
                    ))
                }
            </div >
        </div >
    );
};

export default EmployeeTable;
