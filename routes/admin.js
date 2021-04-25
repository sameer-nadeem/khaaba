const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Chef = require('../models/chef')
const Kitchen = require('../models/kitchen')
const config = require('config')
const axios = require('axios')
const multer = require('multer')
const uuid = require('uuid').v4
const Admin = require('../models/admin')


router.get('/get-admins', async (req, res) => {

    let admins = await Admin.find();
    
    return res.status(200).json({
        adminList: admins
   })

})
module.exports = router