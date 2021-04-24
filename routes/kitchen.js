const express = require("express");
const router = express.Router();
const Khaaba = require("../models/khaaba");
const { auth, chefAuth } = require("../middlewares/auth");
const { SERVER_ERROR } = require("../utils/errors");
const config = require('config')
const uuid = require('uuid').v4

const multer = require('multer');
const category = require("../models/category");

const storage = multer.diskStorage({
  destination: `${config.get('dish_thumbnail_path')}`,
  filename: function (req, file, callback) {
      callback(null, `${uuid()}_` + file.originalname.split(" ").join("-"));
  },
  onError: function (err, next) {
      console.log('error', err);
      next(err);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

// ADD Menu item
router.post("/add-khaaba", chefAuth, upload.single('logo') ,async (req, res) => {
  
  

  const {
    title,
    expiryTime,
    description,
    price,
    categories,
    isInstantKhaaba,
    servings
} = req.body
  
  
  
  
  let khaabaFields = {};

  if (req.body.title) khaabaFields.title = req.body.title;
  if (req.body.price) khaabaFields.price = req.body.price;
  if (req.body.description) khaabaFields.description = req.body.description;


  // khaabaFields.kitchen = req.user.kitchen

  console.log(req.body.categories)
  console.log(req.body.categories.split(","))

  try {

    let khaaba = new Khaaba(khaabaFields);
    khaaba.kitchen = req.user.kitchen
    if (req.body.isInstantKhaaba == 'true') {
      khaaba.instantKhaaba.isInstant = true
      khaaba.instantKhaaba.availableServings = req.body.servings;
    }

    let logoPath = ''

    if (req.file) {
      logoPath = req.file.filename
  }
    khaaba.thumbnail = `${logoPath}`

    if (req.body.categories) {
      let cat1 = new category
      cat1.title = req.body.categories.split(",")[0]
      cat1.expiry = 0
      khaaba.category.push(cat1)  
    }
    await khaaba.save();

    return res.status(200).json({ khaaba });
  } catch (error) {
    
    console.error(error.message);
    return res
      .status(400)
      .json({ errors: [SERVER_ERROR] });
  }
});


router.post("/edit-khaaba/:id", chefAuth, upload.single('dishlogo'), async (req, res) => {
  try {
    const id = req.params.id

    let khaaba = await Khaaba.findOne({
      _id: id
    })

    console.log(req.body.title)

    if (req.body.title) khaaba.title = req.body.title;
    if (req.body.price) khaaba.price = req.body.price;
    if (req.body.description) khaaba.description = req.body.description;
    if (req.body.category) khaaba.category = req.body.category;

    if (req.body.isInstantKhaaba == 'true') {
      if (khaaba.instantKhaaba.availableServings)
      {
        khaaba.instantKhaaba.availableServings = req.body.servings;
      } 
    }

    let logoPath = ''

    if (req.file) {
      
        logoPath = req.file.filename
        console.log("it is setting thumbnail!!!!!: ",req.file.filename)
        khaaba.thumbnail = `${logoPath}`
        console.log("new  thumbnail!!!!!: ",khaaba.thumbnail)
        }
    


    await khaaba.save()
    return res.status(200).json({ khaaba });

  } catch (error) {
    return res
      .status(400)
      .json({ errors: SERVER_ERROR });
  }

});

router.get("/get-menu/:id", async (req, res) => {

  console.log(`got a messageeeee!!!!!!!!!: ${req.params.id}`)

  const id = req.params.id
  try {
    const khaabas = await Khaaba.find({
      kitchen: id
    });

    return res.status(200).json({
      khaabas
    });

  } catch (error) {

    console.log("error:  ", error)
    
    return res
      .status(400)
      .json({ errors: SERVER_ERROR });
  }


});

module.exports = router