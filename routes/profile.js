const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Chef = require('../models/chef')
const Kitchen = require('../models/kitchen')

// for jwt authentication
const config = require('config')

// for files
const axios = require('axios')


const path = require('path')

// for file upload

const chef = require('../models/chef')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback(null, '_' + file.originalname);
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    }
});


// // change Password
//         //customer
// router.post('/change_pass/customer', async (req, res) => {
// })
//         //chef
// router.post('/change_pass/chef', async (req, res) => {
// })



// change customer profile
router.post('/change_profile/customer', async (req, res) => {

    const {
        email,
        address,
        //city,
        phone,
        firstName,
        lastName,
    } = req.body

    try {
        
            const isUserReg = await User.exists({   // check if the new email is already in use (also appliesto using the same one again)
                email
            })

            if (isUserReg) {
                return res.status(400).json({
                    errors: ['user_already_exists']
                })
            }

            const mapuri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.get('google_maps_api_key')}`

            const result = await axios.get(mapuri)
            const coords = result.data.results[0].geometry.location

            // email,
            // password,
            // address: {
            //     addr: address,
            //     city,
            //     coords
            // },
            // phone,
            // firstName,
            // lastName


            User.updateOne({email: email},  
                {$set: 
                    {   email:email,
                        firstName:firstName,
                        lastName:lastName, 
                        phone:phone,
                        // address: {addr: address,city: city, coords:coords}  } }, 
                        address: {addr: address, coords:coords}  } },
                        function (err, docs) { 
                if (err){ 
                    res.status(400).json({
                        error: ['server_error']
                    })
                } 
                else{ 
                    
                    
                } 
            });



    } catch (err) {
        console.error(err.message)
        res.status(400).json({
        error: ['server_error']
        })
    }
})


// // change chef profile
// router.post('/change_profile/chef', async (req, res) => {
// })


module.exports = router
