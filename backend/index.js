import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connecttoDb from "./src/lib/db.js";
import authRoutes from "./src/routes/auth_routes.js";
import messageRoutes from "./src/routes/message_routes.js";

import cors from "cors";
import {app,server} from "./src/lib/socket.js";

const port=process.env.PORT || 5000;

app.use(cookieParser());

connecttoDb()

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({origin: process.env.CLIENT_URL,credentials:true}));

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
server.listen(port,()=>{
    console.log("server is running on port 5000");
})