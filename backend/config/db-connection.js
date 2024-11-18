// Import the mongoose library
const mongoose = require('mongoose');

// Export an asynchronous function to connect to the MongoDB database
exports.connectDB = async () => {
    try {
        // Attempt to connect to the database using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/intern_test_1");
        // Log a success message with the host of the connection
        console.log("DB Connected : ", conn.connection.host);
    } catch (err) {
        // Log an error message if the connection fails
        console.error("Connection Error : ", err.message);
    }
};
