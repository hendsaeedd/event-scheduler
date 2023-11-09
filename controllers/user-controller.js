const express = require('express')
const User = require('../models/user')
const passport = require('passport')

//sign up form
const getSignupForm = (req, res) => {
  res.render('user/signup')
}

//sign up user
const signupUser = async (req, res) => {
  try {
    const { username, password } = req.body

    //check if user exists
    const existingUser = await User.findOne({ username })
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' })
    const user = await User.create({ username, password })

    //save user
    await user.save()
    res.redirect('/users/profile')
  } catch (err) {
    res.status(400).json({ err })
  }
}

//get login form
const getLoginForm = (req, res) => {
  res.render('user/login')
}

//login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const pass = await User.findOne({ password })

    //check if user exists
    if (!user) {
      return res.status(401).json({ message: 'User not found.' })
    }

    //check if password matches
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password.' })
    }

    res.redirect('/users/profile')
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

// const loginUser = (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/users/profile',
//     failureRedirect: '/users/login',
//     failureFlash: true,
//   })(req, res, next)
// }

//user profile
const getUserProfile = (req, res) => {
  res.render('user/profile')
}

//upload user avatar
const uploadAvatar = async (req, res) => {
  try {
    const { filename } = req.file
    const { id } = req.user
    const user = await User.findById(id)
    user.avatar = filename
    await user.save()
    res.redirect('/users/profile')
  } catch (err) {
    res.status(400).json({ err })
  }
}

//logout user
const logoutUser = (req, res) => {
  req.logout()
  res.redirect('/events')
}

module.exports = {
  getLoginForm,
  loginUser,
  getSignupForm,
  signupUser,
  getUserProfile,
  uploadAvatar,
  logoutUser,
}
