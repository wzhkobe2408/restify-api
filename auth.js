const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const User = mongoose.model('User')

exports.authenticate = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get user by email
      const user = await User.findOne({ email })
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        isMatch ? resolve(user) : reject('Authentication Failed')
      })
    } catch (error) {
      reject('Authentication Failed')
    }
  })
}