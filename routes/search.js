const express = require('express')
const router = express.Router()
const Kitchen = require('../models/kitchen')
const { SERVER_ERROR } = require('../utils/errors')


router.get('/:q/:page', async (req, res) => {
    try {

        const pageNumber = req.params.page
        const query = req.params.q.split(',')
        console.log(query)

        const kitchens = await Kitchen.find({
            $or: [
                {
                    title: {
                        $in: query.map(q => new RegExp(q, "i"))
                        // $regex: new RegExp(req.params.q, "i")
                    }
                },
                {
                    description: {
                        $in: query.map(q => new RegExp(q, "i"))
                    }
                },
                {
                    tags: {
                        $in: query.map(q => new RegExp(q, "i"))
                        // $regex: '.*' + req.params.q + '.*' 
                    }
                }
            ]
        }
        ).skip((pageNumber - 1) * 8).limit(8)

        return res.status(200).json({
            kitchens
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }
})


module.exports = router