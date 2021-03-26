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
const kitchen = require('../models/kitchen')





module.exports = router