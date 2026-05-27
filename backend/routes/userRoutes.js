const express = require("express");

const jwt = require("jsonwebtoken");

const router = express.Router();

const User =
require("../models/User");

/* REGISTER */

router.post("/register",
async(req,res)=>{

try{

const user =
await User.create(req.body);

res.json({
message:"Signup Success"
});

}catch(error){

res.status(500).json({
message:error.message
});

}

});

/* LOGIN */

router.post("/login",
async(req,res)=>{

try{

const user =
await User.findOne({

email:req.body.email,
password:req.body.password

});

if(!user){

return res.status(400).json({
message:"Invalid Credentials"
});

}

const token =
jwt.sign(

{
userId:user._id
},

"hirepointsecret",

{
expiresIn:"1d"
}

);

res.json({

message:"Login Success",
token

});

}catch(error){

res.status(500).json({
message:error.message
});

}

});

module.exports = router;