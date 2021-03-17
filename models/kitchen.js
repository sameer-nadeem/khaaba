const mongoose = require('mongoose')
// kitchen schema
const kitchenSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    activeHours: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    chef: {
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

module.exports = mongoose.model('kitchen', kitchenSchema)