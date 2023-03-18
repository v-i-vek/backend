const express = require('express')
const connectDb = require('./db/register.db')
const userModel = require('./model/register.model')
const path = require('path')
const hbs = require('hbs')
const route = require('./Route/user.route')
const app = express()
const LoginRoute = require('./Route/login.route')



app.use(express.json())
app.use(express.urlencoded({extended:false}))

// all the path access for the project by the express
const pathPublic = path.join(__dirname,'/public')
const templatePath = path.join(__dirname,'/template/views')
console.log(__dirname,'./template/views');

app.set('view engine','hbs')
app.set('views',templatePath)




// assiging port number
const Port = process.env.Port || 3000


//connecting to data base monogdb
const DB_URL = "mongodb://127.0.0.1:27017/"
connectDb(DB_URL)

// route for the urls hits on the browser
app.use(route)
app.use(LoginRoute)



app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})


