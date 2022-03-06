
var express = require('express')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var User = require('../models/users')
const { registerValidation, loginValidation } = require("../validation")
const verify = require('./verifyToken')

var router = express.Router()

//Post in signup
router.post('/register', async function (req, res) {
   const { firstName, lastName, email, password } = req.body

   const { error } = registerValidation(req.body)
   //check errors 
   if (error) return res.status(400).json(error.details[0].message)

   const emailExists = await User.findOne({ email })
   if (emailExists) return res.status(400).json("Email already exists")

   //hash password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)

   //save user in db
   var newUser = new User({
      name: {
         first: firstName,
         last: lastName
      },
      email,
      password: hashedPassword,
      image: "https://res.cloudinary.com/due9g6njy/image/upload/v1644324723/blog/profile/default_f2hlcv.jpg"
   })

   await newUser.save()
      .then(async () => res.json('success'))
      .catch(err => res.status(401).json("An error occured try again"))
})


//login
router.post('/login', async function (req, res) {
   const { email, password } = req.body
   const { error } = loginValidation(req.body)

   //check input errors
   if (error) return res.status(400).json(error.details[0].message)

   //check if user exists
   try {
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json("email does not exist")

      //check pass
      const validPass = await bcrypt.compare(password, user.password)
      if (!validPass) return res.status(400).json("Wrong Password")

      //set jwt
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET)

      const data = {
         token: token,
         user_id: user._id,
         email: user.email,
         user_img: user.image
      }
      
      res.header("auth-token", token).json(data)
   }

   catch (err) {
      console.log(err)
      return res.status(400).json("Check internet")
   }

})

router.get('/verify/auth', verify, async function (req, res) {
   res.status(200).json(req.user._id)
})

module.exports = router