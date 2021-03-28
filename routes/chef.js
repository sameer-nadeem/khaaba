const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const Chef = require('../models/chef')
const kitchen = require('../models/kitchen')
const {
    SERVER_ERROR
} = require('../utils/errors')


router.get('/order-history', auth, async (req, res) => {


    let chefKitchen = await kitchen.findOne({
        _id: req.user.kitchen
    })
    if (!chefKitchen) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }

    return res.status(200).json({
        orders: chefKitchen.orders
    })
})

router.get('/active-orders', auth, async (req, res) => {



    let chefKitchen = await kitchen.findOne({
        _id: req.kitchen.id
    })

    if (!chefKitchen) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }

    const orders = chefKitchen.orders

    return res.status(200).json({
        activeOrders: orders
            .filter(order => order.status !== 'Completed' || order.status !== 'Cancelled')
    })
})


module.exports = router