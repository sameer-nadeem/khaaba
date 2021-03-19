const mongoose = require('mongoose')

const Schema = mongoose.Schema

// +Kitchen
// +User
// +Khaabay
// +Total Price
// +Status


const activeOrdersSchema = new Schema({
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
        enum: ['Pending', 'Preparing', 'Ready'],
        default: 'Pending'
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

module.exports = mongoose.model('activeOrder', activeOrdersSchema)