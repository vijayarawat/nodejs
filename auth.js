const express = require('express')
const app = express;
const db = require('./db')
const passport = require('passport')
const localstrategy = require('passport-local').Strategy

const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');


passport.use(new localstrategy( async( username, password, done)=>{
    try{
        // console.log('Recieved credentials', username, password);
        const user = await Person.findOne({username: username})
        if(!user){
            return done(null, false,{message: "Incorrect username"})
        }
        const isPasswordMatch = user.comparePassword(password);
        
        if(isPasswordMatch )
            return done(null,user);
        else
            return done(null, false, {message:"incorrect password"})
    }
    catch(err)
    {
        return done(err)
    }
}
))

module.exports = passport
// const  = require('passport')