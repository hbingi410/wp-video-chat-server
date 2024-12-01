class UserManager {
  constructor() {
    this.availableUsers = new Map();
  }

  makeUserAvailable(socketId) {
    this.availableUsers.set(socketId, true);
  }

  removeUser(socketId) {
    this.availableUsers.delete(socketId);
  }

  getAvailableUsers() {
    return Array.from(this.availableUsers.keys());
  }

  hasUser(socketId) {
    return this.availableUsers.has(socketId);
  }
}

export default new UserManager();