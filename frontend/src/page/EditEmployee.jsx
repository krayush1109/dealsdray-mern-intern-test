import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
    const { e_id } = useParams(); // Get the employee ID from the URL
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: [],
        imgUpload: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // For redirecting after successful update

    // Fetch employee details on page load
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`/user/update/${e_id}`);
                setEmployee(response.data.employee);
            } catch (err) {
                setError('Failed to fetch employee details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, [e_id]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle the course checkbox change
    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            course: checked
                ? [...prevState.course, value]
                : prevState.course.filter((course) => course !== value),
        }));
    };

    // Submit the updated employee data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log(employee);
        try {
            await axios.post(`/user/update/${e_id}`, employee);
            navigate('/dashboard'); // Redirect to dashboard after successful update
        } catch (err) {
            setError('Failed to update employee. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div className="max-w-xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Employee</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile No</label>
                    <input
                        type="text"
                        name="mobileNo"
                        value={employee.mobileNo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                    <select
                        name="designation"
                        value={employee.designation}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <div className="flex items-center space-x-4">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="M"
                                checked={employee.gender === "M"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="F"
                                checked={employee.gender === "F"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Courses</label>
                    <div className="flex flex-wrap gap-2">
                        {['MCA', 'BCA', 'BSC'].map((course) => (
                            <label key={course} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={course}
                                    checked={employee.course.includes(course)}
                                    onChange={handleCourseChange}
                                    className="mr-2"
                                />
                                {course}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="text"
                        name="img"
                        value={employee.imgUpload}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployee;
