const express = require('express')
const router = express.Router()
const config = require('config')
const axios = require('axios')
const Chef = require('../models/chef')
const Kitchen = require('../models/kitchen')
const User = require('../models/user')
const auth = require('../middlewares/auth')
const completeOrder = require('../models/completeOrder')
const {
    SERVER_ERROR
} = require('../utils/errors')

const getDistance = (coords1, coords2) => {

    const lat1 = coords1.lat
    const lng1 = coords1.lng

    const lat2 = coords2.lat
    const lng2 = coords2.lng

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d / 1000 //in kms

}

router.get('/bylocation/:lat/:lng', async (req, res) => {

    try {
        const coords = {
            lat: req.params.lat,
            lng: req.params.lng
        }
        let chefs = []

        const mapUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&result_type=administrative_area_level_2&key=${config.get('google_maps_api_key')}`

        const response = await axios.get(mapUri)

        const city = response.data.results[0].address_components[0].long_name.toUpperCase()

        console.log(city)

        chefs = await Chef.find({
            'address.city': city
        }).populate('kitchen')

        chefs = chefs.filter(chef => getDistance(coords, chef.address.coords) < config.get('recommendation_radius_km'))

        chefs.sort((c1, c2) => {
            return c2.averageRating - c1.averageRating
        })

        return res.status(200).json({
            chefs: chefs.splice(0, 5)
        })

    } catch (error) {

    }


})

router.get('/byhistory', auth, async (req, res) => {
    try {

        const orders = await completeOrder.find({
            user: req.user.id
        }).populate('khaabay').sort({
            date: 'desc'
        }).limit(4)

        console.log(orders)

        if (orders.length === 0) {
            return res.redirect('/recommendations/bypopularity')
        }

        const khaabay = []

        orders.forEach(order => {
            khaabay.push(...order.khaabay)
        })

        return res.status(200).json({
            khaabay: khaabay.slice(0, 4)
        })

    } catch (error) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }

})

router.get('/bypopularity/:city', async (req, res) => {

    try {

        const city = req.params.city.toUpperCase()

        const chefs = await Chef.find({
            'address.city': city,
        }).sort({ averageRating: 'desc' }).limit(4).populate('kitchen', 'khaabay').populate('khaabay')

        const khaabay = []

        chefs.forEach(chef => {
            khaabay.push(...chef.kitchen.khaabay)
        })

        return res.status(200).json({
            khaabay: khaabay.slice(0, 4)
        })

    } catch (error) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }
})


module.exports = router