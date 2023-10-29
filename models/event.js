const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Event = mongoose.model('events', eventSchema)

module.exports = Event
