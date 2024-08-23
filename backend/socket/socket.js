import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://chat-app-wh8v.onrender.com/"],
    methods: ["GET", "POST"],
  },
});

export const getReceieverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {};// {userId: socketId}

io.on("connection", (socket) => {
  console.log("a new client connected", socket.id);
  const userId = socket.handshake.query.userId;
  if(userId != "undefined") userSocketMap[userId]= socket.id;

  //io.emit is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on is used to listen to the events, can be used on both client and server side
  socket.on("disconnect", () => {
    console.log("a client disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
