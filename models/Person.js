const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});


//creating the hashed password
personSchema.pre('save', async function(next){
    const person = this;
    try{
        //Generate salt
        const salt = await bcrypt.genSalt(10);

        //Generate password with salt
        const hashedPasssword = await bcrypt.hash(person.password, salt);
        
        //overwrite the old password with hashed password
        person.password = hashedPasssword;
        next();
    }
    catch(err){
        return next(err);
    }
})

// Compare password method
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
        }
    catch(err){
        throw err
    }
}

const Person = mongoose.model('Person',personSchema);
module.exports = Person


