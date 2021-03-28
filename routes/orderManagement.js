const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const Kitchen = require('../models/kitchen')
const ActiveOrders = require('../models/activeOrders')

const {
    SERVER_ERROR,
    UPDATE_ERROR,
} = require('../utils/errors')
const user = require('../models/user')








// chef accept order
router.post('/orderManagement/accept',auth,  async (req, res) => { 

    try {
        const {
            orderID,
    } = req.body

const acceptedOrder =  await ActiveOrders.findOne({_id:orderID})
acceptedOrder.status = 'Preparing'

acceptedOrder.save(function(err) { 
         
        if (err){
            console.error(err)
            return res.status(400).json({errors: [UPDATE_ERROR]})
        }
        else
            {
                return res.status(200).end()
            }
    
        });
        
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
    } = req.body

    const acceptedOrder =  await ActiveOrders.findOne({_id:orderID})
    acceptedOrder.status = 'Ready'
    
    acceptedOrder.save(function(err) { 
             
            if (err){
                console.error(err)
                return res.status(400).json({errors: [UPDATE_ERROR]})
            }
            else
                {
                    return res.status(200).end()
                }
        
            });
        
}catch(err)
{
    console.error(err)
    res.status(400).json({
        errors: [SERVER_ERROR]
    })
}
});


//customer cancel order
router.post('/orderManagement/cancel',auth,  async (req, res) => {

    try {


        const {
            orderID,
    } = req.body



const kitchen =  await Kitchen.findOne({_id:req.user.kitchen})

const cancelledOrder = kitchen.activeOrders.filter(_id == orderID)
cancelledOrder.status = 'Cancelled';
await cancelledOrder.save(function(err) { 
             
    if (err){
        console.error(err)
        return res.status(400).json({errors: [UPDATE_ERROR]})
    }
    else
        {
            return res.status(200).end()
        }

    });

// add to completed
kitchen.completedOrders.push(cancelledOrder)

const newCompleted = new completedOrders

newCompleted = cancelledOrder;
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