import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { app, allowedOrigins } from './src/app.js';
import { setupSocketHandlers } from './src/socket/handlers.js';

dotenv.config();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  setupSocketHandlers(io, socket);
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});