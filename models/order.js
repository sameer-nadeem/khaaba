const mongoose = require('mongoose')
const opts = { toJSON: { virtuals: true } };

const Schema = mongoose.Schema

// +Kitchen
// +User
// +Khaabay
// +Total Price
// +Final Status

const orderSchema = new Schema({
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
        enum: ['Cancelled', 'Completed', 'Pending', 'Preparing', 'Ready'],
        default: 'Pending'
    },
    khaabay: [
        {
            khaaba: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'khaaba'
            },
            quantity: {
                type: Number
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
}, opts)

orderSchema.virtual('isComplete').get(function () {
    return this.status === 'Cancelled' || this.status === 'Completed'
})

module.exports = mongoose.model('order', orderSchema)