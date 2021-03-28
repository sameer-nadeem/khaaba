const mongoose = require('mongoose')
// user schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        addr: {
            type: String,
            require: true
        },
        city: {
            type: String
        },
        coords: {
            lat: {
                type: Number
            },
            lng: {
                type: Number
            }
        }
    },
    phone: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order'
        }
    ]
});

module.exports = mongoose.model('user', userSchema)