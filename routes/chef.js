const express = require('express')
const router = express.Router()
const { auth, chefAuth } = require('../middlewares/auth')
const Order = require('../models/order')

const {
    SERVER_ERROR
} = require('../utils/errors')


router.get('/order-history', chefAuth, async (req, res) => {


    let orders = await Order.find({
        kitchen: req.user.kitchen,
    }).sort({ date: 'desc' }).populate('khaabay.khaaba').populate('user', ['-password',])

    console.log(orders)

    return res.status(200).json({
        orders: orders.filter(order => order.status !== 'Pending' && order.status !== "Preparing")
    })
})

router.get('/active-orders', chefAuth, async (req, res) => {

    let orders = await Order.find({
        kitchen: req.user.kitchen,
    }).sort({ date: 'desc' }).populate('khaabay.khaaba').populate('user', ['-password'])

    console.log(orders)
    return res.status(200).json({
        activeOrders: orders
            .filter(order => order.status !== 'Completed' && order.status !== "Cancelled" && order.status !== "Ready")
    })

})


module.exports = router