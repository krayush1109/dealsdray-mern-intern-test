const User_Collection = require("../models/user.schema");

const getNextSerialNumber = async () => {
    try {
        // Find the user with the highest `f_sno`
        const lastUser = await User_Collection.findOne().sort({ f_sno: -1 }).exec();

        // If a user is found, increment their `f_sno`. Otherwise, start at 1
        return lastUser ? lastUser.f_sno + 1 : 1;
    } catch (error) {
        console.error("Error retrieving the next serial number:", error);
        throw error; // Re-throw the error to handle it in calling function
    }
};

module.exports = getNextSerialNumber;
