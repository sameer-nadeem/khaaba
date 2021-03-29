const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const Order = require('../models/order')

const {
    SERVER_ERROR
} = require('../utils/errors')


router.get('/order-history', auth, async (req, res) => {


    let orders = await Order.find({
        kitchen: req.user.kitchen,
    }).populate('khaabay.khaaba')

    return res.status(200).json({
        orders
    })
})

router.get('/active-orders', auth, async (req, res) => {

    let orders = await Order.find({
        kitchen: req.user.kitchen,
    }).populate('khaabay.khaaba')

    return res.status(200).json({
        activeOrders: orders
            .filter(order => !order.isComplete)
    })
})


module.exports = router