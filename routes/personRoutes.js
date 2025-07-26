const express = require('express')
const router = express.Router();
const Person = require('../models/Person');

// const logRequest = (req, res, next) => {
//     console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}`);
//     next();
// };


const { jwtAuthMiddleware, generateToken} = require('../jwt')

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();

        // const token = generateToken(response.username)
        // console.log("Your token is", token)


        console.log("Person saved successfully:", response);

        const payload= {
            id: response.id,
            username : response.username
        }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload);
        console.log("your token is ", token)


        res.status(200).json({"response":response, "token":token});
    } catch (err) {
        console.error("Error saving person:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req,res)=>{
    try{
        const {username, password } = req.body

        // console.log(JSON.stringify(req.body))

        const user = await Person.findOne({username})

        // Check if user exists and password matches
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        //Generate token
        const payload = {
            id:user.id,
            password: user.password
        }
        const token = generateToken(payload)
        console.log(token)
        console.log("token")
        
        return res.json({token})
    }
    catch(err){
        console.log(err)

         return res.status(404).json({error:"Innternal Server Error"})
    }
})

router.get('/profile',jwtAuthMiddleware ,async(req,res)=>{

    try{
        const userData = req.jwtPayload
        console.log("User data", userData)

        const userId = userData.id
        const user = await Person.findById(userId)

        res.status(200).json({user})
    }
    catch(err)
    {
        console.log(err)
         return res.status(404).json({error:"Innternal Server Error"})

    }
})

// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         console.log(JSON.stringify(req.body))

//         const user = await Person.findOne({ username });

//         const user1 = await Person.findOne({ username: username });
//         console.log("User found:", user1);

//         if (!user) {
//             return res.status(401).json({ error: "Invalid username or password" });
//         }

//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ error: "Invalid username or password" });
//         }

//         const payload = {
//             id: user.id,
//             username: user.username
//         };

//         const token = generateToken(payload);
//         return res.json({ token });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// });


router.get('/',jwtAuthMiddleware, async(req,res)=>{

    try{
        const response = await Person.find().select("-password");
        console.log("Data fetched");
        res.status(200).json(response);
    }
    catch(err){
        console.error("Error saving person:", err);
        res.status(500).json({ error: "Internal server error" });

    }
})

router.get('/:workType',  async(req,res)=>{
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



