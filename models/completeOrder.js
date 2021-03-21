const mongoose = require('mongoose')
const Schema = mongoose.Schema

// +Kitchen
// +User
// +Khaabay
// +Total Price
// +Final Status

const completeOrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    kitchen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kitchen'
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String,
        enum: ['Cancelled', 'Completed'],
        default: 'Completed'
    },
    khaabay: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'khaaba'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('completeOrder', completeOrderSchema)