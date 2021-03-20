const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const khaaba = require("../models/khaaba");
const instantKhaaba = require("../models/instantKhaaba");
const chef = require("../models/chef");
const auth = require("./middlewares/auth");

// ADD Menu item
router.post("/",async(req,res)=>{

    

    const khaabaFeild = {};
    khaabaFeild
    if(req.body.title) khaabaFeild.title  =  req.body.title;
    if(req.body.price) khaabaFeild.price =  req.body.price;
    if(req.body.description) khaabaFeild.description  =  req.body.description;
    if(req.body.thumbnail) khaabaFeild.thumbnail  =  req.body.thumbnail;
    if(req.body.category) khaabaFeild.category  =  req.body.category;
    if(req.body.date) khaabaFeild.date  =  req.body.date;
    try {
        
        khaaba = new khaaba(khaabaFeild);
        await khaaba.save();
        res.json(khaaba);
      } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error.");
      }
    });


    // ADD instant khaaba


    router.post("/",async(req,res)=>{


        const instantKhaabaFeild = {};
        khaabaFeild
        if(req.body.servings) instantKhaabaFeild.servings  =  req.body.servings;
        if(req.body.khaaba) instantKhaabaFeild.khaaba =  req.body.khaaba;
        try {
            
            instantKhaaba = new instantKhaaba(instantKhaabaFeild);
            await instantKhaaba.save();
            res.json(instantKhaaba);
          } catch (error) {
            console.error(error.message);
            return res.status(500).send("Server error.");
          }
        });


// edit menu item


router.post("/",async(req,res)=>{

  
    const khaabaFeild = {};
    khaabaFeild
    if(req.body.title) khaabaFeild.title  =  req.body.title;
    if(req.body.price) khaabaFeild.price =  req.body.price;
    if(req.body.description) khaabaFeild.description  =  req.body.description;
    if(req.body.thumbnail) khaabaFeild.thumbnail  =  req.body.thumbnail;
    if(req.body.category) khaabaFeild.category  =  req.body.category;
    if(req.body.date) khaabaFeild.date  =  req.body.date;
    try {
        
        const khaaba = await khaaba.findOne({ });

        if(khaaba){
            const khaaba = await khaaba.findOneAndUpdate(
                {user : req.user.id},
                {$set : khaabaFeild},
                {new : true}

            ) ;    
        }
        khaaba = new khaaba(khaabaFeild);
        await khaaba.save();
        res.json(khaaba);
      } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error.");
      }
    });

