const db = require('../config/db')
const Event = require('../models/event')

const events = [
    new Event({
        title: 'Event 1',
        description: 'Event 1 description',
        location: 'Event 1 location',
        date: Date.now(),
    }),
    new Event({
        title: 'Event 2',
        description: 'Event 2 description',
        location: 'Event 2 location',
        date: Date.now(),
    }),
    new Event({
        title: 'Event 3',
        description: 'Event 3 description',
        location: 'Event 3 location',
        date: Date.now(),
    }),
    new Event({
        title: 'Event 4',
        description: 'Event 4 description',
        location: 'Event 4 location',
        date: Date.now(),
    }),
    new Event({
        title: 'Event 5',
        description: 'Event 5 description',
        location: 'Event 5 location',
        date: Date.now(),
    }),
    new Event({
        title: 'Event 6',
        description: 'Event 6 description',
        location: 'Event 6 location',
        date: Date.now(),
    })
]

events.forEach(event => {
    event.save()
        .then(() => console.log('event saved'))
        .catch(err => console.log(err))
})
