// const express= require('express');
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 5000;

dotenv.config();
const __dirname = path.resolve();

// app.get('/',(req, res)=>{
//     //root route
//     res.send('Hello World!!')
// })

app.use(express.json()); //to parse the incoming requests with JSON payloads(from req.body from auth.controllers)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server runnig at port ${port}`);
});
