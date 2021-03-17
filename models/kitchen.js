let mongoose = require('mongoose')
// kitchen schema
let kitchenSchema  = mongoose.Schema({

title:{
    type: String,
    required: true
},
logo:{
    type : String,
    required: true
},
activeHours:{
    type : Number,
    required: true
},
description:{
    type : String,
    required: true
},
chef:{
    type : String,
    required: true
}//,
//activeOrders:{
//    type : Number,
 //   required: true
//},
//completedOrders:{
  //  type : Number,
    //required: true
//}
});