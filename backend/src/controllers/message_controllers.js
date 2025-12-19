import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const { JsonWebTokenError } = jwt;
import UserModel from "../models/usermodel.js"
import MessageModel from "../models/messagemodel.js";
import clodinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
export const getAllContacts=async(req,res)=>{
    try{
       const users=req.user._id;
       const filteredUsers=await UserModel.find({_id:{$ne:users}}).select("-password ");
       res.status(200).json(filteredUsers);
    }catch(error){

        res.status(500).json({success:false,message:error.message});
    }
};
export const getChatPartners=async(req,res)=>{
  try{
    const userId=req.user._id;
    const messages=await MessageModel.find({
      $or:[{senderId:userId},{receiverId:userId}],
    });
    const chatPartnerIds=[
      ...new Set(messages.map((message)=>
        message.senderId.toString()===userId.toString()?
        message.receiverId.toString():
        message.senderId.toString()
      )
    ),
  ];

    const chatPartners=await UserModel.find({_id:{$in:chatPartnerIds}}).select("-password");
    res.status(200).json(chatPartners);


  }catch(error){
    res.status(500).json({success:false,message:error.message});
  }
}
export const getMessagesbyUserId=async(req,res)=>{
  try{
    const {id:userToChatId}=req.params;
    const senderId=req.user._id;

    const messages=await MessageModel.find({
      $or:[
        {senderId:senderId,receiverId:userToChatId},
        {senderId:userToChatId,receiverId:senderId}
      ]
    })
    res.status(200).json(messages);
  }
  catch(error){
    res.status(500).json({success:false,message:error.message});
  }
}
export const sendMessage=async(req,res)=>{
  try{
    const {text,image}=req.body;
    const {id:receiverid}=req.params;
    const senderid=req.user._id;
    const senderId=senderid;
    const receiverId=receiverid;
    let imageUrl="";
    if(image){
      const uploadResponse=await clodinary.uploader.upload(image);
      imageUrl=uploadResponse.secure_url;
    }
    const newMessage=new MessageModel({
        senderId,
        receiverId,
        text,
        image:imageUrl
      });
      await newMessage.save();
      const receiverSocketId=getReceiverSocketId(receiverId)
      if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
      }
      res.status(201).json(newMessage);
  }catch(error){
    res.status(500).json({success:false,message:error.message});
    console.log(error);
  }
}