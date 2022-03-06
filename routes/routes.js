

var express = require('express')
var router = express.Router()

var authRoute = require('./auth')
var postroute = require('./post/post')
var userRoute = require('./user/user')


//cloudinary setup 
const { config } = require('cloudinary')

const cloudinaryConfig = (req, res, next) => {
   config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
   });
   next();
}

router.use('*', cloudinaryConfig)


router.use(authRoute)
router.use('/post', postroute)
router.use('/user', userRoute)



module.exports = router