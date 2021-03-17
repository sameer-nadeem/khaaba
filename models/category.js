const mongoose = require('mongoose')
// category schema
const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    expiry: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('category', categorySchema)

