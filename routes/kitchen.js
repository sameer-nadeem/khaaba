const express = require("express");
const router = express.Router();
const Khaaba = require("../models/khaaba");
const auth = require("../middlewares/auth");
const { SERVER_ERROR } = require("../utils/errors");





// ADD Menu item
router.post("/add-khaaba", auth, async (req, res) => {

  let khaabaFields = {};

  if (req.body.title) khaabaFields.title = req.body.title;
  if (req.body.price) khaabaFields.price = req.body.price;
  if (req.body.description) khaabaFields.description = req.body.description;
  if (req.body.category) khaabaFields.category = req.body.category;

  // khaabaFields.kitchen = req.user.kitchen

  console.log(req.user)

  try {

    let khaaba = new Khaaba(khaabaFields);

    if (req.body.isInstantKhaaba == 'true') {
      khaaba.instantKhaaba.isInstant = true
      khaaba.instantKhaaba.availableServings = req.body.servings;
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


router.post("/edit-menu/:id", auth, async (req, res) => {
  try {
    const id = req.params.id

    let khaaba = await Khaaba.findOne({
      _id: id
    })

    if (req.body.title) khaaba.title = req.body.title;
    if (req.body.price) khaaba.price = req.body.price;
    if (req.body.description) khaaba.description = req.body.description;
    if (req.body.category) khaaba.category = req.body.category;

    if (req.body.isInstantKhaaba == 'true') {
      khaaba.instantKhaaba.isInstant = true
      khaaba.instantKhaaba.availableServings = req.body.servings;
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
  const id = req.params.id
  try {
    const khaabas = await Khaaba.find({
      kitchen: id
    });

    return res.status(200).json({
      khaabas
    });

  } catch (error) {
    return res
      .status(400)
      .json({ errors: SERVER_ERROR });
  }


});

module.exports = router