const express = require('express')
const LoginRoute = express.Router()
const{ userLoginGet} = require('../controller/login.controller')

LoginRoute.get('/login',userLoginGet)




module.exports = LoginRoute