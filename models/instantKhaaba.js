const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instantKhaabaSchema = new Schema({
    khaaba: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'khaaba'
    },
    servings: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('instantKhaaba', instantKhaabaSchema)