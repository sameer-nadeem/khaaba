let mongoose = require('mongoose')
// category schema
let categorySchema  = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    expiry:{
        type : Date,
        required: true
    }
});

