import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || "*",
    methods: ["GET", "POST"]
  }
});

// Store waiting users
const waitingUsers = new Set();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('ready', () => {
    // Remove from waiting if they were there
    waitingUsers.delete(socket.id);
    
    // Check if there's someone waiting
    const waitingUser = Array.from(waitingUsers)[0];
    
    if (waitingUser) {
      // Match found
      waitingUsers.delete(waitingUser);
      
      // Notify both users
      socket.emit('match', waitingUser);
      io.to(waitingUser).emit('match', socket.id);
    } else {
      // Add to waiting list
      waitingUsers.add(socket.id);
    }
  });

  socket.on('message', (message) => {
    // Relay WebRTC signaling messages
    io.to(message.to).emit('message', {
      ...message,
      from: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    waitingUsers.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});