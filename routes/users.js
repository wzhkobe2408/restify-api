const UserService = require('../services/UserService')

module.exports = (server) => {
  // Register User
  server.post('/register', UserService.registerUser)

  // Auth User
  server.post('/auth', UserService.authUser)
}