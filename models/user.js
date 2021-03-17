let mongoose = require('mongoose')
// user schema
let userSchema  = mongoose.Schema({

Email:{
    type: String,
    required: true
},
Password:{
    type : String,
    required: true
},
Address:{
    type : String,
    required: true
},
Phone:{
    type : String,
    required: true
},
FirstName:{
    type : String,
    required: true
},
LastName:{
    type : String,
    required: true
}//,
//ActiveOrders:{
//    type : Number,
//    required: true
//},
//CompletedOrders:{
  //  type : Number,
  //  required: true
//}
});