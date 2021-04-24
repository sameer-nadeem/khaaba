const express = require('express')
const router = express.Router()
const { auth, chefAuth, customerAuth } = require('../middlewares/auth')
const User = require('../models/user')
const Chef = require('../models/chef')
const config = require('config')
const axios = require('axios')
const uuid = require('uuid').v4
const multer = require('multer')
const Kitchen = require('../models/kitchen')
const bcrypt = require("bcryptjs")

const {
    USER_ALREADY_EXISTS,
    SERVER_ERROR,
    INVALID_CREDITS,
} = require('../utils/errors')


const storage = multer.diskStorage({
    destination: `${config.get('kitchen_logo_path')}`,
    filename: function (req, file, callback) {
        callback(null, `${uuid()}_` + file.originalname.split(' ').join('-'));
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
});



////// change Password
//         Chef 
router.post('/change-pass/chef', chefAuth, async (req, res) => { // for testing without token
    const {
        password,
    } = req.body


    try {

        const salt = await bcrypt.genSalt(10)

        const newPassword = await bcrypt.hash(password, salt)

        Chef.updateOne({ _id: req.user.id },//"60573d5785214d0bc5b0f9b7"},//req.user.id},//  
            {
                $set:
                {
                    password: newPassword,

                }
            },
            async (err, docs) => {
                if (err) {
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }
                else {
                    const updObj = await Chef.findOne({ _id: req.user.id }).populate('kitchen');
                    return res.status(200).json(updObj);

                }
            });

    } catch (err) {
        return res
            .status(400)
            .json({ errors: [SERVER_ERROR] });
    }
})

////// change Password
//         customer 
router.post('/change-pass/customer', customerAuth, async (req, res) => { // for testing without token
    const {
        password,
    } = req.body
    console.log(`Password Recieved`, password)

    try {
        //console.log(`h1`)

        const salt = await bcrypt.genSalt(10)
        //console.log(`h2`)
        const newPassword = await bcrypt.hash(password, salt)

        //console.log(`h3`,newPassword)
        User.updateOne({ _id: req.user.id },//"60573d5785214d0bc5b0f9b7"},//req.user.id},//  
            {
                $set:
                {
                    password: newPassword,
                }
            },
            function (err) {
                if (err) {
                    //console.log(`new error`,err)
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }
                else {
                    // let something = User.findOne({_id:req.user.id});
                    //console.log(`else case`,err)
                    res.status(200).end()
                }
            }
        );

    } catch (err) {
        //console.log(`this is the error`,err)
        return res
            .status(400)
            .json({ errors: [INVALID_CREDITS] });
    }
})

//console.log(`in prof`)
//////////          Change Chef profile (excluding kitchen logo)
router.post('/change-profile/chef', chefAuth, async (req, res) => { // final
    //router.post('/change-profile/chef',  async (req, res) => { // for testing without token
    console.log(`Ova here`, req.body)
    const {
        email,
        address,
        city,
        phone,
        firstName,
        lastName,
        title,
        start,
        end,
        description,
        //logo
    } = req.body

    //console.log(`startingHour`,startingHour)
    try {

        const retProfile = await Chef.findOne({ _id: req.user.id }) //"60573d5785214d0bc5b0f9b7"})//req.user.id}) // get the chef object from db
        console.log(`retprofile`, retProfile.email)
        console.log(email)
        if (email !== retProfile.email) // check if new email is different from stored
        {
            const isChefReg = await User.exists({   // check if the new email is already in use (also appliesto using the same one again)
                email
            })

            if (isChefReg) {
                return res.status(400).json({
                    errors: [USER_ALREADY_EXISTS]
                })
            }
        }

        const mapuri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.get('google_maps_api_key')}`

        const result = await axios.get(mapuri)
        let coords = {
            lat: 31.5203696,
            lng: 74.35874729999999
        }

        if (result.data.status !== "ZERO_RESULTS") {
            coords = result.data.results[0].geometry.location
        }
        Chef.updateOne({ _id: req.user.id },//"60573d5785214d0bc5b0f9b7"},//req.user.id},//  
            {
                $set:
                {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    address: { addr: address, city: city.toUpperCase(), coords },
                    city: city,

                }
            },
            function (err) {
                if (err) {
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }

            });

        //console.log(`Active hours`,startingHour, endingHour)
        Kitchen.updateOne({ _id: (retProfile.kitchen) },//req.user.id},  
            {


                $set:
                {
                    title: title,
                    activeHours: { start: start, end: end },
                    description: description,
                    //logo: req.file.path
                }
            },
            async (err, docs) => {
                if (err) {
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }
                else {
                    const updObj = await Chef.findOne({ _id: req.user.id }).populate('kitchen');
                    return res.status(200).json({ updObj });

                }
            });

    } catch (err) {
        console.error(err.message)
        res.status(400).json({
            error: [SERVER_ERROR]
        })
    }
})

router.post('/change-profile/cheflogo', [chefAuth, upload.single('logo')], async (req, res) => { // final
    //router.post('/change-profile/chef',  async (req, res) => { // for testing without token
    // console.log(`Ova here`,req.body )
    const {
        email,
        address,
        city,
        phone,
        firstName,
        lastName,
        title,
        start,
        end,
        description,
        //logo
    } = req.body

    //console.log(`startingHour`,startingHour)
    try {

        const retProfile = await Chef.findOne({ _id: req.user.id }) //"60573d5785214d0bc5b0f9b7"})//req.user.id}) // get the chef object from db


        //console.log(`Active hours`,startingHour, endingHour)profile.kitchen.logo
        Kitchen.updateOne({ _id: (retProfile.kitchen) },//req.user.id},  
            {


                $set:
                {
                    // title: title,
                    // activeHours: { start: start, end: end },
                    // description: description,
                    logo: req.file.filename
                }
            },
            async (err, docs) => {
                if (err) {
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }
                else {
                    const updObj = await Chef.findOne({ _id: req.user.id }).populate('kitchen');
                    return res.status(200).json({ updObj });

                }
            });

    } catch (err) {
        console.error(err.message)
        res.status(400).json({
            error: [SERVER_ERROR]
        })
    }
})



/////////           Change Customer Profile
router.post('/change-profile/customer', customerAuth, async (req, res) => {

    const {
        email,
        address,
        city,
        phone,
        firstName,
        lastName,

    } = req.body
    console.log(`REQ BODY`, req.body)
    try {

        // retrive obect
        const retProfile = await User.findOne({ _id: req.user.id })
        console.log(`retprofile`, retProfile.email)
        console.log(email)

        if (email !== retProfile.email) {
            const isUserReg = await User.exists({   // check if the new email is already in use (also appliesto using the same one again)
                email
            })

            if (isUserReg) {
                return res.status(400).json({
                    errors: [USER_ALREADY_EXISTS]
                })
            }
        }
        const mapuri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.get('google_maps_api_key')}`

        const result = await axios.get(mapuri)
        let coords = {
            lat: 31.5203696,
            lng: 74.35874729999999
        }

        if (result.data.status !== "ZERO_RESULTS") {
            coords = result.data.results[0].geometry.location
        }
        User.updateOne({ _id: req.user.id },
            {
                $set:
                {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    city: city,
                    phone: phone,
                    address: { addr: address, coords, city: city.toUpperCase() }
                }
            },
            async (err) => {
                if (err) {
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }
                else {
                    const updObj = await User.findOne({ _id: req.user.id });
                    return res.status(200).json({ updObj });
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
