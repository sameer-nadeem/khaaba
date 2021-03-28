const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
const kitchen = require('../models/kitchen')

const {
    SERVER_ERROR,
} = require('../utils/errors')

router.post('/review/:id', auth, async (req, res) => {
    let kitchenID
    const {
        rating,
        review
    } = req.body

    kitchenID = req.params.id
    try {
        await kitchen.updateOne(
            { _id: kitchenID },
            {
                $push: {
                    reviews: {
                        rating: rating,
                        review: review
                    }
                }
            }
        )
        return res.status(200).end()
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }


})


router.get('/view-reviews/:id', async (req, res) => {

    let kitchenID = req.params.id

    let KitchenObject = await kitchen.findOne({
        _id: kitchenID
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

router.get('/order-history', auth, async (req, res) => {

    let user = await User.findOne({
        _id: req.user.id//"605e1450ba483329d8645755"
    }).populate('orders')

    if (!user) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }

    return res.status(200).json(
        {
            orders: user.orders
        }
    )
})

router.get('/active-orders', auth, async (req, res) => {

    console.log(req.user)
    let user = await User.findOne({
        _id: req.user.id//"605e1450ba483329d8645755"
    })
    if (!user) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }

    const orders = user.orders

    return res.status(200).json({
        activeOrders: orders.filter(order => order.isComplete)
    })
})

module.exports = router