require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken')

// require('./.env').config();




const jwtAuthMiddleware = (req, res, next)=>{

    //extract the JWT token from the request headers
    const token = req.headers.authorization.split(" ")[1]
    //Did not found token in headers
    if(!token )
        res.status(401).json({error:'Unauthorized'})

    //token validation 
    try{
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)

        // added the user information to request payload
        req.jwtPayload = decoded

        next()
    }
    catch(err)
    {
        console.log(err)
        res.status(404).json({error: "Invalid token"})
    }

}

const generateToken = (userData)=>{
    return jsonwebtoken.sign(userData, process.env.JWT_SECRET, {expiresIn:300000})
}

module.exports ={ jwtAuthMiddleware, generateToken}