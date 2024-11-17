const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = mongoose.Schema(
    {
        e_id: {
            type: String,
            requrired: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensure unique email
        },
        mobileNo: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
            // enum: ['HR', 'Manager', 'Sales'], // Restrict to specific options
        },
        gender: {
            type: String,
            required: true,
            // enum: ['M', 'F'], // Restrict to 'M' or 'F'
        },
        course: {
            type: [String], // Array of selected courses
            // enum: ['MCA', 'BCA', 'BSc'], // Restrict to valid options
        },
        imgUpload: {
            type: String, // Path or URL to the uploaded image
            required: false, // Optional field
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Create and export the Employee model
const Employee_Collection = mongoose.model('Employee', employeeSchema);

console.log('Employee Schema Created');

module.exports = Employee_Collection;
