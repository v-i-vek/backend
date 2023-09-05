const express = require('express')
const LoginRoute = express.Router()
const{ userLoginGet,userLoginPost} = require('../controller/login.controller')

LoginRoute.get('/login',userLoginGet)

LoginRoute.post('/login',userLoginPost)



module.exports = LoginRoute