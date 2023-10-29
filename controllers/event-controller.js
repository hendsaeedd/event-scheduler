const express = require('express')
const Event = require('../models/event')
const { check, validationResult } = require('express-validator')
const moment = require('moment')
moment().format()

//get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
    res.render('event/index', { events })
  } catch (err) {
    res.status(400).json({ err })
  }
}

//get create event form
const getCreateEventForm = async (req, res) => {
  try {
    res.render('event/create', { errors: false })
  } catch (err) {
    res.status(400).json({ err })
  }
}

//create event
const createEvent = async (req, res) => {
  try {
    //check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render('event/create', { errors: errors.array() })
    }
    const { title, description, location, date } = req.body
    const event = await Event.create({ title, description, location, date })
    //save event to database
    await event.save()
    //then redirect to home page
    res.redirect('/events')
    console.log('event created')
  } catch (err) {
    res.status(400).json({ err })
  }
}

//get one event
const getOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    res.render('event/show', { event })
  } catch (err) {
    res.status(400).json({ err })
  }
}

//get edit event form
const getEditEventForm = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    res.render('event/edit', {
      event,
      errors: false,
    })
  } catch (err) {
    res.status(400).json({ err })
  }
}

const updateEvent = async (req, res) => {
  try {
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const event = await Event.findById(req.params.id);
      await event.updateOne({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
      });

      return res.render('event/edit', {
        event,
        errors: errors.array(),
        eventDate: moment(event.date).format('YYYY-MM-DD'),
      });
    }

    //update the event in the database
    await Event.updateOne({
      _id: req.params.id,
    }, {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
    });

    // Redirect the user to the events page
    res.redirect('/events');
    console.log('Event updated');
  } catch (err) {
    // Send a response to the user with the error message
    res.status(400).json({ err });
  }
};


//delete event
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.redirect('/events')
    console.log('event deleted')
  } catch (err) {
    res.status(400).json({ err })
  }
}

//check for validation errors
const validate = [
  check('title')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Title is required and must be at least 5 characters long'),
  check('description')
    .trim()
    .isLength({ min: 5 })
    .withMessage(
      'Description is required and must be at least 5 characters long'
    ),
  check('location')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Location is required and must be at least 5 characters long'),
  check('date')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Date is required and must be at least 5 characters long'),
]

module.exports = {
  getAllEvents,
  getOneEvent,
  createEvent,
  getCreateEventForm,
  deleteEvent,
  validate,
  updateEvent,
  getEditEventForm,
}
