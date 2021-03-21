const mongoose = require('mongoose')
const opts = { toJSON: { virtuals: true } };

const Schema = mongoose.Schema

//  +Email
//  +Password
//  +Address
//  +Phone
//  +First Name
//  +Last Name
//  +Kitchen

const chefSchema = new Schema({
    email: {
        type: String,
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        addr: {
            type: String,
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
    password: {
        type: String
    },
    kitchen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kitchen'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, opts)

chefSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
})

module.exports = mongoose.model('chef', chefSchema)