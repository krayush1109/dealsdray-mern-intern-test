import React, { useState } from 'react';
import axios from '../utils/axios';

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '', // Default value for dropdown
        gender: '',
        courses: [], // Array to handle multiple courses
        img: null,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Handle checkbox for courses
            setFormData((prev) => ({
                ...prev,
                courses: checked
                    ? [...prev.courses, value] // Add course
                    : prev.courses.filter((course) => course !== value), // Remove course
            }));
        } else if (type === 'file') {
            // Handle file upload
            setFormData((prev) => ({
                ...prev,
                img: e.target.files[0],
            }));
        } else {
            // Handle other input fields
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);

        try {
            // Example: FormData for API submission
            // const submissionData = new FormData();
            // submissionData.append('name', formData.name);
            // submissionData.append('email', formData.email);
            // submissionData.append('mobileNo', formData.mobile);
            // submissionData.append('designation', formData.designation);
            // submissionData.append('gender', formData.gender);
            // submissionData.append('course', formData.courses.join(','));

            const submissionData = {
                name: formData.name,
                email: formData.email,
                mobileNo: formData.mobile,
                designation: formData.designation,
                gender: formData.gender,
                course: formData.courses,
                imgUpload: formData.img.name
            }


            // if (formData.img) {
            //     submissionData.append('imgUpload', formData.img);
            // }

            // API Call
            // const response = await axios.post('/user/create', submissionData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data', // Important for file uploads
            //     },
            // });
            console.log("submissionData : ", {...submissionData})
            const response = await axios.post('/user/create', submissionData);
            console.log(response);

            if (response.status === 200 || response.status === 201) {
                setSuccess('Employee created successfully!');
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    designation: 'HR',
                    gender: '',
                    courses: [],
                    img: null,
                });
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Failed to create employee.');
            } else if (err.request) {
                setError('No response from the server. Please check your internet connection.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Create Employee</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Mobile */}
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-gray-700">
                            Mobile No
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Designation */}
                    <div className="mb-4">
                        <label htmlFor="designation" className="block text-gray-700">
                            Designation
                        </label>
                        <select
                            id="designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="" disabled>
                                Select Designation
                            </option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <span className="block text-gray-700">Gender</span>
                        <div className="space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={formData.gender === 'M'}
                                    onChange={handleChange}
                                    required
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={formData.gender === 'F'}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    {/* Course */}
                    <div className="mb-4">
                        <span className="block text-gray-700">Course</span>
                        <div className="space-y-2">
                            <label>
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="MCA"
                                    checked={formData.courses.includes('MCA')}
                                    onChange={handleChange}
                                />
                                MCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="BCA"
                                    checked={formData.courses.includes('BCA')}
                                    onChange={handleChange}
                                />
                                BCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="BSC"
                                    checked={formData.courses.includes('BSC')}
                                    onChange={handleChange}
                                />
                                BSC
                            </label>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label htmlFor="img" className="block text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEmployee;
