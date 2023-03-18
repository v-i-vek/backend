const express = require('express')
const { userGet,userPost } = require('../controller/user.controller')
const route = express.Router({caseSensitive:true})

route.get('/reg',userGet)
route.post('/reg',userPost)




module.exports = route