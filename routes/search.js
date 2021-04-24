const express = require('express')
const router = express.Router()
const Kitchen = require('../models/kitchen')
const { SERVER_ERROR } = require('../utils/errors')
const Khaaba = require('../models/khaaba')


router.get('/all/:page/:sort', async (req, res) => {
    try {

        const pageNumber = req.params.page
        const sortparam = req.params.sort
        console.log(pageNumber)
        let kID = JSON.parse(JSON.stringify(await Kitchen.find().select('reviews.rating')))

        if (sortparam === 'ratingd') {
            kID.sort((c1, c2) => {
                return c2.avgRating - c1.avgRating
            })
        } else if (sortparam === 'ratinga') {
            kID.sort((c1, c2) => {
                return c1.avgRating - c2.avgRating
            })
        }

        kID = kID.slice((pageNumber - 1) * 8, (pageNumber - 1) * 8 + 8)
        console.log('i', kID)

        const kitchens = await Kitchen.find({
            _id: {
                $in: kID.map(k => k._id)
            }
        })


        if (sortparam === 'ratingd') {
            kitchens.sort((c1, c2) => {
                return c2.avgRating - c1.avgRating
            })
        } else if (sortparam === 'ratinga') {
            kitchens.sort((c1, c2) => {
                return c1.avgRating - c2.avgRating
            })
        }


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
router.get('/all-instant/:page/:sort', async (req, res) => {
    try {

        const pageNumber = req.params.page
        const sortparam = req.params.sort
        let sort = {
            price: 1
        };
        if (sortparam === 'pricea') {
            sort = {
                price: 1
            }
        }
        if (sortparam === 'priced') {
            sort = {
                price: -1
            }
        }
        if (sortparam === 'servings') {
            sort = {
                'instantKhaaba.isInstant.availableServings': -1
            }
        }
        const khaabay = await Khaaba.aggregate(
            [
                {
                    $match: {
                        'instantKhaaba.isInstant': true
                    }
                },
                { $sort: sort },
                { $skip: (pageNumber - 1) * 8 },
                { $limit: 8 }

            ]
        )


        // const khaabay = await Khaaba.find({
        //     'instantKhaaba.isInstant': true
        // }).skip((pageNumber - 1) * 8).limit(8)

        return res.status(200).json({
            khaabay
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }
})

router.get('/:q/:page/:sort', async (req, res) => {
    try {

        const pageNumber = req.params.page
        const query = req.params.q.split(',')
        const sortparam = req.params.sort

        let kID = JSON.parse(JSON.stringify(await Kitchen.find(
            {
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
        ).select('reviews.rating')))

        if (sortparam === 'ratingd') {
            kID.sort((c1, c2) => {
                return c2.avgRating - c1.avgRating
            })
        } else if (sortparam === 'ratinga') {
            kID.sort((c1, c2) => {
                return c1.avgRating - c2.avgRating
            })
        }

        kID = kID.slice((pageNumber - 1) * 8, (pageNumber - 1) * 8 + 8)
        console.log(kID)

        const kitchens = await Kitchen.find({
            _id: {
                $in: kID.map(k => k._id)
            }
        })


        if (sortparam === 'ratingd') {
            kitchens.sort((c1, c2) => {
                return c2.avgRating - c1.avgRating
            })
        } else if (sortparam === 'ratinga') {
            kitchens.sort((c1, c2) => {
                return c1.avgRating - c2.avgRating
            })
        }


        return res.status(200).json({
            kitchens
        })
        // const kitchens = await Kitchen.aggregate([
        //     {
        //         $match: {
        //             $or: [
        //                 {
        //                     title: {
        //                         $in: query.map(q => new RegExp(q, "i"))
        //                         // $regex: new RegExp(req.params.q, "i")
        //                     }
        //                 },
        //                 {
        //                     description: {
        //                         $in: query.map(q => new RegExp(q, "i"))
        //                     }
        //                 },
        //                 {
        //                     tags: {
        //                         $in: query.map(q => new RegExp(q, "i"))
        //                         // $regex: '.*' + req.params.q + '.*' 
        //                     }
        //                 }
        //             ]
        //         }
        //     },
        //     { $sort: { title: -1 } },
        //     { $skip: (pageNumber - 1) * 8 },
        //     { $limit: 8 }

        // ])


        // const kitchens = await Kitchen.find({
        //     $or: [
        //         {
        //             title: {
        //                 $in: query.map(q => new RegExp(q, "i"))
        //                 // $regex: new RegExp(req.params.q, "i")
        //             }
        //         },
        //         {
        //             description: {
        //                 $in: query.map(q => new RegExp(q, "i"))
        //             }
        //         },
        //         {
        //             tags: {
        //                 $in: query.map(q => new RegExp(q, "i"))
        //                 // $regex: '.*' + req.params.q + '.*' 
        //             }
        //         }
        //     ]
        // }
        // ).sort(sort).skip((pageNumber - 1) * 8).limit(8)

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }
})


module.exports = router