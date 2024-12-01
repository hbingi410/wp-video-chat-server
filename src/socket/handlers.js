import userManager from '../services/userManager.js';
import { matchUsers } from '../services/matchmaker.js';

export const setupSocketHandlers = (io, socket) => {
  console.log('User connected:', socket.id);

  socket.on('makeAvailable', () => {
    userManager.makeUserAvailable(socket.id);
    matchUsers(io);
  });

  socket.on('offer', ({ offer, to }) => {
    socket.to(to).emit('offer', {
      offer,
      from: socket.id
    });
  });

  socket.on('answer', ({ answer, to }) => {
    socket.to(to).emit('answer', {
      answer,
      from: socket.id
    });
  });

  socket.on('ice-candidate', ({ candidate, to }) => {
    socket.to(to).emit('ice-candidate', {
      candidate,
      from: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    userManager.removeUser(socket.id);
  });
};