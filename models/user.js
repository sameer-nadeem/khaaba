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
        coords: {
            long: {
                type: Number
            },
            lat: {
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
    activeOrders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'activeOrder'
        }
    ],
    completeOrders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'completeOrder'
        }
    ]
});

module.exports = mongoose.model('user', userSchema)