const express = require("express");
const router = express.Router();
const Khaaba = require("../models/khaaba");
const InstantKhaaba = require("../models/instantKhaaba");
const chef = require("../models/chef");
const auth = require("../middlewares/auth");
const instantKhaaba = require("../models/instantKhaaba");

// ADD Menu item
router.post("/add-khaaba",auth, async(req,res)=>{

    let khaabaFeild = {};
    
    if(req.body.title) khaabaFeild.title  =  req.body.title;
    if(req.body.price) khaabaFeild.price =  req.body.price;
    if(req.body.description) khaabaFeild.description  =  req.body.description;
    if(req.body.thumbnail) khaabaFeild.thumbnail  =  req.body.thumbnail;
    if(req.body.category) khaabaFeild.category  =  req.body.category;
    if(req.body.date) khaabaFeild.date  =  req.body.date;

    khaabaFeild.kitchen = req.user.kitchen
    console.log(req.user)
    if(req.body.isInstantKhaaba){
      let instantKhaabaFeild = {};
        
      if(req.body.servings) instantKhaabaFeild.servings  =  req.body.servings;
    }

    try {
        
        khaaba = new Khaaba(khaabaFeild);
        let instantKhaaba = {}
        await khaaba.save();
        if(req.body.isInstantKhaaba){
        instantKhaaba.khaaba = khaaba.id
        instantKhaaba = new InstantKhaaba(instantKhaabaFeild);
        await instantKhaaba.save();
      }
        res.json({khaaba, instantKhaaba});
      } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error.");
      }
    });


router.post("/edit-menu/:id",auth,async(req,res)=>{

    const id = req.params.id
    let khaabaFeild = {};

    if(req.body.title) khaabaFeild.title  =  req.body.title;
    if(req.body.price) khaabaFeild.price =  req.body.price;
    if(req.body.description) khaabaFeild.description  =  req.body.description;
    if(req.body.thumbnail) khaabaFeild.thumbnail  =  req.body.thumbnail;
    if(req.body.category) khaabaFeild.category  =  req.body.category;
    if(req.body.date) khaabaFeild.date  =  req.body.date;
    try {
        
        let khaaba = await Khaaba.findOne({ id });

        if(khaaba){
            const khaaba = await Khaaba.findOneAndUpdate(
                {$set : khaabaFeild},
                {new : true}

            ) ;    
        }
        khaaba = new Khaaba(khaabaFeild);
        await khaaba.save();
        res.json(khaaba);
      } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error.");
      }
    });


    router.get("/printMenu/:id",async(req,res)=>{
      const id = req.params.id
      try {
        const khaabas = await Khaaba.find({
          "kitchen":id 
        });
    
        res.json(khaabas);
      } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error.");
      }
    });

    module.exports=router