// const express= require('express');
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app= express();
const port= process.env.PORT || 5000;

dotenv.config();

// app.get('/',(req, res)=>{
//     //root route
//     res.send('Hello World!!')
// })

app.use(express.json()) //to parse the incoming requests with JSON payloads(from req.body from auth.controllers)

app.use("/api/auth",authRoutes)

app.listen(port,()=>{
    connectToMongoDB();
    console.log(`Server runnig at port ${port}`)
})