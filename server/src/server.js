import express from "express";
import http from "http";
import io from "socket.io";

const handleListen = () => console.log("server 5000");
const httpServer = http.createServer(express).listen(5000, handleListen);

const socketServer = io(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

socketServer.on("connect", (socket) => {
  socket.on("test", (req) => {
    console.log(req);
  });
});

// app.get("/", (req, res) => res.render("home"));
