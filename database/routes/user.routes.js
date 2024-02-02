const express = require('express')
const route = express.Router()
const {addUser ,loginUser}  = require("../controlers/user.controler")



route.post('/user',addUser)
route.post('/login', loginUser)

module.exports = route