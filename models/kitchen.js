const mongoose = require('mongoose')
const opts = { toJSON: { virtuals: true } };

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
        },
        review: {
            type: String
        }
    }],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order'
        }
    ]
}, opts);

kitchenSchema.virtual('avgRating').get(function () {
    let avg = 0
    let count = this.reviews.length
    for (var i = 0; i < count; i++) {
        avg += this.reviews[i].rating
    }
    avg = avg / count
    return avg.toFixed(2)



})

module.exports = mongoose.model('kitchen', kitchenSchema)