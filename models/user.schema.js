const mongoose = require('mongoose')

const plm = require('passport-local-mongoose')

const user_schema = mongoose.Schema({
    f_sno: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: String,
 
}, { timestamps: true }
);

// user_schema.plugin(plm);
user_schema.plugin(plm, { usernameField: 'email' });

const User_Collection = mongoose.model("user", user_schema)

console.log("Schema Created");

module.exports = User_Collection;