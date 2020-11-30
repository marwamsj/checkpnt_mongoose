const mongoose= require("mongoose");


const dbconnection =async()=> {
    try {
        let result=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
        console.log("DB is connected");
    } catch (error) {
        console.log(`DB not connected :${error}`);
    }
    
}

module.exports= dbconnection;
