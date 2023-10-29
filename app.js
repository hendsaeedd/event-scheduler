const express = require('express')
const app = express()
const port = 3000
//database
const db = require('./config/db')

const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

//routes
const eventRoute = require('./routes/event-route')

//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use('/events', eventRoute)

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

//template engine
app.set('view engine', 'ejs')

app.listen(port, () => console.log(`app is listening on port ${port}!`))
