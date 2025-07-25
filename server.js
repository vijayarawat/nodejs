const express = require('express')
const app = express()

const db = require('./db')
const PORT = process.env.PORT  || 8000

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

// const logRequest = (req, res, next)=>{
//     console.log('${new Date().toLocaleString()} request made to : ${req.originalUrl}')
//     next()
// }

const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}`);
    next();
};
// app.use('logRequest')

app.get('/',logRequest, function(req,res){
    res.send("hello  welcom to node ")
})

const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes)

const menuItemRoutes = require('./routes/menuItemRoutes')
app.use('/menu',menuItemRoutes)


// app.get('/chicken', (req,res)=>{
//     res.send("Sure Vijaya I would love to do it.")
// })

// app.get('/idli', (req,res)=>{
//     customized_idli= {
//         'name':"rava idli",
//         'count': 4,
//         'is_sambar':true,
//         'chutney':true,
//     }
//     res.send(customized_idli);
// })


// //POST route to add a person 
// This contains the callback function which is now not supported. Instead of that we use async await

// app.post('/person',(req,res)=>{
//     const data = req.body   //Assuming the request body is containing the data

//     //Create a new person document using Mongoose model
//     const newPerson = new Person(data)

//     //Save the new personto db
//     newPerson.save((error,savedPerson)=>{
//         if(error){
//             console.log("Error in saving the person ",error)
//             res.status(500).json({error:"Internal server error"})
//         }
//         else{
//             console.log('Data saved successfully');
//             res.status(200).json(savedPerson);
//         }
//     })
// })

// app.post('/person', async (req, res) => {
//     try {
//         const data = req.body;
//         const newPerson = new Person(data);
//         const response = await newPerson.save();

//         console.log("Person saved successfully:", response);
//         res.status(200).json(response);
//     } catch (err) {
//         console.error("Error saving person:", err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// app.get('/person',async(req,res)=>{

//     try{
//         const response = await Person.find();
//         console.log("Data fetched:", response);
//         res.status(200).json(response);
//     }
//     catch(err){
//         console.error("Error saving person:", err);
//         res.status(500).json({ error: "Internal server error" });

//     }
// })

// app.get('/person/:workType', async(req,res)=>{
//     try{
//         const workType = req.params.workType
//         if(workType =='chef' || workType == 'manager'||workType =='waiter'){
//             const response = await Person.find({work:workType})
//             console.log('Response Fetched')
//             res.status(200).json(response)
//         }
//         else{
//             res.status(404).json("Invalid Worktype")
//         }
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json('Internal Server error')
//     }
// })
// app.post('/menu', async(req,res)=>{

//     try{
//         const data = req.body
//         const newMenu = new MenuItem(data)
//         const response = await newMenu.save();
//         console.log("data saved")
//         res.status(200).json(response)
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({errors: err})
//     }
// })


// app.get('/menu', async(req,res)=>{

//     try{
//         const response = await MenuItem.find();
//         console.log("Data fetched:", response);
//         res.status(200).json(response,"Hi");
//     }
//     catch(err){
//         console.error("Error saving menu:", err);
//         res.status(500).json({ error: "Internal server error" });

//     }


// })
app.listen(PORT, () => {
    console.log("Server is running on port 8000");
});

// module.exports = { logRequest };
// module.exports = logRequest
// app.listen(8000)

