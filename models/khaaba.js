const mongoose = require('mongoose')
const Schema = mongoose.Schema

// +Kitchen
// +Title
// +Price
// +Description
// +Thumbnail
// +Category
// +Instant Khaaba


const khaabaSchema = new Schema({
    kitchen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kitchen'
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        }
    ],
    instantKhaaba: {
        isInstant: {
            type: Boolean,
            default: false
        },
        availableServings: {
            type: Number,
            default: 0
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('khaaba', khaabaSchema)