const express = require('express')
const app = express()
const port = 3000
//database
const db = require('./config/db')

const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

//routes
const eventRoute = require('./routes/event-route')
const userRoute = require('./routes/user-route')

//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use('/events', eventRoute)
app.use('/users', userRoute)

//static files
app.use(express.static('public'))
app.use(express.static('node_modules'))

//session and flash config
app.use(
  session({
    secret: 'test123',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 *15 }
  })
)
app.use(flash())

//passport config
app.use(passport.initialize())
app.use(passport.session())

//store user object 
app.get('*', (req,res,next)=> {
  res.locals.user = req.user || null
  next()
})

//template engine
app.set('view engine', 'ejs')

app.listen(port, () => console.log(`app is listening on port ${port}!`))
