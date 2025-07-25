const express = require('express')
const router = express.Router();
const Person = require('../models/Person');

const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}`);
    next();
};

router.post('/', logRequest, async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();

        console.log("Person saved successfully:", response);
        res.status(200).json(response);
    } catch (err) {
        console.error("Error saving person:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/', logRequest, async(req,res)=>{

    try{
        const response = await Person.find();
        console.log("Data fetched");
        res.status(200).json(response);
    }
    catch(err){
        console.error("Error saving person:", err);
        res.status(500).json({ error: "Internal server error" });

    }
})

router.get('/:workType', logRequest,  async(req,res)=>{
    try{
        const workType = req.params.workType
        if(workType =='chef' || workType == 'manager'||workType =='waiter'){
            const response = await Person.find({work:workType})
            console.log('Response Fetched')
            res.status(200).json(response)
        }
        else{
            res.status(404).json("Invalid Worktype")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json('Internal Server error')
    }
})

router.put('/:id', (req,res)=>{
    try{
        
    }
    catch(err){
        console.log(err)
        res.status(500).json('Internal Server error')

    }
})

module.exports = router



