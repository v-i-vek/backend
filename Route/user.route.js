const express = require('express')
const { userGet } = require('../controller/user.controller')
const route = express.Router({caseSensitive:true})

route.get('/reg',userGet)




module.exports = route