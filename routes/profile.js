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

const {
    USER_ALREADY_EXISTS,
    SERVER_ERROR,
    INVALID_CREDITS,
} = require('../utils/errors')
const kitchen = require('../models/kitchen')
// return information to the stuff

 

////// change Password
//         customer and chef
router.post('/change_pass/customer',  async (req, res) => { // for testing without token
    const {
            password,
    } = req.body


    try {

        const salt = await bcrypt.genSalt(10)

        const newPassword = await bcrypt.hash(password, salt)

        Chef.updateOne({ _id:req.user.id},//"60573d5785214d0bc5b0f9b7"},//req.user.id},//  
        {$set: 
            {  
                password: newPassword,

            } }, 
                function (err, docs) { 
        if (err){ 
            res.status(400).json({
                error: [SERVER_ERROR]
            })
        } 
        else{ 
            return docs;
            
    }
    });

    } catch(err){
        return res
        .status(400)
        .json({ errors: [INVALID_CREDITS] });
    }
})



//////////          Change Kitchen Logo

//////////          Change Chef profile (excluding kitchen logo)
//router.post('/change_profile/chef', auth,  async (req, res) => { // final
router.post('/change_profile/chef',  async (req, res) => { // for testing without token
    const {
        email,
        address,
        city,
        phone,
        firstName,
        lastName,
        title,
        startingHour,
        endingHour,
        description,
    } = req.body


    try {

        const retProfile = await Chef.findOne({_id:"60573d5785214d0bc5b0f9b7"})//req.user.id}) // get the chef object from db
        
        if (email != (retProfile).email ) // check if new email is different from stored
        {
            const isChefReg = await User.exists({   // check if the new email is already in use (also appliesto using the same one again)
                email
            })

            if (isChefReg ) {
                return res.status(400).json({
                    errors: [USER_ALREADY_EXISTS]
                })
            }
        }
       
        const mapuri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.get('google_maps_api_key')}`

        const result = await axios.get(mapuri)
        const coords = result.data.results[0].geometry.location

        Chef.updateOne({ _id:"60573d5785214d0bc5b0f9b7"},//req.user.id},//  
            {$set: 
                {   email:email,
                    firstName:firstName,
                    lastName:lastName, 
                    phone:phone,
                    address: {addr: toString(address).toLowerCase(),city:toString(city).toLowerCase(), coords:coords},
                    city: city,

                } }, 
                    function (err, docs) { 
            if (err){ 
                res.status(400).json({
                    error: [SERVER_ERROR]
                })
            } 
            else{ 
                return docs;
                
        }
        });

        console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
        console.log(retProfile.kitchen)
        kitchen.updateOne({ _id:(retProfile.kitchen)},//req.user.id},  
        {$set: 
            {   
                title: title,
                activeHours: {startingHour: startingHour, endingHour: endingHour},
                description: description,
            }}, 
                function (err, docs) { 
        if (err){ 
            res.status(400).json({
                error: [SERVER_ERROR]
            })
        } 
        else{ 
            return docs;
            
    }
    });

    } catch(err){
        console.error(err.message)
        res.status(400).json({
        error: [SERVER_ERROR]
        })
    }
})



/////////           Change Customer Profile
router.post('/change_profile/customer',auth,  async (req, res) => {

    const {
        email,
        address,
        city,
        phone,
        firstName,
        lastName,
    } = req.body

    try {

        // retrive obect
        const retProfile = User.findOne({_id: req.user.id})
        
        if (email != (await retProfile).email )
        {
            const isUserReg = await User.exists({   // check if the new email is already in use (also appliesto using the same one again)
                email
            })

            if (isUserReg ) {
                return res.status(400).json({
                    errors: [USER_ALREADY_EXISTS]
                })
            }
        }
            const mapuri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.get('google_maps_api_key')}`

            const result = await axios.get(mapuri)
            const coords = result.data.results[0].geometry.location

            User.updateOne({_id: req.user.id},  
                {$set: 
                    {   email:email,
                        firstName:firstName,
                        lastName:lastName, 
                        city: city,
                        phone:phone,
                        address: {addr: toString(address).toLowerCase(),city: toString(city).toLowerCase(), coords:coords}  
                    } }, 
                        function (err, docs) { 
                if (err){ 
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                } 
                else{ 
                    return docs;
            }
            });

    } catch (err) {
        console.error(err.message)
        res.status(400).json({
        error: [SERVER_ERROR]
        })
    }
})


module.exports = router
