const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 1
    },
    email: {
        type: String,
        require: true,
        min: 1
    },
    password: {
        type: String,
        require: true,
        min: 1
    }
})

module.exports = mongoose.model("User", userSchema);