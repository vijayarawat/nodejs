// // Function method 1- 
// var add = function add(a,b){
//     return a+b;
// }

// var result = add(2,3);
// console.log(result)


// // Function method 2 -
// function add(a,b){
//     return a+b;
// }
// var result = add(2,3);
// console.log(result)

// //Function method3 - Arrow function 
// var add=(a,b)=>{return a+b;}
// var result = add(2,3);
// console.log(result)


// // Function method3 - Arrow function without return 
// var add=(a,b)=> a+b;
// var result = add(2,3);
// console.log(result)

// // Callback function

// function callback(){
//     console.log("Hey this is a call backfunction");
// }

// const add = function add(a,b,callback){
//     var res= a+b;
//     console.log(res);
//     callback();
// }
// add(2,3,callback)

// add(2,3,function(){
//     console.log("this is an inline function")
// })

// add(2,3,()=>console.log("this is another inline function just reducing thr line sof code"))


// // fs and os libraries
// var fs = require('fs')
// var os = require('os')

// var user = os.userInfo();
// console.log(user)
// console.log(user.username)

// fs.appendFile('greetings.txt','Hi'+ user.username + "\n" ,()=>{
//     console.log("file saved successfully")

// })

// // Importing the files
// const notes = require('./Day1_ref.js');
// console.log("files available")

// var age = notes.age;
// console.log(age)

// var res = notes.addNumber(age+18, 10);
// console.log(res)

// // Convert json to object and viceversa

// const jsonString = '{"name":"vijaya","age":25}'
// console.log("jsonStringj ",jsonString)
// const jsonObject = JSON.parse(jsonString)
// console.log("jsonObject ", jsonObject)

// // ------------------------------------------------------

// const object = {"name":"vijaya","age":25}
// const jsonStringified = JSON.stringify(object)
// console.log("jsonStringified ",jsonStringified)
