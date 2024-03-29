const express = require('express')
const router = express.Router()
const { auth, customerAuth } = require('../middlewares/auth')
const User = require('../models/user')
const Kitchen = require('../models/kitchen')
const Khaaba = require('../models/khaaba')
const Order = require('../models/order')

const {
    SERVER_ERROR,
} = require('../utils/errors')

router.post('/review/:id', customerAuth, async (req, res) => {
    let kitchenID
    const {
        rating,
        review
    } = req.body
    console.log(review)
    kitchenID = req.params.id
    try {
        await Kitchen.updateOne(
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

    let KitchenObject = await Kitchen.findOne({
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

router.get('/order-history', customerAuth, async (req, res) => {

    try {


        let orders = await Order.find({
            user: req.user.id
        }).sort({ date: "desc" }).populate('khaabay.khaaba').populate('kitchen', ['title', 'reviews'])

        console.log(orders)

        return res.status(200).json(
            {
                orders: orders
                    .filter(order => order.status !== 'Pending' && order.status !== "Preparing")
            }
        )

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }
})

router.get('/active-orders', customerAuth, async (req, res) => {

    let orders = await Order.find({
        user: req.user.id,
    }).sort({ date: 'desc' }).populate('khaabay.khaaba').populate('kitchen', ['title', 'reviews'])


    return res.status(200).json({
        activeOrders: orders
            .filter(order => order.status !== 'Completed' && order.status !== "Cancelled" && order.status !== "Ready")
    })
})

router.get('/pickup/:id', customerAuth, async (req, res) => {
    try {

        const orderID = req.params.id
        const order = await Order.findOne({ _id: orderID })

        order.status = 'Completed';
        order.save(function (err) {

            if (err) {
                console.error(err)
                return res.status(400).json({ errors: [UPDATE_ERROR] })
            }
            else {
                return res.status(200).end()
            }

        });
    } catch (err) {
        console.error(err)
        res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }
})

router.post('/order', customerAuth, async (req, res) => {
    try {
        const {
            kitchenID,
            khaabay
        } = req.body


        const user = await User.findOne({
            _id: req.user.id
        })

        const kitchen = await Kitchen.findOne({
            _id: kitchenID
        })

        const orderFields = {
            user: user.id,
            kitchen: kitchen.id,
            khaabay: [...khaabay]
        }

        let totalPrice = 0;

        const khaabaMapQ = {}
        const khaabaIDs = []

        khaabay.forEach(k => {
            khaabaMapQ[k.khaaba] = k.quantity
            khaabaIDs.push(k.khaaba)
        })

        console.log(khaabaMapQ)

        const orderKhaabay = await Khaaba.find({
            _id: {
                $in: khaabaIDs
            }
        })



        orderKhaabay.forEach(k => {
            if (k.instantKhaaba.isInstant) {
                if (k.instantKhaaba.availableServings < khaabaMapQ[k.id]) {
                    return res.status(400).json({
                        errors: ['CHECKOUT_MESSAGE'],
                        message: `${k.title} does not have that much available servings.`
                    })
                } else {
                    Khaaba.findOne({
                        _id: k.id
                    }).then(instantKhaaba => {
                        instantKhaaba.instantKhaaba.availableServings -= khaabaMapQ[k.id]
                        instantKhaaba.save()
                    })

                }
            }

            totalPrice += (k.price * khaabaMapQ[k.id])
        })

        orderFields.totalPrice = totalPrice

        const order = new Order(orderFields)

        await order.save()

        user.orders.push(order.id)

        await user.save()

        kitchen.orders.push(order.id)

        await kitchen.save()

        return res.status(200).json({
            order
        })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }


})


module.exports = router