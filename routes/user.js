const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Chef = require('../models/chef')
const Kitchen = require('../models/kitchen')
const config = require('config')
const axios = require('axios')
const multer = require('multer')
const path = require('path')
const chef = require('../models/chef')
const kitchen = require('../models/kitchen')

router.post('/review/:id', async (req, res) => {

    let kitchenID

    const {
        rating,
        review
    } = req.body
    
    if (rating >5 || rating<0){
        
        return res.status(400).json({
        errors: ['invalid_credits']
        })
    }

    kitchenID = req.params.id
    try{
    await kitchen.updateOne(
        { _id : kitchenID},
        {$push : { reviews: {
            rating : rating,
            review : review
        }}}
    )} catch (error) {
            console.error(error);
            res.status(400).json({
                error: ['server_error']
            })
        }


    let KitchenObject = await kitchen.findOne({
        _id : kitchenID
    })
    if (!KitchenObject) {
        return res.status(400).json({
            errors: ['invalid_credits']
        })
    }
    //console.log(KitchenObject.title)
    console.log(KitchenObject)

    
        
     
    return res.status(200).json({
        status: "succusfull Update"
    })
})


router.get('/view-reviews/:id', async (req, res) => {

    let kitchenID = req.params.id

    let KitchenObject = await kitchen.findOne({
        _id : kitchenID
    })
    if (!KitchenObject) {
        return res.status(400).json({
            errors: ['invalid_credits']
        })
    }

    let kitchenReviews = KitchenObject.reviews

    return res.status(200).json({
        kitchenReviews,
        avgRating : KitchenObject.avgRating
    })
})

router.get('/order-history', auth, async (req, res) => {

    let user = await User.findOne({
        _id : req.user.id//"605e1450ba483329d8645755"
    })
    if (!user) {
        return res.status(400).json({
            errors: ['invalid_credits']
        })}


    return res.status(200).json({
        activeOrders: user.activeOrders,
        oldOrders: user.completeOrders
    })
})

router.get('/active-orders', auth, async (req, res) => {

    let user = await User.findOne({
        _id : req.user.id//"605e1450ba483329d8645755"
    })
    if (!user) {
        return res.status(400).json({
            errors: ['invalid_credits']
        })}


    return res.status(200).json({
        activeOrders: user.activeOrders,
    })
})




module.exports = router