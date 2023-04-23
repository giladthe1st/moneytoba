const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = new express.Router()
require("dotenv").config()




router.post("/register", async (req,res)=>{
  try {
    console.log("reached register")
    const {email , password}= req.body;
    if(!email || !password) return res.status(400).send({err:"All fiels are required"})
    const foundUser = await User.findOne({email})
    if(foundUser) return res.status(400).send({err:"User already exists"})


    //hash the password
    const hash = await bcrypt.hash(password , 12);

    //store the user
    const newUser = await (new User({email , password: hash})).save()
    // const newUser = await _newUser.save()

    //create a token
    const token = jwt.sign({id:newUser._id }, process.env.JWT_SECRET)

    //set a cookie
    res.cookie("auth", token)

    //send a response
    return res.send({email, id:newUser._id})
  }

  catch (error) {
    log.error("Error during authentication: " + error)
  }
})

router.post("/login", async (req,res)=>{
  const {email, password} = req.body;
  if(!email || !password) return res.status(400).send({err:"All fiels are required"})
  const foundUser = await User.findOne({email})
  if(!foundUser) return res.status(400).send({err:"User does not exist"})
  //check if user is in database and if the password is correct
  const isMatch = await bcrypt.compare(password , foundUser.password)
  if(!isMatch) return res.status(400).send({err:"Invalid credentials"})


  //create a token
  const token = jwt.sign({id:foundUser._id }
    , process.env.JWT_SECRET)

  //set a cookie
  res.cookie("auth", token)

  //send a response
  return res.send({email, id:foundUser._id})
})


module.exports = router;



