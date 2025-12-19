import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const { JsonWebTokenError } = jwt;
import UserModel from "../models/usermodel.js"
import clodinary from "../lib/cloudinary.js";
import transporter from "../CONFIG/nodemailer.js"
import { sendWelcomeEmail } from "../emails/emailhandler.js";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if(password.length<6){
      return res.status(400).json({success:false,message:"Password must be at least 6 characters long"});
    }
    if(!name || !email || !password) {
        return res.status(400).json({ sucess:false,message: "All fields are required" });
    }
    try{
        const existingUser=await UserModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json({success:false,message:"User already exists"})
        }

       const hashedPassword= await bcrypt.hash(password,10) 
       const user=new UserModel({name,email,password:hashedPassword})
       const saveduser=await user.save()
       
       const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

       res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'lax',
        maxAge:7*24*60*60*1000
       })

       //sending email
        // const mailoptions={
        //     from:process.env.SENDER_EMAIL,
        //     to:email,
        //     subject:'welcome Developer',
        //     text:`wecome to this community.Your account has been creted with the email id: ${email}`
        // }

        // await transporter.sendMail(mailoptions)

        try{
            await sendWelcomeEmail(saveduser.email,saveduser.name,process.env.CLIENT_URL);
        }catch(error){
            console.error("Failed to send welcome email:",error);
        }
        return res.status(201).json({_id:user._id,name:user.name,email:user.email,profilePic:user.profilePic,
                                    success:true,message:"User registered successfully"});
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }

}
export const login=async(req,res)=>{
    const {email,password}=req.body

    if(!email || !password) {
        return res.status(400).json({ sucess:false,message: "All fields are required" });
    }

    try{
        const user=await UserModel.findOne({email:email})
        if(!user){
            return res.status(400).json({success:false,message:"User does not exists"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({success:false,message:"Invalid credentials"})
        }

         const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

       res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'lax',
        maxAge:7*24*60*60*1000
       })
       return res.status(200).json({sucess:true,message:"Logged in successfully"})
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }

}

export const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'Lax',
        })
        return res.status(200).json({sucess:true,message:"Logged Out sucessfully"})
    }catch(error){
        return res.status(500).json({sucess:false,message:error.message})
    }
}

export const updateProfile=async(req,res)=>{
  try{
    const {profilePic}=req.body;
    const userId=req.user._id;
    if(!profilePic){
      return res.status(400).json({sucess:false,message:"Profile picture is required"})
    }
    const uploadresponse=await clodinary.uploader.upload(profilePic);
    const updateduser=await UserModel.findByIdAndUpdate(userId,
      {profilePic:uploadresponse.secure_url},
      {new:true}
      )
    return res.status(200).json({sucess:true,message:"Profile updated successfully",user:updateduser})
  }catch(error){
    return res.status(500).json({sucess:false,message:error.message})
  }
};

export const checkauth=async(req,res)=>{
  try{
    return res.status(200).json({sucess:true,message:"You are authorized",user:req.user})
  }catch(error){
    return res.status(500).json({sucess:false,message:error.message})
  }
}



export const passwordresetotp=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json({sucess:false,message:"email is required"})
    }
    try{
        const user=await UserModel.findOne({email:email})
        if(!user){
            return res.status(400).json({sucess:false,message:"User does not exists"})
        }
        const otp=Math.floor(100000+Math.random()*900000);
        user.resetOtp=otp
        user.resetOtpExpiryAt=Date.now()+15*60*1000
        await user.save()

        const mailoption={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Password reset OTP",
            text:`Your OTP for password reset is ${otp}. It is valid for 15 minutes.`
        }
        await transporter.sendMail(mailoption)
        return res.status(200).json({sucess:true,message:"OTP sent to your email"})
    }
    catch(error){
        return res.status(500).json({sucess:false,message:error.message})
    }
}

export const resetpassword=async(req,res)=>{
    const {email,newpassword}=req.body;
    if(!email || !newpassword){
        return res.status(400).json({sucess:false,message:"All fields are required"})
    }
    try{
        const user=await UserModel.findOne({email:email})
        if(!user){
            return res.status(400).json({sucess:false,message:"User does not exists"})
        }
        if(newpassword.length<6){
            return res.status(400).json({sucess:false,message:"Password must be at least 6 characters"})
        }
        if(newpassword === user.password){
            return res.status(400).json({sucess:false,message:"Please enter a new password"})
        }
        const hashedPassword=await bcrypt.hash(newpassword,10)
        user.password=hashedPassword;
        await user.save();
        return res.status(200).json({sucess:true,message:"Password reset successfully"})
    }
    catch(error){
        return res.status(500).json({sucess:false,message:error.message})
    }
}
