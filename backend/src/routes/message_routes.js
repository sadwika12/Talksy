import express from "express";
import {getAllContacts,getMessagesbyUserId,sendMessage,getChatPartners} from "../controllers/message_controllers.js";
import userauth from "../middleware/userauth.js";
import { arcjetMiddleware } from "../middleware/arcjet_middleware.js";
const router=express.Router();
router.use(arcjetMiddleware,userauth);
router.get("/contacts",getAllContacts);
router.get("/chats",getChatPartners)
router.get("/:id",getMessagesbyUserId);
router.post("/send/:id",sendMessage);
export default router;