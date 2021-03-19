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
const uuid = require('uuid').v4
const {
    USER_ALREADY_EXISTS,
    SERVER_ERROR,
    INVALID_CREDITS,
} = require('../utils/errors')


const storage = multer.diskStorage({
    destination: './public/uploads/',
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



router.post('/signup/customer', async (req, res) => {

    const {
        email,
        password,
        address,
        phone,
        firstName,
        lastName,

    } = req.body

    try {
        const isUserReg = await User.exists({
            email
        })

        if (isUserReg) {
            return res.status(400).json({
                errors: [USER_ALREADY_EXISTS]
            })
        }

        const mapuri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.get('google_maps_api_key')}`

        const result = await axios.get(mapuri)
        const coords = result.data.results[0].geometry.location

        const user = new User({
            email,
            password,
            address: {
                addr: address,
                coords
            },
            phone,
            firstName,
            lastName
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)


        await user.save()

        const jwtpayload = {
            user: user.id,
            type: 'customer'
        }

        jwt.sign(jwtpayload, config.get('token-secret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err
            return res.json({
                token
            })
        })
    } catch (err) {
        console.error(err.message)
        res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }

})



// router.post('/signup/chef/logo', upload.single('logo'), (req, res) => {

// })


//file upload to be done


router.post('/signup/chef', upload.single('logo'), async (req, res) => {


    const {
        email,
        password,
        address,
        phone,
        firstName,
        lastName,
        title,
        startingHour,
        endingHour,
        description,
    } = req.body
    console.log(req.file)


    console.log(req.body)

    try {
        const isChefReg = await Chef.exists({
            email
        })

        if (isChefReg) {
            return res.status(400).json({
                errors: [USER_ALREADY_EXISTS]
            })
        }

        const mapuri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.get('google_maps_api_key')}`

        const result = await axios.get(mapuri)
        const coords = result.data.results[0].geometry.location

        const chef = new Chef({
            email,
            password,
            address: {
                addr: address,
                coords
            },
            phone,
            firstName,
            lastName
        })

        const salt = await bcrypt.genSalt(10)
        chef.password = await bcrypt.hash(password, salt)

        //Creating Kitchen
        const kitchen = new Kitchen({
            title,
            logo: `${req.file.path}`,
            activeHours: {
                start: startingHour,
                end: endingHour
            },
            description
        })

        kitchen.save()

        //
        chef.kitchen = kitchen.id
        await chef.save()

        const jwtpayload = {
            user: chef.id,
            kitchen: kitchen.id,
            type: 'chef'
        }

        jwt.sign(jwtpayload, config.get('token-secret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err
            return res.json({
                token
            })
        })
    } catch (err) {

        console.error(err)
        res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }

})

router.post('/login/customer', async (req, res) => {
    let user;

    const {
        email,
        password
    } = req.body;
    try {

        user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ errors: [INVALID_CREDITS] });
        }

        //check for password
        var match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res
                .status(400)
                .json({ errors: [INVALID_CREDITS] });
        }

        //JWT Auth

        const jwtpayload = {
            user: {
                id: user.id,
                type: 'customer'
            },
        };

        jwt.sign(jwtpayload, config.get("token-secret"), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err
            res.json({ token })
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }
})

router.post('/login/chef', async (req, res) => {
    const {
        email,
        password
    } = req.body

    try {

        let chef = await Chef.findOne({
            email
        })
        if (!chef) {
            return res.status(400).json({
                errors: [INVALID_CREDITS]
            })
        }

        const match = await bcrypt.compare(password, chef.password)

        if (!match) {
            return res.status(400).json({
                errors: [INVALID_CREDITS]
            })
        }


        const jwtpayload = {
            user: chef.id,
            kitchen: chef.kitchen,
            type: 'chef'
        }

        jwt.sign(jwtpayload, config.get('token-secret'), { expiresIn: 360000 }, (err, token) => {
            if (err) { throw err }
            return res.status(200).json({
                token
            })
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }

})

module.exports = router