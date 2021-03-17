let mongoose = require('mongoose')
// user schema
let userSchema  = mongoose.Schema({

email:{
    type: String,
    required: true
},
password:{
    type : String,
    required: true
},
address:{
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
}//,
//activeOrders:{
//    type : Number,
//    required: true
//},
//completedOrders:{
  //  type : Number,
  //  required: true
//}
});