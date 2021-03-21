const mongoose = require('mongoose')
// kitchen schema
const kitchenSchema = mongoose.Schema({

    title: {
        type: String,
    },
    logo: {
        type: String,
    },
    activeHours: {
        start: {
            type: Number,
        },
        end: {
            type: Number,
        }
    },
    description: {
        type: String,
    },
    reviews: [{
        rating: {
            type: Number
        } ,
        review: {
            type: String
        }
    }],
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