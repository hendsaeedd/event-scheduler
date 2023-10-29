const mongoose = require('mongoose')

//connect to mongodb
const url = 'mongodb://127.0.0.1:27017/Events'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log(err))
