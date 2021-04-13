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
            type: String,
        },
        end: {
            type: String,
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
            heading: {
                type: String

            },
            body: {
                type: String
            }
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
        if (this.reviews[i].rating) {
            avg += this.reviews[i].rating
        }
    }
    if (count === 0) {
        return 0
    }
    avg = avg / count
    return avg.toFixed(2)



})

module.exports = mongoose.model('kitchen', kitchenSchema)