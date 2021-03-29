const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const Order = require('../models/order')

const {
    SERVER_ERROR,
    UPDATE_ERROR,
} = require('../utils/errors')

// chef accept order
router.get('/accept/:id', auth, async (req, res) => {

    try {

        const orderID = req.params.id
        const order = await Order.findOne({ _id: orderID })
        order.status = 'Preparing'

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
});


//chef update order status ready
router.get('/ready/:id', auth, async (req, res) => {

    try {

        const orderID = req.params.id

        const order = await Order.findOne({ _id: orderID })
        order.status = 'Ready'

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
});


//customer cancel order
router.get('/cancel/:id', auth, async (req, res) => {

    try {

        const orderID = req.params.id
        const order = await Order.findOne({ _id: orderID })

        order.status = 'Cancelled';
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
});


module.exports = router