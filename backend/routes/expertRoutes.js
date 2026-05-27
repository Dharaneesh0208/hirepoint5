const express = require("express");

const router = express.Router();

const Expert =
require("../models/Expert");

const authMiddleware =
require("../middleware/authMiddleware");

/* CREATE */

router.post("/",
authMiddleware,
async(req,res)=>{

try{

const expert =
await Expert.create(req.body);

res.json(expert);

}catch(error){

res.status(500).json({
message:error.message
});

}

});

/* READ */

router.get("/",
async(req,res)=>{

try{

const experts =
await Expert.find();

res.json(experts);

}catch(error){

res.status(500).json({
message:error.message
});

}

});

/* UPDATE */

router.put("/:id",
authMiddleware,
async(req,res)=>{

try{

const updated =
await Expert.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(updated);

}catch(error){

res.status(500).json({
message:error.message
});

}

});

/* DELETE */

router.delete("/:id",
authMiddleware,
async(req,res)=>{

try{

await Expert.findByIdAndDelete(
req.params.id
);

res.json("Deleted");

}catch(error){

res.status(500).json({
message:error.message
});

}

});

module.exports = router;