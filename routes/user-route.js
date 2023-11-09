const express = require('express')
const router = express.Router()
//multer
const multer = require('multer')
// configure multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  },
})

var upload = multer({ storage: storage })

//controllers
const {
  getLoginForm,
  loginUser,
  getSignupForm,
  signupUser,
  getUserProfile,
  uploadAvatar,
  logoutUser,
} = require('../controllers/user-controller')

//login user view
router.get('/login', getLoginForm)

//login user
router.post('/login', loginUser)

//sign up form
router.get('/signup', getSignupForm)

//sign up user
router.post('/signup', signupUser)

//user profile
router.get('/profile', getUserProfile)

//upload user avatar
router.post('/uploadAvatar', upload.single('avatar'), uploadAvatar)
//logout user
router.get('/logout', logoutUser)

module.exports = router
