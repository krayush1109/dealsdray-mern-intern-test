import React, { useState } from 'react';
import EmployeeTable from '../components/TableEmployee';

const Dashboard = () => {
  // Mock employee data
  const initialEmployees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-01-01', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-02-15', active: false },
    { id: 3, name: 'Robert Brown', email: 'robert@example.com', date: '2023-12-10', active: true },
    { id: 4, name: 'Alice Johnson', email: 'alice@example.com', date: '2024-03-05', active: true },
    { id: 5, name: 'Chris Evans', email: 'chris@example.com', date: '2024-01-20', active: false },
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (!sortField) return 0;
    if (sortOrder === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const totalEmployees = sortedEmployees.length;
  const totalPages = Math.ceil(totalEmployees / pageSize);

  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <a href="/create">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Employee
          </button>
        </a>
      </div>

      {/* Search and Total Count */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-gray-700">
          Total Employees: <span className="font-bold">{totalEmployees}</span>
        </p>
      </div>

      {/* Employee Table */}
      <EmployeeTable />
     
    </div>
  );
};

export default Dashboard;
