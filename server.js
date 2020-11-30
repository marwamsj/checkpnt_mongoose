const express=require("express");
const mongoose=require("mongoose");
require('dotenv').config();
const dbconnection=require("./config/dbconnection");
const app = express();

//connect DB
dbconnection();
//create a person schema (mongoose schema types)
const schema= mongoose.Schema;

const PersonSchema = new schema ({
    name:{
        type:String,
        required:true,
    },
    age:Number,
    favoriteFoods:[String],
})

const Person = mongoose.model('Person', PersonSchema);

//Create and Save a Record of a Model:

    const person= new Person({ 
    name: "Marwa",
    age:32,
    favoriteFoods:["sweet","pistachio"]
 });

 Person.save((error, data)=> {
 if (error) {
    console.log(error)
 } else {
    console.log(data)
 }
 })

//Create Many Records with model.create():
var arrayOfPeople = [
    {name:"Sarra", age:34 ,favoriteFoods:["Carbonara","Catfish","Crab Legs"]},
    {name:"Safa", age:30 ,favoriteFoods:["Croissant"]},
    {name:"Mariam", age:35 ,favoriteFoods:["Dim Sum","Dark Chocolate","pistachio"]}
];

 Person.create(arrayOfPeople, (error, people)=> {
        if (error) {
           console.log(error)
        } else {
         console.log(people)
        }
        })



//Use model.find() to Find all the people having a given name:
Person.find({name:"Mariam"},(error, data)=> {
    if (error) {
       console.log(error)
    } else {
       console.log(`data of Mariam: ${data} `)
}});


//Use model.findOne() to find just one person which has a certain food in the person's favorites:
Person.findOne({favoriteFoods:{$all :[ "pistachio"]}},(error, data)=> {
   if (error) {
      console.log(error)
   } else {
      console.log(`First person which has a pistachio as favoriteFoods: ${data}`)
}});


//Use model.findById() to Find the (only!!) person having a given _id:
Person.findById(("5fc5403d057faa1b6cf1d148"),(error, data)=> {
   if (error) {
      console.log(error)
   } else {
      console.log(`Person having a given _id: ${data}`)
}});


//Perform Classic Updates by Running Find, Edit, then Save:


 Person.findById(("5fc5438796b365b88a182173"),(error, data)=> {
   if (error) {
      console.log(error)
   } else {
      data.favoriteFoods.push("hamburger"),
      data.save((err,updata)=>{
         if (err) {
            console.log(err)
         } else {
            console.log(updata) 
      
      }})
 }});



//Perform New Updates on a Document Using model.findOneAndUpdate():
Person.findOneAndUpdate({name:"Safa"}, {age:20}, {new: true},(error, data)=> {
   if (error) {
      console.log(error)
   } else {console.log(`Updates the age of Safa : ${data}`)
}});


//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove("5fc543e696b365b88a182174", (error, deletedata)=> {
   if (error) {
      console.log(error)
   } else {console.log(`Delete Mariam : ${deletedata}`)} 
} )


//Delete Many Documents with model.remove():Delete all the people whose name is “Mary”:
Person.remove({name:"Mary"},  (error, removedata)=> {
   if (error) {
      console.log(error)
   } else {console.log(`Delete all the people whose name is Mary: ${removedata}`)} 
})

//Find people who like burrito. Sort them by name, limit the results to two documents, and hide their age
const ChainSearchQuery = (done)=>{
Person.find({favoriteFoods:{$all :[ "burrito"]}})
 .sort({name:'asc'})
 .limit(2)
 .select('-age')
 .exec((error, filterpeople)=> {
      done(error,filterpeople)
   
 })
}




PORT = process.env.PORT;
app.listen(PORT,(err)=>
 err?console.error(err):console.log("server is running"));