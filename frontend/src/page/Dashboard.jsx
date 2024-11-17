import React, { useState } from 'react';
import EmployeeTable from '../components/EmployeeTable';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [employeesCount, setEmployeesCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <a href="/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Create Employee
          </button>
        </a>
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-gray-700">
          Total Employees: <span className="font-bold">{employeesCount}</span>
        </p>
      </div>

      {/* Employee Table */}
      <EmployeeTable setEmployeesCount={setEmployeesCount} search={search} />
    </div>
  );
};

export default Dashboard;
