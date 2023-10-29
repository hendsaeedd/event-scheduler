const express = require('express')
const router = express.Router()
const Event = require('../models/event')

//controllers
const {
  getAllEvents,
  getOneEvent,
  createEvent,
  getCreateEventForm,
  deleteEvent,
  validate,
  updateEvent,
  getEditEventForm,
} = require('../controllers/event-controller')

//get all events
router.get('/', getAllEvents)

//create event
router.post('/create', validate, createEvent)

// get create event form
router.get('/create', getCreateEventForm)

//get one event
router.get('/:id', getOneEvent)

//get edit event form
router.get('/edit/:id', getEditEventForm)

//update event
router.post('/update', updateEvent)

//edit event
// router.patch('/edit/:id', updateEvent)

//delete event
router.get('/delete/:id', deleteEvent)

//delete event
router.delete('/delete/:id', deleteEvent)

module.exports = router
