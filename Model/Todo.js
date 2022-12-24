const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        min: 1
    },
    userId: {
        type: String,
        required: true,
        min: 1
    },
    checked: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model("Todo", todoSchema);