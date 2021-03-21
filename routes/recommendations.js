const express = require('express')
const router = express.Router()
const config = require('config')
const axios = require('axios')
const Chef = require('../models/chef')
const Kitchen = require('../models/kitchen')


router.get('/popkitchens', async (req, res) => {

    if (req.query.lat && req.query.lng) {
        return res.send(`${req.query.lat} ${req.query.lng}`)
    }

    const mapUri = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=36,70&destinations=70,80&key=${config.get('google_maps_api_key')}`

    const response = await axios.get(mapUri)

    res.json({
        data: response.data
    })

})

module.exports = router