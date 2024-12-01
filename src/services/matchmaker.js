import userManager from './userManager.js';

export const matchUsers = (io) => {
  const available = userManager.getAvailableUsers();
  
  while (available.length >= 2) {
    const user1 = available.shift();
    const user2 = available.shift();
    
    if (userManager.hasUser(user1) && userManager.hasUser(user2)) {
      userManager.removeUser(user1);
      userManager.removeUser(user2);
      
      io.to(user1).emit('matched', { peer: user2 });
      io.to(user2).emit('matched', { peer: user1 });
    }
  }
};