const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')
const Chef = require('../models/chef')
const config = require('config')
const axios = require('axios')
const multer = require('multer')
const Kitchen = require('../models/kitchen')

const {
    USER_ALREADY_EXISTS,
    SERVER_ERROR,
    INVALID_CREDITS,
} = require('../utils/errors')


const storage = multer.diskStorage({
    destination: `${config.get('kitchen_logo_path')}`,
    filename: function (req, file, callback) {
        callback(null, `${uuid()}_` + file.originalname);
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
router.post('/change-pass/chef', auth, async (req, res) => { // for testing without token
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
            function (err, docs) {
                if (err) {
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }
                else {
                    const updObj = Chef.findOne({ _id: req.user.id }).populate('kitchen');
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
router.post('/change-pass/customer', auth, async (req, res) => { // for testing without token
    const {
        password,
    } = req.body


    try {

        const salt = await bcrypt.genSalt(10)

        const newPassword = await bcrypt.hash(password, salt)

        User.updateOne({ _id: req.user.id },//"60573d5785214d0bc5b0f9b7"},//req.user.id},//  
            {
                $set:
                {
                    password: newPassword,

                }
            },
            function (err) {
                if (err) {
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }
                else {

                    // let something = User.findOne({_id:req.user.id});
                    res.status(400).end()
                }
            });

    } catch (err) {
        return res
            .status(400)
            .json({ errors: [INVALID_CREDITS] });
    }
})


//////////          Change Chef profile (excluding kitchen logo)
router.post('/change-profile/chef', [auth, upload.single('logo')], async (req, res) => { // final
    //router.post('/change-profile/chef',  async (req, res) => { // for testing without token
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

        const retProfile = await Chef.findOne({ _id: req.user.id }) //"60573d5785214d0bc5b0f9b7"})//req.user.id}) // get the chef object from db

        if (email != (retProfile).email) // check if new email is different from stored
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
        const coords = result.data.results[0].geometry.location

        Chef.updateOne({ _id: req.user.id },//"60573d5785214d0bc5b0f9b7"},//req.user.id},//  
            {
                $set:
                {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    address: { addr: address, city: toString(city).toUpperCase(), coords: coords },
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

        Kitchen.updateOne({ _id: (retProfile.kitchen) },//req.user.id},  
            {
                $set:
                {
                    title: title,
                    activeHours: { startingHour: startingHour, endingHour: endingHour },
                    description: description,
                    logo: req.file.path
                }
            },
            function (err, docs) {
                if (err) {
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }
                else {
                    const updObj = Chef.findOne({ _id: req.user.id }).populate('kitchen');
                    return res.status(200).json(updObj);

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
router.post('/change-profile/customer', auth, async (req, res) => {

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
        const retProfile = User.findOne({ _id: req.user.id })

        if (email != (await retProfile).email) {
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
        const coords = result.data.results[0].geometry.location

        User.updateOne({ _id: req.user.id },
            {
                $set:
                {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    city: city,
                    phone: phone,
                    address: { addr: toString(address).toLowerCase(), city: toString(city).toLowerCase(), coords: coords }
                }
            },
            function (err) {
                if (err) {
                    res.status(400).json({
                        error: [SERVER_ERROR]
                    })
                }
                else {
                    const updObj = User.findOne({ _id: req.user.id }).populate('kitchen');
                    return res.status(200).json(updObj);
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
