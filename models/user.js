const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  avatar: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('users', userSchema)

module.exports = User
