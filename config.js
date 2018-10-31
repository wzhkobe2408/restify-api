module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://wzh:2408kobe@ds019048.mlab.com:19048/restify-api',
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
}