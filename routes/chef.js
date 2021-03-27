const express = require("express");
const router = express.Router();
const Khaaba = require("../models/khaaba");
const InstantKhaaba = require("../models/instantKhaaba");
const chef = require("../models/chef");
const auth = require("../middlewares/auth");
const { INVALID_CREDITS, SERVER_ERROR } = require("../utils/errors");

// ADD Menu item
router.post("/add-khaaba",auth, async(req,res)=>{

    let khaabaFeild = {};
    let instantKhaabaFeild = {};
    
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
        
      if(req.body.title) instantKhaabaFeild.title  =  req.body.title;
      if(req.body.price) instantKhaabaFeild.price =  req.body.price;
      if(req.body.description) instantKhaabaFeild.description  =  req.body.description;
      if(req.body.thumbnail) instantKhaabaFeild.thumbnail  =  req.body.thumbnail;
      if(req.body.category) instantKhaabaFeild.category  =  req.body.category;
      if(req.body.date) instantKhaabaFeild.date  =  req.body.date;
  
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
        return res
        .status(400)
        .json({errors:[INVALID_CREDITS]});
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

    if(req.body.isInstantKhaaba){
      let instantKhaabaFeild = {};        
      if(req.body.title) instantKhaabaFeild.title  =  req.body.title;
      if(req.body.price) instantKhaabaFeild.price =  req.body.price;
      if(req.body.description) instantKhaabaFeild.description  =  req.body.description;
      if(req.body.thumbnail) instantKhaabaFeild.thumbnail  =  req.body.thumbnail;
      if(req.body.category) instantKhaabaFeild.category  =  req.body.category;
      if(req.body.date) instantKhaabaFeild.date  =  req.body.date;
  
      if(req.body.servings) instantKhaabaFeild.servings  =  req.body.servings;

      try { 
        InstantKhaaba.updateOne({ _id:id},//"60573d5785214d0bc5b0f9b7"},//req.user.id},//  
        {$set: instantKhaabaFeild }, 
                function (err, docs) { 
        if (err){ 
            res.status(400).json({
                error: [SERVER_ERROR]
            })
        } 
        else{ 
            return docs;       
    }
    }); 
           } catch (error) {
          return res
          .status(400)
          .json({errors:INVALID_CREDITS});
        }

    }

    else{
    try { 
      Khaaba.updateOne({ _id:id},//"60573d5785214d0bc5b0f9b7"},//req.user.id},//  
      {$set: khaabaFeild }, 
              function (err, docs) { 
      if (err){ 
          res.status(400).json({
              error: [SERVER_ERROR]
          })
      } 
      else{ 
          return docs;       
  }
  }); 
         } catch (error) {
        return res
        .status(400)
        .json({errors:INVALID_CREDITS});
      }   
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
        return res
        .status(400)
        .json({errors:SERVER_ERROR});  
      }

      try {
        const instantKhaabas = await InstantKhaaba.find({
          "kitchen":id 
        });
    
        res.json(instantKhaabas);
      } catch (error) {
        return res
        .status(400)
        .json({errors:SERVER_ERROR});  
      }


    });

    module.exports=router