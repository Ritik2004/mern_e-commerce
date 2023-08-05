const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('./catchAsyncError');
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
         const {token} = req.cookies;
         
         if(!token){
            return next(new ErrorHandler("Please Login to access this resource",401))
         }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
   
    //in jwt token we assign id, so we are using it from here

    req.user = await User.findById(decodedData.id);
    next();
}) 

exports.authorizeRoles = (...roles)=>{
    return (req,res,next) =>{
        //we will search if roles array has admin 
        //if not admn we will get error
        if(!roles.includes(req.user.role)){
            return next( new ErrorHandler(`Role :${req.user.role} is not allowed to access the resource`,403)    
            )
         }
          next();
    }     
}