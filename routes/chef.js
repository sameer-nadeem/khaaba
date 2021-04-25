const express = require('express')
const router = express.Router()
const { auth, chefAuth } = require('../middlewares/auth')
const Order = require('../models/order')
const Kitchen = require('../models/kitchen')
const Chef= require('../models/chef')


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

router.get('/analytics', chefAuth, async (req, res) => {

    let numOrders = await Order.countDocuments({
        kitchen: req.user.kitchen,
        status: 'Completed'
    })

    let KitchenObject = await Kitchen.findOne({
        _id: req.user.kitchen
    })

    let kitchenAvgRating = KitchenObject.avgRating

    // console.log(numOrders)
    // console.log(kitchenAvgRating)
    return res.status(200).json({
        numOrders,
        kitchenAvgRating
    })
    

})

router.get('/chef-details', chefAuth, async (req, res) => {

    let chefObject = await Chef.findOne({
        _id : req.user.id,
    })

    let KitchenObject = await Kitchen.findOne({
        _id: req.user.kitchen
    })

    

    // console.log(numOrders)
    // console.log(kitchenAvgRating)
    return res.status(200).json({
        kitchenName: KitchenObject.title,
        kitchenLogo: KitchenObject.logo,
        kitchenAddress: chefObject.address.addr,
        kitchenPhone: chefObject.phone,
        kitchenhours: KitchenObject.activeHours,
    })
    

})

router.get('/view-reviews', chefAuth, async (req, res) => {



    let KitchenObject = await Kitchen.findOne({
        _id: req.user.kitchen
    })
    if (!KitchenObject) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }

    let kitchenReviews = KitchenObject.reviews

    return res.status(200).json({
        kitchenReviews,
        avgRating: KitchenObject.avgRating
    })
})

router.get('/orders-by-date', chefAuth, async (req, res) => {

    let today = new Date();

    let orders = await Order.find({
        kitchen: req.user.kitchen,
    })

    let orderSizeArr = []
    if(today.getDate()>4)
    {
    for (var i = 0; i < 5; i++) {
        let order1 = orders.filter(order => order.date.getDate() === (today.getDate()-i) && order.date.getMonth() === today.getMonth() &&  order.date.getFullYear() === today.getFullYear()  )
        orderSizeArr.push( order1.length)
      }}
    else{
        for (var i = 0; i < today.getDate(); i++) {
            let order1 = orders.filter(order => order.date.getDate() === (today.getDate()-i) && order.date.getMonth() === today.getMonth() &&  order.date.getFullYear() === today.getFullYear()  )
            orderSizeArr.push( order1.length)
          }
          for (var i = 0; i < 5-today.getDate(); i++) {
            let order1 = orders.filter(order => order.date.getDate() === (30-i) && order.date.getMonth() === (today.getMonth()-1) &&  order.date.getFullYear() === today.getFullYear()  )
            orderSizeArr.push( order1.length)
          }

    }

    return res.status(200).json({
        orders: orderSizeArr
    })

})

router.get('/orders-by-month', chefAuth, async (req, res) => {

    let today = new Date();

    let orders = await Order.find({
        kitchen: req.user.kitchen,
    })

    let orderSizeArr = []
    if(today.getDate()>4)
    {
    for (var i = 0; i < 5; i++) {
        let order1 = orders.filter(order =>  order.date.getMonth() === (today.getMonth()-i) &&  order.date.getFullYear() === today.getFullYear()  )
        orderSizeArr.push( order1.length)
      }}
    else{
        for (var i = 0; i < today.getDate(); i++) {
            let order1 = orders.filter(order => order.date.getMonth() === (today.getMonth()-i) &&  order.date.getFullYear() === today.getFullYear()  )
            orderSizeArr.push( order1.length)
          }
          for (var i = 0; i < 5-today.getMonth(); i++) {
            let order1 = orders.filter(order => order.date.getMonth() === (12-i) &&  order.date.getFullYear() === today.getFullYear()-1  )
            orderSizeArr.push( order1.length)
          }

    }

    return res.status(200).json({
        orders: orderSizeArr
    })

})

module.exports = router