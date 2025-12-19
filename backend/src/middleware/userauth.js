
import jwt from "jsonwebtoken"
import UserModel from "../models/usermodel.js";
const userauth=async(req,res,next)=>{
    
    try{
        const {token}=req.cookies
        if(!token){
          return res.status(401).json({sucess:false,message:"unauthorized,login required"})
        }
        const decodedtoken=jwt.verify(token,process.env.JWT_SECRET);
        if(!decodedtoken){
          return res.status(401).json({ sucess: false, message: "Unauthorized: Invalid or expired token" });
        }

        const user=await UserModel.findById(decodedtoken.id).select("-password");
        if(!user){
          return res.status(401).json({ sucess: false, message: "Unauthorized: User not found" });
        }
        req.user=user;
        next();
     
    }
    catch(error){
           return res.status(401).json({ sucess: false, message: "Unauthorized: Invalid or expired token" });
      return res.status(500).json({sucess:false,message:error.message})
    }
}
export default userauth;

