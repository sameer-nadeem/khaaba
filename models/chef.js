const mongoose = require('mongoose')

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
        required: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
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
})

module.exports = mongoose.model('chef', chefSchema)