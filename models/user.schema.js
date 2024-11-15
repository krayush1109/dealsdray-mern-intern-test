// Import the mongoose library
const mongoose = require('mongoose');

// Import passport-local-mongoose plugin
const plm = require('passport-local-mongoose');

// Define a new schema for the user collection
const user_schema = mongoose.Schema({
    f_sno: {
        type: Number,
        require: true,
        unique: true
    },
    f_userName: {
        type: String,
        required: true,
        unique: true
    },

    // store hash password only
    f_pwd : {
        type: String,
        required: true,
    }

}, { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Apply the passport-local-mongoose plugin to the schema
user_schema.plugin(plm);

// Create a model named "users" using the user schema
const User_Collection = mongoose.model("users", user_schema);

// Log a message indicating the schema has been created
console.log("Schema Created");

// Export the user collection model
module.exports = User_Collection;
