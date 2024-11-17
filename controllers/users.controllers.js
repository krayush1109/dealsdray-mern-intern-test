const Employee_Collection = require("../models/employee.schema");
const Employee = require("../models/employee.schema");
const { nanoid } = require('nanoid');

exports.handleCreateEmployee = async (req, res, next) => {
    const { name, email, mobileNo, designation, gender, course, imgUpload } = req.body;

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email format.');
    }

    // Duplicate email check
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res.status(400).send('Email already exists.');
    }

    // Phone number validation 
    if (!/^\d{10}$/.test(mobileNo)) {
        return res.status(400).send('Mobile number must be a 10-digit number.');
    }

    // let new_id;

    // (async () => {
    //     const { nanoid } = await import('nanoid');
    //     new_id = await nanoid();
    //     console.log('Generated ID:', new_id);
    // })();

    const new_id = nanoid();  // Generate a unique ID
    console.log(new_id);       // Log the generated ID
    
    const new_employee = {
        e_id: new_id, name, email, mobileNo, designation, gender, course, imgUpload
    }

    console.log(new_employee);

    const employee = new Employee_Collection(new_employee);
    await employee.save();

    res.send(new_employee);
    // res.send("Employee Created Successfully");
}