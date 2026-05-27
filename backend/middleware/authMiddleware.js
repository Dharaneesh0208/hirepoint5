const jwt = require("jsonwebtoken");

const authMiddleware =
(req,res,next)=>{

try{

const header =
req.headers.authorization;

if(!header){

return res.status(401).json({
message:"Unauthorized Access"
});

}

if(!header.startsWith("Bearer ")){

return res.status(401).json({
message:"Invalid Token"
});

}

const token =
header.split(" ")[1];

const decoded =
jwt.verify(
token,
"hirepointsecret"
);

req.user = decoded;

next();

}catch(error){

return res.status(401).json({
message:"Token Failed"
});

}

};

module.exports =
authMiddleware;