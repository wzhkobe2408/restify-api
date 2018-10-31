const errors = require('restify-errors')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const auth = require('../auth')
const jwt = require('jsonwebtoken')
const config = require('../config')

const registerUser = (req, res, next) => {
  const { email, password } = req.body
  const user = new User({
    email,
    password
  })
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      user.password = hash
      try {
        const newUser = await user.save()
        res.send(201)
        next()
      } catch (error) {
        return next(new errors.InternalError(error.message))
      }
    })
  })
}

const authUser = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await auth.authenticate(email, password)
    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
      expiresIn: '15m'
    })
    const { iat, exp } = jwt.decode(token)
    res.send({
      iat,
      exp,
      token
    })
    next()
  } catch (error) {
    return next(new errors.UnauthorizedError(error))
  }
}

module.exports = {
  registerUser,
  authUser
}