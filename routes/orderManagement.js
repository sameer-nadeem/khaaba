const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const Kitchen = require('../models/kitchen')

const {
    USER_ALREADY_EXISTS,
    SERVER_ERROR,
    INVALID_CREDITS,
} = require('../utils/errors')

// chef accept order
router.post('/orderManagement/accept',auth,  async (req, res) => { 

    try {
        const {
            orderID,
            kitchenID,
    } = req.body

const kitchen =  await Kitchen.findOne({_id:kitchenID})

kitchen.update({'activeOrders.id': orderID}, {'$set': {
    'activeOrders.$.status': 'Preparing'

}}, function(err, docs) { 
         
    if (err){
        console.error(err)
        return res.status(400).json({errors: [SERVER_ERROR]})
    }
    else
        {
            return res,status(200).json(docs)
        }

    })
        
}catch(err)
{
    console.error(err)
    res.status(400).json({
        errors: [SERVER_ERROR]
    })
}
});


//chef update order status ready
router.post('/orderManagement/ready',auth,  async (req, res) => { 

    try {
        const {
            orderID,
            kitchenID,
    } = req.body

const kitchen =  await Kitchen.findOne({_id:kitchenID})

kitchen.update({'activeOrders.id': orderID}, {'$set': {
    'activeOrders.$.status': 'Ready'

}}, function(err, docs) { 
         
    if (err){
        console.error(err)
        return res.status(400).json({errors: [SERVER_ERROR]})
    }
    else
        {
            return res,status(200).json(docs)
        }

    })
        
}catch(err)
{
    console.error(err)
    res.status(400).json({
        errors: [SERVER_ERROR]
    })
}
});


//customer cancel order
router.post('/orderManagement/ready',auth,  async (req, res) => {

    try {


        const {
            orderID,
            kitchenID,
    } = req.body



const kitchen =  await Kitchen.findOne({_id:kitchenID})

const cancelledOrder = kitchen.activeOrders.filter(_id == orderID)
cancelledOrder.status = 'Cancelled'

// add to completed
kitchen.completedOrders.push(cancelledOrder)
///////

kitchen.update(
    { },
    { $pull: { activeOrders : {_id : orderID}  } },
    { multi: true }
)

        
}catch(err)
{
    console.error(err)
    res.status(400).json({
        errors: [SERVER_ERROR]
    })
}
});