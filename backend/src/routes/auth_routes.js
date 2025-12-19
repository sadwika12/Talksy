import express from "express";
const router=express.Router();
import {login,register,logout,updateProfile,checkauth,passwordresetotp,resetpassword} from "../controllers/auth_controllers.js";
import userauth from "../middleware/userauth.js";
import { arcjetMiddleware } from "../middleware/arcjet_middleware.js";

router.post("/login",login);


router.post("/register",arcjetMiddleware,register);

router.post("/logout",arcjetMiddleware,logout);



router.put("/update-profile",arcjetMiddleware,userauth,updateProfile);

router.get("/protected",arcjetMiddleware,userauth,checkauth);

router.post('/sent-password-reset-otp',arcjetMiddleware,passwordresetotp)

router.post('/password-reset',arcjetMiddleware,resetpassword)

router.get("/check",userauth,(req,res)=>res.status(200).json(req.user))

export default router;