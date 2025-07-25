const express = require('express')
const router = express.Router()

const MenuItem = require('../models/MenuItem');


const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}`);
    next();
};

router.post('/', logRequest, async(req,res)=>{

    try{
        const data = req.body
        const newMenu = new MenuItem(data)
        const response = await newMenu.save();
        console.log("data saved")
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors: err})
    }
})


router.get('/', logRequest, async(req,res)=>{

    try{
        const response = await MenuItem.find();
        console.log("Data fetched");
        res.status(200).json(response,"Hi");
    }
    catch(err){
        console.error("Error saving menu:", err);
        res.status(500).json({ error: "Internal server error" });

    }


})

module.exports = router
