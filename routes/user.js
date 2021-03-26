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
    await kitchen.updateOne(
        { _id : kitchenID},
        {$push : { reviews: {
            rating : rating,
            review : review
        }}}
    )
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

    //     try{
    //     KitchenObject.reviews.push({
    //         rating, review
    //     })
    //     console.log(KitchenObject)
    // } catch (error) {
    //     console.error(error);
    //     res.status(400).json({
    //         error: ['server_error']
    //     })
// }
        
     
    return res.status(200).json({
        blabal: ['getting']
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

    let returnObject = KitchenObject.reviews

    return res.status(200).json({
        returnObject
    })
})


module.exports = router