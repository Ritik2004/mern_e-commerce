const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Your Name'],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more then 4 characters"]
    },
    email:{
        type:String,
        required:[true, 'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater then 8 characters"],
        select:false,
    },
    avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
})
userSchema.pre("save", async function(next){
     //if the password is not changing and we are just modifying email and name
     //then password will not be hashed so below condition is to check that
    if(!this.isModified("password")){
          next();
    }
    //here we are hashing the password before storing in database
    this.password = await bcrypt.hash(this.password,10);
})
//JWT Token
//Here we will generate token and store in cookie
userSchema.methods.getJWTToken = function(){
     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
     })
}

//compare Password
userSchema.methods.comparePassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password)

}

//Generating password reset token

userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
}


module.exports = mongoose.model("User",userSchema)