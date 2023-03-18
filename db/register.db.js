const mongoose = require('mongoose')


const connectDb  = async(DB_URL)=>{
    const db_opt={
        dbName:"User"
    }
    return await mongoose.connect(DB_URL,db_opt).then(()=>{
        console.log("mongoose connected successfully")
    }).catch((e)=>{
        console.log(e)
    })
}

module.exports = connectDb