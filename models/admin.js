let mongoose = require('mongoose')
// admin schema
let categorySchema  = mongoose.Schema({
    userName:{
        type : String,
        required: true
    },
    phone:{
        type : String,
        required: true
    },
    firstName:{
        type : String,
        required: true
    },
    lastName:{
        type : String,
        required: true
    },
    password:{
        type : String,
        required: true
    }
});
