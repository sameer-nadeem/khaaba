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


    khaabaFeild.kitchen = req.user.kitchen
    console.log(req.user)
    if(req.body.isInstantKhaaba){
      
  
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
        return res.status(200).json({khaaba, instantKhaaba});
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
    let instantKhaabaFeild = {};
    if(req.body.title) khaabaFeild.title  =  req.body.title;
    if(req.body.price) khaabaFeild.price =  req.body.price;
    if(req.body.description) khaabaFeild.description  =  req.body.description;
    if(req.body.thumbnail) khaabaFeild.thumbnail  =  req.body.thumbnail;
    if(req.body.category) khaabaFeild.category  =  req.body.category;

    if(req.body.isInstantKhaaba){
      let instantKhaabaFeild = {};        
  
      if(req.body.servings) instantKhaabaFeild.servings  =  req.body.servings;

    }
    try { 
      Khaaba.updateOne({ _id:id},  
      {$set: khaabaFeild }, 
              function (err, docs) { 
      if (err){ 
          res.status(400).json({
              error: [SERVER_ERROR]
          })
      } 
      else{ 
           res.status(200).json(docs); 
          
          
              
  }
  }); 
         } catch (error) {
        return res
        .status(400)
        .json({errors:INVALID_CREDITS});
      }   
      
});

 router.get("/get-menu/:id",async(req,res)=>{
      const id = req.params.id
      try {
        const khaabas = await Khaaba.find({
          "kitchen":id 
        });

        const instantKhaabas = await InstantKhaaba.find({
          "kitchen":id 
        });
    
        return res.status(200).json({khaabas,
          instantKhaabas});

      } catch (error) {
        return res
        .status(400)
        .json({errors:SERVER_ERROR});  
      }


    });

    module.exports=router